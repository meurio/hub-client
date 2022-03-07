// import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {
  UIProvider,
  theme,
} from 'bonde-ui';
import { CSSReset } from 'bonde-ui/src/base';

import './_app.css';

// const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
// `

// const theme = {
//   colors: {
//     primary: '#0070f3',
//   },
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider> */}
      <UIProvider theme={theme}>
        {/* Google Fonts Loader in _app.css */}
        <CSSReset />
        {/* <ToastContainer
          className='BondeToastify'
          hideProgressBar={true}
        /> */}
        <Component {...pageProps} />
      </UIProvider>
    </>
  )
}