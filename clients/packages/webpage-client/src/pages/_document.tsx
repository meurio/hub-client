// import Document from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         })

//       const initialProps = await Document.getInitialProps(ctx)
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       }
//     } finally {
//       sheet.seal()
//     }
//   }
// }
// pages/_document.js
// import { FontsLoader } from 'bonde-ui'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* 👇 Here's the script */}
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          {/* <FontsLoader /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}