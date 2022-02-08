import React from 'react'
import PressureGraphQL from './plugin.graphql'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { saving: false, filledPressureWidgets: [] }
  }

  handleFillWidget (params) {
    this.setState({ saving: true })
    return this.props.fillWidget(params)
      .then(({ widget }) => {
        const { filledPressureWidgets } = this.state
        this.setState({
          saving: true,
          filledPressureWidgets: [...filledPressureWidgets, widget.id]
        })
        return Promise.resolve()
      })
  }

  render () {
    const { saving, filledPressureWidgets } = this.state
    return (
      <PressureGraphQL
        {...this.props}
        asyncFillWidget={this.handleFillWidget.bind(this)}
        saving={saving}
        filledPressureWidgets={filledPressureWidgets}
      />
    )
  }
}