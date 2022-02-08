import React from 'react'
import Plain from 'slate-plain-serializer'
import { ActionButton, FooterEditor, Layer } from ".."
// import { Loading } from '../../../../../../components/await'
// import { genericSaveSuccess, notify } from '../../../../../../utils/notifications'
import './index.scss'
import { AlignmentButtonBar, AlignmentPlugin } from './slate-editor-alignment-plugin/src'
import { BoldButton, BoldPlugin } from './slate-editor-bold-plugin/src'
import { ColorButton, ColorPlugin, ColorStateModel } from './slate-editor-color-plugin/src'
import { EmbedButton, EmbedPlugin } from './slate-editor-embed-plugin/src'
import { FontFamilyDropdown, FontFamilyPlugin } from './slate-editor-font-family-plugin/src'
import { FontSizeInput, FontSizePlugin } from './slate-editor-font-size-plugin/src'
import { GridButtonBar, GridPlugin } from './slate-editor-grid-plugin/src'
import { ImageButton, ImagePlugin } from './slate-editor-image-plugin/src'
import { ItalicButton, ItalicPlugin } from './slate-editor-italic-plugin/src'
import { LinkButton, LinkPlugin } from './slate-editor-link-plugin/src'
import { ListButtonBar, ListPlugin } from './slate-editor-list-plugin/src'
import { StrikethroughButton, StrikethroughPlugin } from './slate-editor-strikethrough-plugin/src'
import { UnderlineButton, UnderlinePlugin } from './slate-editor-underline-plugin/src'
import { SlateContent, SlateEditor, SlateToolbar } from './slate-editor/src'
import styles from './styles'
import config from "../../../../../../config"

const fontSizePluginOptions = { initialFontSize: 16 }
const colorPluginOptions = new ColorStateModel().rgba({ r: 100, g: 100, b: 100, a: 1 }).gen()

const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  EmbedPlugin(),
  FontFamilyPlugin({}),
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

interface EditorSlateProperties {
  content: any;
  notifySuccess: () => void;
  handleSave: (value: any) => void;
  intl?: any;
  handleDelete: () => void;
  readOnly: boolean;
  toolbarStyles?: any;
  contentStyles?: any;
}

interface EditorSlateState {
  editing: boolean;
  loading: boolean;
  initialState: any;
}

class EditorSlate extends React.Component<EditorSlateProperties, EditorSlateState> {
  constructor(properties) {
    super(properties)
    this.state = {
      editing: false,
      loading: false,
      initialState: JSON.parse(properties.content)
    }
  }

  handleCancelEditionMode(state: any, setState: any): void {
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

  handleSave(state) {
    const {
      notifySuccess,
      handleSave = () => { },
    } = this.props;

    this.setState({ initialState: state })
    handleSave(state)
    notifySuccess()
  }

  render() {
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
            <ImageButton className={classNames.button} signingUrl={`${config.domainApiRest}/uploads`} />
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
              Salvar
              {/* <FormattedMessage
                id='c--editor-slate.button-save.text'
                defaultMessage='Salvar'
              /> */}
            </ActionButton>
            <ActionButton
              editing={this.state.editing}
              className='mt2 right-align mx2'
              onClick={this.handleCancelEditionMode.bind(this)}
            >
              Cancelar
              {/* <FormattedMessage
                id='c--editor-slate.button-cancel.text'
                defaultMessage='Cancelar'
              /> */}
            </ActionButton>
          </FooterEditor>
          <Layer
            editing={this.state.editing}
            onClick={this.handleCancelEditionMode.bind(this)}
          />
        </SlateEditor>
        {this.state.loading && (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

// EditorSlate.propTypes = {
//   intl: intlShape.isRequired
// }

export const createEditorContent = content => JSON.stringify(
  Plain.deserialize(content).toJSON()
)

// const mapDispatchToProperties = (dispatch, ownProperties) => ({
//   notifySuccess: () => dispatch(notify(genericSaveSuccess(ownProperties.intl)))
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConnectedEditorSlate = (properties: any): React.ReactElement => {
  const editorProperties: any = {
    notifySuccess: () => console.log("notificar mensagem de sucesso"),
    intl: {
      formatMessage: ({ defaultMessage }) => defaultMessage
    }
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditorSlate {...properties} {...editorProperties} />
}

ConnectedEditorSlate.displayName = 'EditorSlate'

export default ConnectedEditorSlate
