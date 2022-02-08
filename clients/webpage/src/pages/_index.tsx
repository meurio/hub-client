// import * as React from 'react';

// import { init as initApm } from '@elastic/apm-rum';
// import i18n from 'i18next';
// import getConfig from 'next/config';
// import Head from 'next/head';
// import { initReactI18next, withSSR } from 'react-i18next';
// import { connect } from 'react-redux';

// import * as pkgInfo from '../../package.json';
// import {
//   // asyncFilterMobilization,
//   // asyncFilterBlock,
//   // asyncFilterWidget,
//   Styles,
// } from '../bonde-webpage';
// import asyncFilterBlockGraphql from '../graphql-app/filterBlocks';
// import asyncFilterMobilizationGraphql from '../graphql-app/filterMobilizations';
// import asyncFilterWidgetGraphql from '../graphql-app/filterWidgets';
// import initialI18nStore from '../initialI18nStore';
// import Error404 from './404';
// import MeuRioStyles from './components/MeuRioStyles';
// import MobilizationConnected from './components/MobilizationConnected';
// import { wrapper } from '../redux-app/configureStore';
// import { NextPage } from 'next';

// const { publicRuntimeConfig } = getConfig();

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     debug: process.env.NODE_ENV === 'development',
//     resources: initialI18nStore,
//     lng: 'pt-BR',
//     fallbackLng: 'pt-BR',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// interface PageProps {
//   mobilization: any;
//   protocol: string;
// }

// const AppLanguage = withSSR()(() => {
//   return (
//     <MeuRioStyles>
//       <Styles>
//         <MobilizationConnected />
//       </Styles>
//     </MeuRioStyles>
//   );
// });

// // class Page extends React.Component<PageProps> {
// // static async getInitialProps({ store, res, req }: any = {}) {

// const Page: NextPage<any> = (props: PageProps) => {

//   if (!props.mobilization) return <Error404 />;

//   const {
//     name,
//     goal,
//     favicon,
//     facebook_share_title: facebookShareTitle,
//     facebook_share_description: facebookShareDescription,
//     facebook_share_image: facebookShareImage,
//     custom_domain: customDomain,
//     google_analytics_code: googleAnalyticsCode,
//     slug,
//     language,
//   } = props.mobilization;

//   const domain =
//     customDomain ||
//     `${slug}.${publicRuntimeConfig.domainPublic || 'staging.bonde.org'}`;
//   const url = `${props.protocol}://${domain}`;

//   initApm({
//     // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
//     serviceName: `Bonde Webpage - ${domain.replace(/\./g, '-')}`,
//     // Set custom APM Server URL (default: http://localhost:8200)
//     serverUrl:
//       'https://421ca5e3d4c44a04a7f832f08aefbcda.apm.us-east-1.aws.cloud.es.io:443',
//     // Set the service version (required for source map feature)
//     serviceVersion: pkgInfo.version,
//     // Set the service environment
//     environment: 'production',
//   });

//   return (
//     <div className="container">
//       <Head>
//         <title>{name}</title>
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="description" content={goal} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={facebookShareTitle} />
//         <meta name="twitter:description" content={facebookShareDescription} />
//         <meta name="twitter:image" content={facebookShareImage} />
//         <meta property="twitter:url" content={url} />
//         <meta property="og:url" content={url} />
//         <meta property="og:title" content={facebookShareTitle} />
//         <meta property="og:description" content={facebookShareDescription} />
//         <meta property="og:image" content={facebookShareImage} />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="32x32"
//           href={
//             favicon ||
//             'https://static.bonde.org/static/images/icon/favicon-32.png'
//           }
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="16x16"
//           href={
//             favicon ||
//             'https://static.bonde.org/static/images/icon/favicon-16.png'
//           }
//         />
//         <link
//           type="text/css"
//           href="https://fonts.googleapis.com/css?family=Abel|Anton|Archivo+Narrow:400,400i,700,700i|Arvo:400,400i,700,700i|Asap:400,400i,700,700i|Baloo+Bhai|Bitter:400,400i,700|Bree+Serif|Cabin:400,400i,700,700i|Catamaran:400,700|Crimson+Text:400,400i,700,700i|Cuprum:400,400i,700,700i|David+Libre:400,700|Dosis:400,700|Droid+Sans:400,700|Exo+2:400,400i,700,700i|Exo:400,400i,700,700i|Fira+Sans:400,400i,700,700i|Fjalla+One|Francois+One|Gidugu|Hind:400,700|Inconsolata:400,700|Indie+Flower|Josefin+Sans:400,400i,700,700i|Karla:400,400i,700,700i|Lalezar|Lato:400,400i,700,700i|Libre+Baskerville:400,400i,700|Lobster|Lora:400,400i,700,700i|Merriweather+Sans:400,400i,700,700i|Montserrat:400,700|Muli:400,400i|Noto+Serif:400,400i,700,700i|Nunito:400,700|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,700,700i|Oswald:400,700|Oxygen:400,700|PT+Sans:400,400i,700,700i|PT+Serif:400,400i,700,700i|Pacifico|Playfair+Display:400,400i,700,700i|Poiret+One|Poppins:400,700|Quicksand:400,700|Raleway:400,400i,700,700i|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,700,700i|Ruslan+Display|Signika:400,700|Slabo+27px|Source+Sans+Pro:200,300,400,700|Titillium+Web:400,400i,700,700i|Ubuntu+Condensed|Ubuntu:400,400i,700,700i|Varela+Round|Yanone+Kaffeesatz:400,700&display=optional"
//           rel="stylesheet"
//         />
//         <script
//           type="text/javascript"
//           src="https://assets.pagar.me/checkout/checkout.js"
//           async
//         />
//         <script
//           async
//           src={`https://www.googletagmanager.com/gtag/js?id=${{
//             googleAnalyticsCode,
//           }}`}
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', '${googleAnalyticsCode}', {
//                 debug_mode: true,
//                 page_location: '${url}',
//                 page_title: '${name}'
//               });
//             `,
//           }}
//         />
//       </Head>
//       <AppLanguage
//         initialLanguage={language}
//         initialI18nStore={initialI18nStore}
//       />
//     </div>
//   );
// }

// const mapStateToProps = (state: any) => {
//   const composeProps: any = {
//     mobilization: {},
//   };
//   const {
//     intl: { currentLocale },
//     mobilizations: {
//       list: { currentId, data, isLoaded },
//     },
//     sourceRequest: { protocol },
//   } = state;

//   if (currentId) {
//     // eslint-disable-next-line prefer-destructuring
//     composeProps.mobilization = data.filter(
//       (...id: any[]) => id === currentId
//     )[0];
//   } else if (data.length === 1) {
//     // eslint-disable-next-line prefer-destructuring
//     composeProps.mobilization = data[0];
//   }

//   return { isLoaded, ...composeProps, protocol, currentLocale };
// };

// Page.getInitialProps = wrapper.getInitialPageProps(store => async ({req, res}) => {
//   console.log("getInitialProps >>>", { req,res })
//   const { dispatch, getState }: any = store;
//   const { host } = getState().sourceRequest;
//   const { protocol } = getState().sourceRequest;
//   const appDomain = publicRuntimeConfig.domainPublic || 'staging.bonde.org';
//   const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent || '';

//   if (userAgent.toLowerCase().indexOf('less') > 0) {
//     res?.end();
//   }

//   if (host) {
//     if (res) {
//       if (!host.startsWith('www', 0)) {
//         res.writeHead(302, {
//           Location: `${protocol}://www.${host}`,
//         });
//         res.end();
//       }
//     }
//   }

//   const fetchData = async (filter?: any) => {
//     const regex = host.match(`(.+).${appDomain}`);
//     const where = regex
//       ? { slug: regex[1].replace(/^www\./, '') }
//       : { custom_domain: host };

//     await dispatch(asyncFilterMobilizationGraphql(filter || where));
//     await dispatch(asyncFilterBlockGraphql(filter || where));
//     await dispatch(asyncFilterWidgetGraphql(filter || where));
//   };

//   // await fetchData();
//   // Mobiization with all widgets configured.
//   await fetchData({ slug: 'teste-de-widgets' });
// });

// // const App = (props: any) => {
// //   console.log('props', props);
// //   useSSR({
// //     es: {
// //       "Welcome to React": "Bien viendo a React e react-i18next"
// //     },
// //     ['pt-br']: {
// //       "Welcome to React": "Bem vindo ao React e react-i18next"
// //     }
// //   }, props.mobilization ? props.mobilization.language : 'pt-br');

// //   return <Page {...props} />
// // }

// export default connect(mapStateToProps)(Page);

const DummyIndex = () =>
  <h2>DummyIndex</h2>
;

export default DummyIndex;