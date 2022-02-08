import Cookie from 'js-cookie';

export const getList = state => state.community.list.data

export const getCurrentId = () => JSON.parse(Cookie.get('community')).id

export const isLoaded = state => state.community.list.isLoaded

export const isLoading = state => state.community.list.loading

export const isForcedSubmit = state => state.community.list.forcedSubmit

export const getCurrent = () => JSON.parse(Cookie.get('community'))
