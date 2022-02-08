import { combineReducers } from 'redux'

import communitiesReducer from './communities'
import dnsHostedReducer from './dns-hosted-zones'
import dnsRecordsReducer from './dns-records'

export default combineReducers({
  list: communitiesReducer,
  dnsHostedZones: dnsHostedReducer,
  dnsRecords: dnsRecordsReducer
})
