import React from 'react'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'
import ColorPicker from "./../components/ColorPicker.jsx"
import BlockMiniature from "./../components/BlockMiniature.jsx"

export default class NewContentBlock extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedSizes: [12],
      bgClass: 'bg-1'
    }
  }

  handleMiniatureClick(event) {
    this.setState({selectedSizes: event.currentTarget.getAttribute('data-sizes').split(',').map(Number)})
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleAddBlockClick() {
    const { dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.addBlock({
      router: this.context.router,
      mobilization_id: this.props.mobilization.id,
      bg_class: this.state.bgClass,
      widgets: this.state.selectedSizes.map((size) => {
        return { kind: 'content', size }
      })
    })
  }

  handleCancelClick() {
    this.context.router.goBack()
  }

  render(){
    return (
      <div className={classnames("flex-auto", "p2", "center", this.props.mobilization.color_scheme)}>
        <h2>Adicione um bloco de conteúdo</h2>
        <p className="mb3">Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento</p>
        <BlockMiniature sizes={[12]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[6, 6]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[4, 8]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[4, 4, 4]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <div className="clearfix px3 mb3">
          <h3>Cor de fundo</h3>
          <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
        </div>
        <div className="col col-12 px3">
          <div className="col col-6 px1">
            <button className="button full-width" onClick={::this.handleAddBlockClick}><i className="fa fa-cloud-upload mr1" />Adicionar</button>
          </div>
          <div className="col col-6 px1">
            <button className="button button-transparent border full-width" onClick={::this.handleCancelClick}><i className="fa fa-undo mr1" />Cancelar</button>
          </div>
        </div>
      </div>
    )
  }
}

NewContentBlock.contextTypes = {
  router: React.PropTypes.object.isRequired
}
