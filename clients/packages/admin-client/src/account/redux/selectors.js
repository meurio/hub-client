import Cookie from 'js-cookie';


export default (state) => ({
  isLoaded: () => state.auth?.isLoaded || true,
  getCredentials: () => ({
    'access-token': Cookie.get('session')
  }),
  getUser: () => state.auth?.user || {},
  getError: () => state.auth?.error || undefined
})
