import type { AppProps, NextWebVitalsMetric } from 'next/app'
import './_app.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />)
}