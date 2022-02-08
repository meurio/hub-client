import classnames from 'classnames'
import React from 'react'
import CountUp from 'react-countup'
import type { Mobilization, Widget } from "../../../../reducers";
import Button from './button';
import Input from "./input";

interface FormProperties {
  mobilization: Mobilization;
  widget: Widget;
  block: any;
  editable: boolean;
  configurable: boolean;
  hasNewField: boolean;
  intl?: any
}

class Form extends React.Component<FormProperties, any> {
  constructor(properties, context) {
    super(properties, context)
    this.state = {
      hasMouseOver: false,
    }
  }

  fields(): any[] {
    const { settings } = this.props.widget;
    // eslint-disable-next-line react/prop-types
    return (settings?.fields ? settings.fields : [])
  }

  renderCallToAction(): React.ReactElement | undefined {
    const { configurable, widget, mobilization: { header_font: headerFont }, intl } = this.props
    const callToAction = (
      widget.settings?.call_to_action
        ? widget.settings.call_to_action
        : intl.formatMessage({
          id: 'form-widget.components--form.default.title-text',
          defaultMessage: 'Clique para configurar seu formulário...'
        })
    ).replace('\n', '<br/><br/>')

    return configurable ? undefined : (
      <h2
        className='mt0 mb3 center white'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: callToAction }}
        style={{ fontFamily: headerFont }}
      />
    )
  }

  renderFields(): React.ReactElement[] {
    const fields = this.fields()
    return fields.map((field) => (
      <Input
        uid={field.uid}
        field={field}
        mobilization={this.props.mobilization}
      />
    ))
  }

  renderButton(): React.ReactElement {
    const { widget, intl, mobilization } = this.props;
    return (
      <Button
        mobilization={mobilization}
        buttonText={
          (widget.settings?.button_text) ||
          intl.formatMessage({
            id: 'form-widget.components--form.default.button-text',
            defaultMessage: 'Enviar'
          })
        }
      />
    )
  }

  renderCount(): React.ReactElement | undefined {
    const { widget: { settings } } = this.props
    if (settings?.count_text) {
      const {
        block: { scrollTopReached: startCounting },
        widget: { form_entries_count: count },
        mobilization: { body_font: bodyFont }
      } = this.props

      return (
        <div className='mt2 h3 center white' style={{ fontFamily: bodyFont }}>
          <CountUp
            start={0}
            end={count && startCounting ? count : 0}
            duration={5}
          />
          &nbsp;
          {settings.count_text}
        </div>
      )
    }
  }

  renderForm(): React.ReactElement {
    const {
      editable,
      configurable,
      widget: { settings }
    } = this.props
    const backgroundColor = settings?.main_color
      ? settings.main_color
      : 'rgba(0,0,0,0.25)'

    return (
      <div>
        <div
          className={classnames(
            'rounded',
            { 'p3 relative': editable || !configurable }
          )}
          style={{ backgroundColor: !configurable ? backgroundColor : null }}
        >
          {this.renderCallToAction()}
          {this.renderFields()}
          {/* {this.renderErrors()} */}
          {this.renderButton()}
        </div>
      </div>
    )
  }

  render(): React.ReactElement {
    const { mobilization: { header_font: headerFont } } = this.props

    return (
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      <div className={`widget ${headerFont}-header`}>
        {this.renderForm()}
        {this.renderCount()}
      </div>
    )
  }
}

export default Form
