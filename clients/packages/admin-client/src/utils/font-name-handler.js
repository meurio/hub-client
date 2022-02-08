//
// In future, remove this and get these infos from Google Web Fonts API response.
//
export const fontsData = {
  'armata': { name: 'Armata', weight: ['regular'] },
  'arvo': { name: 'Arvo', weight: ['regular', 'italic', '700', '700italic'] },
  'dosis': { name: 'Dosis', weight: ['200', '300', 'regular', '500', '600', '700', '800'] },
  'droidsans': { name: 'Droid Sans', weight: ['regular', '700'] },
  'fjallaone': { name: 'Fjalla One', weight: ['regular'] },
  'glegoo': { name: 'Glegoo', weight: ['regular', '700'] },
  'lato': {
    name: 'Lato',
    weight: ['100', '100italic', '300', '300italic', 'regular', 'italic', '700', '700italic', '900',
      '900italic']
  },
  'merriweather': {
    name: 'Merriweather',
    weight: ['300', '300italic', 'regular', 'italic', '700', '700italic', '900', '900italic']
  },
  'merriweathersans': {
    name: 'Merriweather Sans',
    weight: ['300', '300italic', 'regular', 'italic', '700', '700italic', '800', '800italic']
  },
  'opensans': {
    name: 'Open Sans',
    weight: ['300', '300italic', 'regular', 'italic', '600', '600italic', '700', '700italic', '800',
      '800italic']
  },
  'oswald': { name: 'Oswald', weight: ['300', 'regular', '700'] },
  'ptmono': { name: 'PT Mono', weight: ['regular'] },
  'sourcesanspro': {
    name: 'Source Sans Pro',
    weight: ['200', '200italic', '300', '300italic', 'regular', 'italic', '600', '600italic', '700',
      '700italic', '900', '900italic']
  },
  'ubuntu': {
    name: 'Ubuntu',
    weight: ['300', '300italic', 'regular', 'italic', '500', '500italic', '700', '700italic']
  }
}

const excludeLocalFonts = font => !['PF Din', 'Proxima Nova'].includes(font)

export const normalizeFontsToLinkStyle = names => (!names.length
  ? []
  : names.filter(excludeLocalFonts).map(fontname => {
    const sanitizedFontName = fontname.replace(/\s/g, '').toLowerCase()
    const font = fontsData[sanitizedFontName]
    if (!font) return null

    const { name, weight } = font
    const normalizedName = name.replace(/\s/g, '+')
    const normalizedWeight = weight ? `:${weight.join(',')}` : ''
    return `${normalizedName}${normalizedWeight}`
  })
).join('|')

export const GOOGLE_FONTS_API_CSS_URL = 'https://fonts.googleapis.com/css'
export const getGoogleFontsLoadURL = fonts => {
  let fontsArray = fonts
  if (fonts.constructor !== Array) fontsArray = [fonts]
  fontsArray = fontsArray.filter(font => font)
  if (!fontsArray.length) return null

  const fontFamiliesQueryParam = normalizeFontsToLinkStyle(fontsArray)
  return `${GOOGLE_FONTS_API_CSS_URL}?family=${fontFamiliesQueryParam}`
}

export const needsToLoadGoogleFonts = fonts =>
  fonts.constructor === Array ? fonts.filter(excludeLocalFonts).length > 0 : false
