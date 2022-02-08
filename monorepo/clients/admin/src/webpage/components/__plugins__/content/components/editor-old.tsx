import classnames from 'classnames'
import React from 'react'
import type { Mobilization, Widget } from "../../../../reducers";
// import { Loading } from '../../../../../components/await'
// Global module dependencies
import { WYSIHTMLToolbar } from './editor-wysihtml'

interface EditorOldProperties {
  mobilization: Mobilization;
  widget: Widget;
  editable: boolean;
  onEdit: () => void
  onCancelEdit: () => void
  update: (widget: Widget) => void
  handleForceRender?: () => void
}

class EditorOld extends React.Component<EditorOldProperties, any> {
  constructor(properties, context) {
    super(properties, context)
    this.state = {
      editing: false,
      editor: undefined,
      content: properties.widget.settings.content,
      toolbarId: `wysihtml5-toolbar-${this.props.widget.id}`,
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.editable) {
      import('./wysihtml-toolbar.min')
        .then(({ wysihtml5, wysihtml5ParserRules }: any): void => {
          const editor = new wysihtml5.Editor(
            this.refs.content, {
            toolbar: this.state.toolbarId,
            parserRules: wysihtml5ParserRules
          }
          ).on('focus', this.handleEditorFocus.bind(this))
          this.setState({ editor })
        })
        .catch(error => {
          // Handle failure
          console.log('fail when try to load wysihtml5 dependecies', error)
        });
    } else {
      this.setClick()
    }
  }

  componentWillReceiveProps(nextProperties) {
    if (this.state.loading && this.props.widget.settings.content !== nextProperties.widget.settings.content) {
      this.setState({ loading: false })
    }
  }

  enableEditor() {
    this.setState({ editing: true })
    this.props.onEdit && this.props.onEdit()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    window.addEventListener('keyup', this.handleEscapePress.bind(this));
  }

  disableEditor() {
    this.setState({ editing: false })
    this.props.onCancelEdit && this.props.onCancelEdit()
    // eslint-disable-next-line unicorn/no-invalid-remove-event-listener
    window.removeEventListener('keyup', this.handleEscapePress.bind(this));
    (this.refs.content as any).blur()
  }

  handleEditorFocus() {
    this.enableEditor()
  }

  handleEscapePress(e) {
    if (e.keyCode === 27) {
      this.save()
    }
  }

  handleOverlayClick() {
    this.save()
  }

  setClick() {
    const on = (selector, event, handler, element = document) => {
      element.addEventListener(event, (e) => { if (e.target.matches(selector)) handler(e); });
    }

    window.addEventListener('click touchstart', (e) => {
      on('.content-widget a:not([target="_blank"])', 'click touchstart', this.handleClick.bind(this))
    })
  }

  handleClick(e) {
    e.preventDefault()
    const target: any = document.getElementById(e.target)

    target.scrollIntoView({ behavior: "smooth" })
  }

  save() {
    const { editor, content } = this.state
    const hasChanged = editor.getValue() !== content
    this.setState({ content: editor.getValue() })
    this.disableEditor()

    if (hasChanged) {
      const { update, widget } = this.props

      this.setState({ loading: true })
      update({
        ...widget,
        settings: { content: this.state.editor.getValue() }
      })
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      )
    }
  }

  handleRenderNewEditor() {
    const { handleForceRender } = this.props
    if (handleForceRender && window.confirm(`Ao converter seu conteúdo para o novo editor
        algumas informações podem ser perdidas,
        tem certeza que você quer alterar para o novo editor?`)) {
          handleForceRender()
    }
  }

  render() {
    const { toolbarId, editing } = this.state
    const { mobilization: { header_font: headerFont, body_font: bodyFont } } = this.props
    const { handleForceRender } = this.props
    return (
      <div className='widgets--content-plugin'>
        <div className={classnames('content-widget col-12', { 'display-none': !editing })}>
          <WYSIHTMLToolbar
            elementId={toolbarId}
            className='absolute col-12 top-0 bg-darken-4 z7'
            buttonClassName='btn white p2'
            style={{ left: 0 }}
          />
          <div
            className='fixed top-0 right-0 bottom-0 left-0 z5'
            onClick={this.handleOverlayClick.bind(this)}
          />
        </div>
        <div className={classnames('relative', editing ? 'z6' : 'z0')}>
          <div
            className={classnames('widget', `${headerFont}-header`, `${bodyFont}-body`)}
            dangerouslySetInnerHTML={{ __html: this.state.content }}
            ref='content'
          />
          <div className={classnames('right mt1', { 'display-none': !editing })}>
            {handleForceRender ? (
              <button
                onClick={this.handleRenderNewEditor.bind(this)}
                className='btn caps bg-darken-4 white rounded mr1'
              >
                Alterar editor
              </button>
            ) : undefined}
            <button
              onClick={this.save.bind(this)}
              className='btn caps bg-darken-4 white rounded'
            >
              Salvar
            </button>
          </div>
        </div>
        {this.renderLoading()}
      </div>
    )
  }
}

export default EditorOld
