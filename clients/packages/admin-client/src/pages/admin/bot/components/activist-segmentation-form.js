import React from 'react'
// import { connect } from 'react-redux'
// import { reduxForm } from 'redux-form'
// import Select from 'react-select-plus'

// import * as graphqlQueries from 'graphql/queries'
// import * as validationHelper from 'utils/validation-helper'
// import * as CommunitySelectors from 'community/selectors'
// import { client as graphqlClient } from 'store'
// import { FlatForm } from 'ux/components'
// import { FormGroup, ControlLabel, FormControl } from 'components/forms'
// import Summary from './summary'

// var styles = require('exenv').canUseDOM ? require('./activist-segmentation-form.scss') : {}

// const formatDate = date => {
//   if (!date) return
//   const [day, month, year] = date.split('/')
//   return `${year}-${month}-${day}`
// }

// const formatArray = list => {
//   if (!list || !list.length) return
//   return `{${list.map(item => item.value).join(',')}}`
// }

// class ActivistSegmentationForm extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       campaignExclusionIds: undefined,
//       campaignInclusionIds: undefined
//     }
//   }

//   componentWillReceiveProps ({ forceReset, communityCampaigns, changeParentState }) {
//     if (forceReset) {
//       communityCampaigns.refetch()
//       changeParentState({ forceResetSearch: false })
//     }
//   }

//   render () {
//     const {
//       fields: {
//         message,
//         quick_reply: quickReply,
//         date_interval_start: dateIntervalStart,
//         date_interval_end: dateIntervalEnd,
//         campaign_exclusion_ids: campaignExclusionIds,
//         campaign_inclusion_ids: campaignInclusionIds
//       },
//       totalImpactedActivists,
//       changeParentState,
//       segmentation,
//       communityCampaigns,
//       ...formProps
//     } = this.props

//     const hasSegmentationChanged = Object.keys(segmentation) === 0 || (
//       (segmentation.message || '') !== message.value ||
//       (segmentation.quickReply || '') !== quickReply.value ||
//       (segmentation.dateIntervalStart) !== formatDate(dateIntervalStart.value) ||
//       (segmentation.dateIntervalEnd) !== formatDate(dateIntervalEnd.value) ||
//       (segmentation.campaignExclusionIds || '') !== campaignExclusionIds.value ||
//       (segmentation.campaignInclusionIds || '') !== campaignInclusionIds.value
//     )

//     const disableMessageButton = !formProps.valid || !totalImpactedActivists || hasSegmentationChanged
//     const disableFilterButton = !formProps.valid || !hasSegmentationChanged

//     return (
//       <FlatForm
//         {...formProps}
//         hideButton
//         style={{ paddingTop: '.5rem', width: 'calc(500px - 4rem)' }}
//         submit={values => {
//           const {
//             message,
//             quick_reply: quickReply,
//             date_interval_start: dateIntervalStart,
//             date_interval_end: dateIntervalEnd,
//             campaign_exclusion_ids: campaignExclusionIds,
//             campaign_inclusion_ids: campaignInclusionIds
//           } = values

//           const currentSegmentation = {
//             message: message || undefined,
//             quickReply: quickReply || undefined,
//             dateIntervalStart: formatDate(dateIntervalStart),
//             dateIntervalEnd: formatDate(dateIntervalEnd),
//             campaignExclusionIds,
//             campaignInclusionIds
//           }

//           changeParentState({ loading: true, segmentation: currentSegmentation })

//           graphqlClient().query({
//             query: graphqlQueries.fetchFacebookBotActivistsStrategy({ extraFields: ['data'] }),
//             variables: {
//               first: 50,
//               search: JSON.stringify(currentSegmentation)
//             }
//           })
//             .then(({
//               loading,
//               data: { query: { activists, totalCount: totalImpactedActivists } }
//             }) => {
//               changeParentState({
//                 loading,
//                 totalImpactedActivists,
//                 listActivists: !activists.length ? [] : activists.map(a => JSON.parse(a.data))
//               })
//             })
//             .catch(err => console.error(err))
//         }}
//       >
//         <FormGroup className='mb2' controlId='message' {...message}>
//           <ControlLabel>Mensagem</ControlLabel>
//           <FormControl
//             type='text'
//             placeholder='Digite aqui a mensagem que o usuário enviou'
//           />
//         </FormGroup>

//         <FormGroup className='mb2' controlId='quickReply' {...quickReply}>
//           <ControlLabel>Quick Reply</ControlLabel>
//           <FormControl
//             type='text'
//             placeholder='Ex: QUICK_REPLY_A'
//           />
//         </FormGroup>

//         <div className='clearfix col-12' style={{ marginBottom: '1.5rem' }}>
//           <FormGroup className='col col-6' controlId='dateIntervalStart' {...dateIntervalStart}>
//             <ControlLabel>Data de início</ControlLabel>
//             <FormControl
//               type='text'
//               placeholder='Ex: DD/MM/AAAA'
//             />
//           </FormGroup>

//           <FormGroup className='col col-6' controlId='dateIntervalEnd' {...dateIntervalEnd}>
//             <ControlLabel>Data limite</ControlLabel>
//             <FormControl
//               type='text'
//               placeholder='Ex: DD/MM/AAAA'
//             />
//           </FormGroup>
//         </div>

//         {communityCampaigns.query && communityCampaigns.query.campaigns.length > 0 && (
//           <div>
//             <FormGroup
//               className={`${styles.multiselectField} mb2`}
//               controlId='campaignExclusion'
//               {...campaignExclusionIds}
//             >
//               <ControlLabel>Exclusão de campanhas</ControlLabel>
//               <Select
//                 multi
//                 placeholder='Selecione...'
//                 noResultsText='Nenhum resultado encontrado'
//                 name='campaign_exclusion_ids'
//                 value={this.state.campaignExclusionIds}
//                 onOpen={() => changeParentState({ backgroundAlignmentY: 'top' })}
//                 onClose={() => changeParentState({ backgroundAlignmentY: 'center' })}
//                 options={
//                   communityCampaigns.query.campaigns.map(c => ({ value: c.id, label: c.name }))
//                 }
//                 onChange={value => {
//                   this.setState({ campaignExclusionIds: value })
//                   campaignExclusionIds.onChange(formatArray(value))
//                 }}
//               />
//             </FormGroup>

//             <FormGroup
//               className={`${styles.multiselectField} mb2`}
//               controlId='campaignInclusion'
//               {...campaignInclusionIds}
//             >
//               <ControlLabel>Inclusão de campanhas</ControlLabel>
//               <Select
//                 multi
//                 placeholder='Selecione...'
//                 noResultsText='Nenhum resultado encontrado'
//                 name='campaign_inclusion_ids'
//                 value={this.state.campaignInclusionIds}
//                 onOpen={() => changeParentState({ backgroundAlignmentY: 'top' })}
//                 onClose={() => changeParentState({ backgroundAlignmentY: 'center' })}
//                 options={
//                   communityCampaigns.loading ? [] : communityCampaigns.query
//                     .campaigns.map(c => ({ value: c.id, label: c.name }))
//                 }
//                 onChange={value => {
//                   this.setState({ campaignInclusionIds: value })
//                   campaignInclusionIds.onChange(formatArray(value))
//                 }}
//               />
//             </FormGroup>
//           </div>
//         )}

//         {totalImpactedActivists > 0 && <Summary value={totalImpactedActivists} />}

//         <div className='clearfix col-12 mt2'>
//           <div className='col col-6'>
//             <button
//               type='button'
//               disabled={disableMessageButton}
//               onClick={() => changeParentState({ searchFinished: true })}
//               className='btn white bg-pagenta caps p2 rounded h4'
//               style={{
//                 width: 'calc(250px - 3rem)',
//                 marginBottom: '2rem',
//                 marginRight: '1rem',
//                 backgroundColor: disableMessageButton ? '#f2f2f2' : '#000000'
//               }}
//             >
//               Enviar mensagem
//             </button>
//           </div>
//           <div className='col col-6'>
//             <button
//               type='submit'
//               disabled={disableFilterButton}
//               className='btn white bg-pagenta caps p2 rounded h4'
//               style={{
//                 width: 'calc(250px - 3rem)',
//                 marginBottom: '2rem',
//                 marginLeft: '1rem',
//                 backgroundColor: disableFilterButton ? '#f2f2f2' : '#000000'
//               }}
//             >
//               Filtrar
//             </button>
//           </div>
//         </div>
//       </FlatForm>
//     )
//   }
// }

// export const form = 'facebookBotActivistSegmentationForm'
// export const fields = [
//   'message',
//   'quick_reply',
//   'date_interval_start',
//   'date_interval_end',
//   'campaign_exclusion_ids',
//   'campaign_inclusion_ids'
// ]
// export const validate = values => {
//   const errors = {}
//   const {
//     message,
//     quick_reply: quickReply,
//     date_interval_start: dateIntervalStart,
//     date_interval_end: dateIntervalEnd
//   } = values

//   const regexDateFormat = /\d{2}\/\d{2}\/\d{2}/
//   if (dateIntervalStart && dateIntervalEnd) {
//     if (dateIntervalStart.match(regexDateFormat) && dateIntervalEnd.match(regexDateFormat)) {
//       const toDateObject = dateString => {
//         const [day, month, year] = dateString.split('/')
//         return new Date(`${year}-${month}-${day}`)
//       }
//       const start = toDateObject(dateIntervalStart)
//       const end = toDateObject(dateIntervalEnd)

//       if (start > end) {
//         errors.date_interval_start = 'Deve ser menor'
//         errors.date_interval_end = 'Deve ser maior'
//       }
//     }
//   }

//   if (dateIntervalStart) {
//     if (!dateIntervalStart.match(regexDateFormat)) {
//       errors.date_interval_start = 'Ex: DD/MM/AAAA'
//     } else {
//       const [day, month, year] = dateIntervalStart.split('/')
//       if (!validationHelper.isValidDate({ day, month, year })) {
//         errors.date_interval_start = 'Data inválida'
//       }
//     }
//   }

//   if (dateIntervalEnd) {
//     if (!dateIntervalEnd.match(regexDateFormat)) {
//       errors.date_interval_end = 'Ex: DD/MM/AAAA'
//     } else {
//       const [day, month, year] = dateIntervalEnd.split('/')
//       if (!validationHelper.isValidDate({ day, month, year })) {
//         errors.date_interval_end = 'Data inválida'
//       }
//     }
//   }

//   if (!dateIntervalStart && dateIntervalEnd) errors.date_interval_start = 'Preencha'
//   if (dateIntervalStart && !dateIntervalEnd) errors.date_interval_end = 'Preencha'

//   if (!message && !quickReply && !dateIntervalStart && !dateIntervalEnd) {
//     errors.message = 'Preencha'
//     errors.quick_reply = 'Preencha'
//     errors.date_interval_start = 'Preencha'
//     errors.date_interval_end = 'Preencha'
//   }

//   return errors
// }

// const mapStateToProps = state => ({ community: CommunitySelectors.getCurrent(state) })

// export default connect(mapStateToProps)(graphql(
//   graphqlQueries.fetchFacebookBotCampaignsByCommunityId, {
//     name: 'communityCampaigns',
//     options: ({ community }) => ({ variables: { communityId: community.id } })
//   }
// )(reduxForm({ form, fields, validate })(ActivistSegmentationForm)))

const ActivistSegmentationForm = () => {
  return (
    <h3>Override ActivistSegmentationForm</h3>
  );
}

export default ActivistSegmentationForm;