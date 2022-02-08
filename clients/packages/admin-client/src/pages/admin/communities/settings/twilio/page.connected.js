//
// @route /community/twilio
//
import React from 'react'
// import { FormattedMessage } from 'react-intl'
// import { Info } from 'components/notify'
// import { createForm, Field } from 'storybook/forms'
// import {
//   combineValidations,
//   required,
//   isPhoneNumber
// } from 'storybook/forms/validate'
// import { SettingsForm, TextField } from 'storybook/settings/forms'
// // GraphQL
// import { connect } from 'react-redux'
// import * as graphqlMutations from 'graphql/mutations'
// import * as graphqlQueries from 'graphql/queries'
// import * as CommunityActions from 'community/action-creators'
// import * as CommunitySelectors from 'community/selectors'
// // This module
// import {
//   TwilioAccountSidHelp,
//   TwilioAuthTokenHelp,
//   TwilioNumberHelp
// } from './helpText'
// import { i18nKeys } from './i18n'

// const TwilioForm = createForm({
//   name: 'communityTwilioForm',
//   fields: [
//     'twilio_account_sid', 'twilio_auth_token', 'twilio_number'
//   ],
//   initialValues: (state, ownProps) => ({
//     ...ownProps.initialValues
//   }),
//   validate: combineValidations([
//     required(['twilio_account_sid', 'twilio_auth_token', 'twilio_number']),
//     isPhoneNumber('twilio_number')
//   ]),
//   submit: (values, ownProps) => (dispatch) => new Promise((resolve, reject) => {
//     const {
//       communityId,
//       isConfigPreexists,
//       addTwilioConfiguration,
//       updateTwilioConfiguration
//     } = ownProps

//     const variables = {
//       communityId,
//       twilioAccountSid: values.twilio_account_sid,
//       twilioAuthToken: values.twilio_auth_token,
//       twilioNumber: values.twilio_number
//     }

//     !isConfigPreexists && addTwilioConfiguration({ variables })
//       .then(res => {
//         dispatch(CommunityActions.setForcedSubmit(true))
//         return resolve()
//       })
//       .catch(err => {
//         console.error('err', err)
//         reject(err)
//       })

//     isConfigPreexists && updateTwilioConfiguration({ variables })
//       .then(res => {
//         dispatch(CommunityActions.setForcedSubmit(true))
//         return resolve()
//       })
//       .catch(err => {
//         console.error('err', err)
//         reject(err)
//       })

//     dispatch({ type: 'graphql/mutations/ADD_TWILIO_CONFIGURATION' })
//     return resolve()
//   }),
//   component: SettingsForm
// })

// const PageGraphQL = (props) => (
//   <TwilioForm i18nKeys={i18nKeys} {...props}>
//     <Info
//       title={(
//         <FormattedMessage
//           id='page--community-twilio.info.title'
//           defaultMessage='Integração com o Twilio'
//         />
//       )}
//     >
//       <FormattedMessage
//         id='page--community-twilio.info.content'
//         defaultMessage={
//           'Para pressionar por telefone, você precisa de uma conta no Twilio. ' +
//           'Se você ainda não tem uma conta lá, relaxe que é bem rápido para criar: ' +
//           '{link}, faça seu cadastro e crie um número de telefone no final.{linebreak}' +
//           'Com a conta criada, é só acessá-la e copiar os dados abaixo:'
//         }
//         values={{
//           linebreak: <br />,
//           link: (
//             <a href='https://www.twilio.com/try-twilio' target='_blank' rel="noopener noreferrer">
//               <FormattedMessage
//                 id='page--community-twilio.info.link'
//                 defaultMessage='clique aqui'
//               />
//             </a>
//           )
//         }}
//       />
//     </Info>
//     <Field
//       name='twilio_account_sid'
//       type='text'
//       placeholder='Ex: ACe4________6835_______2277_______'
//       component={TextField}
//       helpTextComponent={TwilioAccountSidHelp}
//     />
//     <Field
//       name='twilio_auth_token'
//       type='text'
//       placeholder='Ex: ecd5_______a82c_______b9c9______'
//       component={TextField}
//       helpTextComponent={TwilioAuthTokenHelp}
//     />
//     <Field
//       name='twilio_number'
//       type='text'
//       placeholder='Ex: +5511956781234'
//       component={TextField}
//       helpTextComponent={TwilioNumberHelp}
//     />
//   </TwilioForm>
// )

// const HOCGraphQL = Component => connect((state) => ({
//   communityId: CommunitySelectors.getCurrentId(state)
// }))(
//   compose(
//     graphql(graphqlMutations.addTwilioConfiguration, { name: 'addTwilioConfiguration' }),
//     graphql(graphqlMutations.updateTwilioConfiguration, { name: 'updateTwilioConfiguration' }),
//     graphql(graphqlQueries.fetchTwilioConfiguration, {
//       options: ({ communityId }) => ({
//         fetchPolicy: 'network-only',
//         variables: { communityId: communityId }
//       }),
//       props: ({ ownProps, data: { configs, loading } }) => {
//         const [config] = (configs && configs.list) || []
//         const isConfigPreexists = !!config
//         const initialValues = !config ? {} : {
//           twilio_account_sid: config.twilioAccountSid,
//           twilio_auth_token: config.twilioAuthToken,
//           twilio_number: config.twilioNumber
//         }
//         // Props passed to mount initialValues and submit action
//         return { initialValues, isConfigPreexists, communityId: ownProps.communityId }
//       }
//     })
//   )(Component)
// )

// export default HOCGraphQL(PageGraphQL)

const PageGraphQL = () => {
  return (
    <h3>Override PageGraphQL</h3>
  );
}

export default PageGraphQL;
