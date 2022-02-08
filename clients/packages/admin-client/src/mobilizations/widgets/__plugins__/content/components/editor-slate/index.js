import React, { Component } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Plain from 'slate-plain-serializer'
import { SlateEditor, SlateToolbar, SlateContent } from 'slate-editor'
import { BoldPlugin, BoldButton } from '@slate-editor/bold-plugin'
import { ItalicPlugin, ItalicButton } from '@slate-editor/italic-plugin'
import { UnderlinePlugin, UnderlineButton } from '@slate-editor/underline-plugin'
import { StrikethroughPlugin, StrikethroughButton } from '@slate-editor/strikethrough-plugin'
import { AlignmentPlugin, AlignmentButtonBar } from '@slate-editor/alignment-plugin'
import { LinkPlugin, LinkButton } from '@slate-editor/link-plugin'
import { ListPlugin, ListButtonBar } from '@slate-editor/list-plugin'
import { FontFamilyPlugin, FontFamilyDropdown } from '@slate-editor/font-family-plugin'
import { FontSizePlugin, FontSizeInput } from '@slate-editor/font-size-plugin'
import { ImagePlugin, ImageButton } from '@slate-editor/image-plugin'
import { ColorPlugin, ColorButton, ColorStateModel } from '@slate-editor/color-plugin'
import { GridPlugin, GridButtonBar } from '@slate-editor/grid-plugin'
import { EmbedPlugin, EmbedButton } from '@slate-editor/embed-plugin'

import { connect } from 'react-redux'
import { genericSaveSuccess, notify } from 'utils/notifications'

import { Loading } from 'components/await'
import { ActionButton, FooterEditor, Layer } from 'mobilizations/widgets/__plugins__/content/components'

import styles from './styles'
if (require('exenv').canUseDOM) require('./index.scss')

const fontSizePluginOptions = { initialFontSize: 16 }
const colorPluginOptions = new ColorStateModel().rgba({ r: 100, g: 100, b: 100, a: 1 }).gen()

const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  EmbedPlugin(),
  FontFamilyPlugin(),
  FontSizePlugin(fontSizePluginOptions),
  GridPlugin(),
  ImagePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin()
]

const classNames = {
  button: 'btn btn-primary not-rounded border border-gray',
  dropdown: 'select col-3 inline-block mx1 not-rounded',
  input: 'input col-3 inline-block mr1',
  lastButton: 'btn btn-primary not-rounded border border-gray linebreak'
}

class EditorSlate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      loading: false,
      initialState: JSON.parse(props.content)
    }
  }

  handleCancelEditionMode (state, setState) {
    const initialRaw = Plain.serialize(this.state.initialState)
    const raw = Plain.serialize(state)
    if (initialRaw !== raw) {
      if (window.confirm(this.props.intl.formatMessage({
        id: 'c--editor-slate.button-cancel.message',
        defaultMessage: 'Deseja mesmo sair do modo edição? Suas alterações não serão salvas.'
      }))) {
        this.setState({ editing: false })
        setState(this.state.initialState)
      }
    } else {
      this.setState({ editing: false })
    }
  }

  handleSave (state) {
    this.setState({ initialState: state })
    this.props.handleSave(state)
    this.props.notifySuccess()
  }

  render () {
    const { handleDelete, readOnly, toolbarStyles, contentStyles } = this.props
    return (
      <div className='widgets--content-plugin'>
        <SlateEditor
          plugins={plugins}
          initialState={this.state.initialState}
          style={{ color: '#fff' }}
        >
          <SlateToolbar style={{
            ...styles.toolbar,
            display: this.state.editing ? 'block' : 'none',
            ...toolbarStyles
          }}>
            <BoldButton className={classNames.button} />
            <ItalicButton className={classNames.button} />
            <UnderlineButton className={classNames.button} />
            <StrikethroughButton className={classNames.button} />
            <AlignmentButtonBar className={classNames.button} />
            <LinkButton className={classNames.button} />
            <ListButtonBar className={classNames.button} />
            <FontFamilyDropdown className={classNames.dropdown} style={styles.dropdown} />
            <FontSizeInput className={classNames.input} {...fontSizePluginOptions} style={styles.input} />
            <ImageButton className={classNames.button} signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`} />
            <ColorButton className={classNames.button} initialState={colorPluginOptions} pickerDefaultPosition={{ x: 0, y: 17 }} />
            <GridButtonBar className={classNames.button} />
            <EmbedButton className={classNames.button} />
          </SlateToolbar>

          <SlateContent
            wrapperStyle={{ position: 'relative', zIndex: this.state.editing ? 4 : 'inherit' }}
            style={{ minHeight: 150, ...contentStyles }}
            onFocus={() => {
              if (!readOnly) this.setState({ editing: true })
            }}
            onKeyDown={(event, data, state) => {
              if (data.isMod && data.key === 's') {
                event.preventDefault()
                this.handleSave(state)
              }
            }}
            className={!readOnly ? 'editable' : ''}
            readOnly={readOnly}
          />

          <FooterEditor>
            <ActionButton
              editing={this.state.editing}
              title='Remover'
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0
              }}
              className='mt2'
              onClick={handleDelete}
            >
              <i className='fa fa-trash' />
            </ActionButton>
            <ActionButton
              editing={this.state.editing}
              className='mt2 right-align'
              onClick={this.handleSave.bind(this)}
            >
              <FormattedMessage
                id='c--editor-slate.button-save.text'
                defaultMessage='Salvar'
              />
            </ActionButton>
            <ActionButton
              editing={this.state.editing}
              className='mt2 right-align mx2'
              onClick={this.handleCancelEditionMode.bind(this)}
            >
              <FormattedMessage
                id='c--editor-slate.button-cancel.text'
                defaultMessage='Cancelar'
              />
            </ActionButton>
          </FooterEditor>
          <Layer
            editing={this.state.editing}
            onClick={this.handleCancelEditionMode.bind(this)}
          />
        </SlateEditor>
        {this.state.loading && <Loading />}
      </div>
    )
  }
}

EditorSlate.propTypes = {
  intl: intlShape.isRequired
}

EditorSlate.defaultProps = {
  handleSave: () => {}
}

export const createEditorContent = content => JSON.stringify(
  Plain.deserialize(content).toJSON()
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  notifySuccess: () => {
    return dispatch(notify(genericSaveSuccess(ownProps.intl)))
  }
})

const ConnectedEditorSlate = injectIntl(connect(undefined, mapDispatchToProps)(EditorSlate))

ConnectedEditorSlate.displayName = 'EditorSlate'

export default ConnectedEditorSlate
