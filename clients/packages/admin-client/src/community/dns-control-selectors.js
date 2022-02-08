export default (state, props) => ({

  dnsHostedZones: (dnsHostedZones = state.community.dnsHostedZones) => ({
    isLoaded: () => dnsHostedZones.isLoaded,
    isLoading: () => dnsHostedZones.fetching,
    getList: () => dnsHostedZones.data,
    isSaving: () => dnsHostedZones.saving,
    get: (id) => dnsHostedZones.data.filter(d => d.id === parseInt(id))[0]
  }),

  dnsRecords: (dnsRecords = state.community.dnsRecords) => ({
    isLoading: () => dnsRecords.fetching,
    isSaving: () => dnsRecords.saving,
    getList: () => dnsRecords.data
  })
})
