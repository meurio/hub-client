import React from 'react'
import PropTypes from 'prop-types'
import { arrayUtils, pressureUtils } from './utils'
import { Count, Form, Targets } from './components'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
class Pressure extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      filled: false,
      selectedTargets: [],
      selectedTargetsError: undefined,
      addTwilioCallMutation: undefined,
      // TODO: receive from widget settings
      selectableTargetList: false,
      phonePressureCount: undefined,
      showFinishMessage: false
    }
  }

  componentWillMount () {
    const isPressurePhone = pressureUtils.getType(this.getTargetList()) === pressureUtils.PRESSURE_TYPE_PHONE
    const hasCounter = !!this.props.widget.settings.count_text
    if (hasCounter && isPressurePhone) {
      this.props.countTwilioCallsByWidget({ widgetId: this.props.widget.id })
        .then(({ phonePressureCount }) => {
          this.setState({ phonePressureCount })
        })
        .catch(err => console.error(err))
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ filled: this.props.saving && !nextProps.saving })
  }

  getTargetList () {
    const { targets } = this.props.widget.settings || { targets: '' }
    return targets && targets.split(';').filter(target => !!target.trim())
  }

  getEmailTarget (target) {
    const targetSplit = target.split('<')
    return targetSplit[1].replace('>', '')
  }

  changeState (state) {
    this.setState(state)
  }

  handleSubmit (data) {
    if (data.pressureType === pressureUtils.PRESSURE_TYPE_EMAIL) {
      const { widget, asyncFillWidget } = this.props
      const payload = {
        activist: {
          firstname: data.name,
          lastname: data.lastname,
          email: data.email,
          city: data.city || null
        },
        mail: {
          cc: this.getTargetList().map(target => this.getEmailTarget(target)),
          subject: data.subject,
          body: data.body
        }
      }
      asyncFillWidget({ payload, widget })
    } else if (data.pressureType === pressureUtils.PRESSURE_TYPE_PHONE) {
      if (!this.state.selectedTargets.length && this.state.selectableTargetList) {
        this.setState({
          selectedTargetsError:
            'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
        })
      } else {
        // normalize phone number with + sign (e.g. +5511987654321)
        data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`

        this.setState({ selectedTargetsError: undefined })

        this.props.twilioCall({
          widgetId: this.props.widget.id,
          communityId: this.props.mobilization.community_id,
          from: data.phone,
          to: this.getEmailTarget(arrayUtils.shuffle(this.getTargetList())[0])
        }, true)
      }
    }
  }

  render () {
    const {
      block,
      widget,
      saving,
      filledPressureWidgets,
      mobilization
    } = this.props
    const { header_font: headerFont } = mobilization
    const {
      main_color: mainColor,
      call_to_action: callToAction,
      title_text: titleText,
      button_text: buttonText,
      // Maybe `reply_email` is necessary...
      // reply_email,
      count_text: countText,
      pressure_subject: pressureSubject,
      pressure_body: pressureBody,
      finish_message_type: finishMessageType,
      disable_edit_field: disableEditField
    } = widget.settings || {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail',
      disable_edit_field: 'n'
    }


    const {
      FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
      FinishDefaultMessage: { component: FinishDefaultMessage, props: defaultProps }
    } = this.props.overrides

    const finishPressure = (
      (filledPressureWidgets.includes(widget.id) || this.state.showFinishMessage)
        && FinishCustomMessage && FinishDefaultMessage
    )

    return finishPressure ? (finishMessageType === 'custom' ? (
          <FinishCustomMessage mobilization={mobilization} widget={widget} {...customProps} />
        ) : (
          <FinishDefaultMessage mobilization={mobilization} widget={widget} {...defaultProps} />
        )
      ) : (
        <div className='pressure-widget'>
          <div onKeyDown={(e) => e.stopPropagation()} />
          <h2
            className='center py2 px3 m0 white rounded-top'
            style={{ backgroundColor: mainColor, fontFamily: headerFont }}
          >
            {callToAction || titleText}
          </h2>
          <Targets
            targets={this.getTargetList() || []}
          />
          <Form
            analyticsEvents={this.props.analyticsEvents}
            disabled={disableEditField === 's'}
            widget={widget}
            mobilization={mobilization}
            buttonText={(saving ? 'Enviando...' : buttonText)}
            buttonColor={mainColor}
            subject={pressureSubject}
            body={pressureBody}
            onSubmit={this.handleSubmit.bind(this)}
            targetList={this.getTargetList()}
            selectedTargets={this.selectedTargets}
            callTransition={this.props.callTransition}
            addTwilioCallMutation={this.props.twilioCall}
            changeParentState={this.changeState.bind(this)}
          >
            {countText && (
              <Count
                value={this.state.phonePressureCount || widget.count || 0}
                color={mainColor}
                text={countText}
                startCounting={block.scrollTopReached}
              />
            )}
          </Form>
        </div>
      )
  }
}

const { any, array, bool, func, object, shape, string } = PropTypes

Pressure.propTypes = {
  editable: bool,
  mobilization: object.isRequired,
  widget: shape({
    settings: shape({
      finish_message_type: string,
      finish_message: string,
      finish_message_background: string
    }).isRequired
  }).isRequired,
  saving: bool,
  filledPressureWidgets: array,
  // Actions
  asyncFillWidget: func,
  // ({ widgetId: Int }): Promise<({ phonePressureCount })>
  countTwilioCallsByWidget: func,
  twilioCall: func,
  analyticsEvents: object.isRequired,
  overrides: shape({
    FinishCustomMessage: shape({
      component: any,
      props: object
    }).isRequired,
    FinishDefaultMessage: shape({
      component: any,
      props: object
    }).isRequired
  }).isRequired
}

Pressure.defaultProps = {
  overrides: {
    FinishCustomMessage: { props: {} },
    FinishDefaultMessage: { props: {} }
  }
}

export default Pressure