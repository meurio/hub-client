import S from 'string'

export const sanitize = string => string.trim().toLowerCase().replace(/(\s|\.|-|_)/g, '')

export const slugify = (text) => S(text).slugify().s
  .replace(/[\s_-]/g, '-')  // Replace spaces with -
  .replace(/^-+/, '')       // Trim - from start of text
  .replace(/-+$/, '')      // Trim - from end of text
