const appVersion = require('exenv').canUseDOM ? window.navigator.appVersion : 'is not on browser'

export const isMac = () => appVersion.includes('Mac')
export const isLinux = () => appVersion.includes('Linux')
export const isWindows = () => appVersion.includes('Win')
export const isUnix = () => appVersion.includes('X11')
