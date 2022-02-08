import { createGlobalStyle, ThemeProvider } from 'styled-components'

import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-alignment-plugin/src/AlignmentButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-color-plugin/src/ColorButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-color-plugin/src/DraggableColorPicker.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-embed-plugin/src/EmbedButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-embed-plugin/src/EmbedNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-font-size-plugin/src/FontSizeInput.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-grid-plugin/src/GridButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-image-plugin/src/ImageEditLayer.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-image-plugin/src/ImageNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-link-plugin/src/LinkNode.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-list-plugin/src/ListButtonBar.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/Modal.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalButton.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalContent.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/modal/ModalForm.css'
import '../bonde-webpage/plugins/Content/components/SlateEditor/packages/slate-editor-components/src/tooltip/Tooltip.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}