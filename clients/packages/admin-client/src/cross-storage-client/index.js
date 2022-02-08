import { CrossStorageClient } from 'cross-storage'

// TODO: Check this variable, its coming undefined
const storage = new CrossStorageClient(process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://cross-storage.bonde.devel')

export default storage
