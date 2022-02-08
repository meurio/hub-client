import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// import * as graphqlQueries from 'graphql/queries'
import * as pressureHelper from 'mobilizations/widgets/utils/pressure-helper'
import * as paths from 'paths'
import * as array from 'utils/array'
import MobSelectors from 'mobrender/redux/selectors'
import * as PressureActions from '../action-creators'
import { FinishMessageCustom } from 'mobilizations/widgets/components'
import { PressureCount, PressureForm, TargetList, PressureTellAFriend } from '../components'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
export class Pressure extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      filled: false,
      selectedTargets: [],
      selectedTargetsError: undefined,
      callTransition: undefined,
      observableQuery: undefined,
      addTwilioCallMutation: undefined,
      // TODO: receive from widget settings
      selectableTargetList: false,
      phonePressureCount: undefined,
      showFinishMessage: false
    }
  }

  componentWillMount () {
    const isPressurePhone = pressureHelper.getType(this.getTargetList()) === pressureHelper.PRESSURE_TYPE_PHONE
    const hasCounter = !!this.props.widget.settings.count_text
    if (hasCounter && isPressurePhone) {
      this.setState({ phonePressureCount: 0 })
      // graphqlClient().query({
      //   query: graphqlQueries.CountTwilioCallsByWidget,
      //   variables: { widgetId: this.props.widget.id }
      // })
      //   .then(({ data: { allTwilioCalls: { totalCount: phonePressureCount } } }) => {
      //     this.setState({ phonePressureCount })
      //   })
      //   .catch(err => console.error(err))
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ filled: this.props.saving && !nextProps.saving })
  }

  getTargetList () {
    const { targets } = this.props.widget.settings || { targets: '' }
    
    if (typeof targets === 'object') return targets

    return targets && targets.split(';').filter(target => !!target.trim())
  }

  getEmailTarget (target) {
    const targetSplit = target.split('<')
    return targetSplit[1].replace('>', '')
  }

  changeSelectedTargets (selectedTargets) {
    this.setState({ selectedTargets })
  }

  changeState (state) {
    this.setState(state)
  }

  handleSubmit (data) {
    if (data.pressureType === pressureHelper.PRESSURE_TYPE_EMAIL) {
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
    } else if (data.pressureType === pressureHelper.PRESSURE_TYPE_PHONE) {
      if (!this.state.selectedTargets.length && this.state.selectableTargetList) {
        this.setState({
          selectedTargetsError:
            'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
        })
      } else {
        // normalize phone number with + sign (e.g. +5511987654321)
        data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`

        this.setState({ selectedTargetsError: undefined })

        // it needs to find or create the activist data
        const addTwilioCallMutation = () => {
          const { phonePressureCount } = this.state
          this.setstate({ phonePressureCount: phonePressureCount + 1 })
          return Promise.resolve();
          // return graphqlClient().mutate({
          //   mutation: graphqlMutations.addTwilioCall,
          //   variables
          // })
        }

        addTwilioCallMutation({
          widgetId: this.props.widget.id,
          communityId: this.props.mobilization.community_id,
          from: data.phone,
          to: this.getEmailTarget(array.shuffle(this.getTargetList())[0])
        }).then(() => {
          if (!this.state.observableQuery) {
            // const observableQuery = graphqlClient({ ssrMode: false }).watchQuery({
            //   pollInterval: 2000,
            //   query: graphqlQueries.watchTwilioCallTransitions,
            //   variables: { widgetId: this.props.widget.id, from: data.phone }
            // })
            // observableQuery.subscribe({
            //   next: ({ data: { watchTwilioCallTransitions: callTransition } }) => {
            //     this.setState({ callTransition })
            //   }
            // })
            this.setState({ observableQuery: undefined })
          }
        })

        if (!this.state.addTwilioCallMutation) {
          this.setState({ addTwilioCallMutation })
        }
      }
    }
  }

  handleOverlayOnClick (e) {
    const { history, mobilization, widget, editable } = this.props
    if (editable) {
      if (e) e.preventDefault()
      history.push(
        paths.pressure(mobilization.id, widget.id)
      )
    }
  }

  render () {
    const {
      block,
      widget,
      editable,
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

    return filledPressureWidgets.includes(widget.id) || this.state.showFinishMessage ? (
      finishMessageType === 'custom' ? (
        <FinishMessageCustom widget={widget} />
      ) : (
        <PressureTellAFriend mobilization={mobilization} widget={widget} />
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
        <TargetList
          targets={this.getTargetList() || []}
          onSelect={this.changeSelectedTargets.bind(this)}
          errorMessage={this.state.selectedTargetsError}
          selectable={this.selectableTargetList}
        />
        <PressureForm
          disabled={disableEditField === 's'}
          widget={widget}
          mobilization={mobilization}
          buttonText={(saving && !editable ? 'Enviando...' : buttonText)}
          buttonColor={mainColor}
          subject={pressureSubject}
          body={pressureBody}
          onSubmit={this.handleSubmit.bind(this)}
          targetList={this.getTargetList()}
          selectedTargets={this.selectedTargets}
          callTransition={this.state.callTransition}
          addTwilioCallMutation={this.state.addTwilioCallMutation}
          changeParentState={this.changeState.bind(this)}
        >
          {countText && (
            <PressureCount
              value={this.state.phonePressureCount || widget.count || 0}
              color={mainColor}
              text={countText}
              startCounting={block.scrollTopReached}
            />
          )}
        </PressureForm>
      </div>
    )
  }
}

Pressure.propTypes = {
  editable: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message_type: PropTypes.string,
      finish_message: PropTypes.string,
      finish_message_background: PropTypes.string
    }).isRequired
  }).isRequired,
  saving: PropTypes.bool,
  filledPressureWidgets: PropTypes.array,
  // Actions
  asyncFillWidget: PropTypes.func
}

const mapStateToProps = (state, props) => {
  const pressure = MobSelectors(state, props).getPlugin('pressure')
  const { saving, filledPressureWidgets } = pressure
  return { saving, filledPressureWidgets }
}

const mapDispatchToProps = { ...PressureActions }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pressure))
