import { AlignmentButtonBar, AlignmentPlugin } from '../../../../slate-editor-alignment-plugin/src'
import { BoldButton, BoldPlugin } from '../../../../slate-editor-bold-plugin/src'
import { ColorButton, ColorPlugin, ColorStateModel } from '../../../../slate-editor-color-plugin/src'
import { EmbedButton, EmbedPlugin } from '../../../../slate-editor-embed-plugin/src'
import { FontFamilyDropdown, FontFamilyPlugin } from '../../../../slate-editor-font-family-plugin/src'
import { FontSizeInput, FontSizePlugin } from '../../../../slate-editor-font-size-plugin/src'
import { GridButtonBar, GridPlugin } from '../../../../slate-editor-grid-plugin/src'
import { ImageButton, ImagePlugin } from '../../../../slate-editor-image-plugin/src'
import { ItalicButton, ItalicPlugin } from '../../../../slate-editor-italic-plugin/src'
import { LinkButton, LinkPlugin } from '../../../../slate-editor-link-plugin/src'
import { ListButtonBar, ListPlugin } from '../../../../slate-editor-list-plugin/src'
import { StateLoggerButton } from '../../../../slate-editor-state-logger/src'
import { StrikethroughButton, StrikethroughPlugin } from '../../../../slate-editor-strikethrough-plugin/src'
import { ToggleReadOnlyButton } from '../../../../slate-editor-toggle-readonly/src'
import { UnderlineButton, UnderlinePlugin } from '../../../../slate-editor-underline-plugin/src'
import { SlateContent, SlateEditor, SlateToolbar } from '../../../../slate-editor/src'
import './Home.css'

const fontSizePluginOptions = { initialFontSize: 16 }
const colorPluginOptions = new ColorStateModel().rgba({ r: 100, g: 100, b: 100, a: 1 }).gen()

const plugins = [
  AlignmentPlugin({}),
  BoldPlugin({}),
  ColorPlugin(colorPluginOptions),
  EmbedPlugin({}),
  FontFamilyPlugin({}),
  FontSizePlugin(fontSizePluginOptions),
  GridPlugin({}),
  ImagePlugin({}),
  ItalicPlugin({}),
  LinkPlugin({}),
  ListPlugin({}),
  StrikethroughPlugin({}),
  UnderlinePlugin({})
]

const classNames = {
  button: 'btn btn-primary not-rounded border border-gray',
  dropdown: 'select col-3 inline-block mx1 not-rounded',
  input: 'input col-3 inline-block mr1',
  lastButton: 'btn btn-primary not-rounded border border-gray linebreak'
}
const styles = {
  button: {
    borderRight: '1px solid #fff'
  },
  dropdown: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    height: 38,
    paddingLeft: 20,
    border: '3px solid #0275d8',
    color: '#0275d8',
    margin: '0',
    WebkitAppearance: 'none',
    padding: '0 10px 0 15px'
  },
  input: {
    position: 'relative',
    top: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    height: 16,
    margin: 0,
    color: '#0275d8',
    border: '3px solid #0275d8'
  }
}

function Version({ version }) {
  return <div style={{ textAlign: 'right' }}>
    <small>v{version}</small>
  </div>
}

function Home({ title, version }) {
  return (
    <div className='page--home'>
      <div className='header'>
        <h1>{title}</h1>
        <p>A rich text editor based on SlateJS</p>
      </div>
      <SlateEditor plugins={plugins}>
        <Version version={version} />
        <SlateToolbar>
          <BoldButton className={classNames.button} />
          <StrikethroughButton className={classNames.button} />
          <ItalicButton className={classNames.button} />
          <UnderlineButton className={classNames.button} />
          <AlignmentButtonBar className={classNames.button} />
          <LinkButton className={classNames.button} />
          <ListButtonBar className={classNames.button} />
        </SlateToolbar>

        <SlateToolbar>
          <FontFamilyDropdown className={classNames.dropdown} style={styles.dropdown} />
          <FontSizeInput
            {...fontSizePluginOptions}
            className={classNames.input}
            style={styles.input}
          />
          <ImageButton
            className={classNames.button}
            signingUrl={`${import.meta.env.VITE_DOMAIN_API_REST}/uploads`}
          />
          <ColorButton
            className={classNames.button}
            initialState={colorPluginOptions}
            pickerDefaultPosition={{ x: -520, y: 17 }}
          />
          <GridButtonBar className={classNames.button} />
          <EmbedButton className={classNames.button} />
        </SlateToolbar>

        <SlateContent />

        <SlateToolbar className='toolbar--footer'>
          <StateLoggerButton className={classNames.button} />
          <ToggleReadOnlyButton className={classNames.button} />
        </SlateToolbar>
      </SlateEditor>

      <div className='editor--root'>
        <p>
          You had a problem?!
          Report click <a
            href="https://github.com/nossas/slate-editor/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </p>
      </div>
    </div>
  )
}

export default Home
