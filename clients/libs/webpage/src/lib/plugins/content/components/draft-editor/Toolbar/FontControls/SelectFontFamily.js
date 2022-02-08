import PropTypes from 'prop-types'
import React from 'react'

const fonts = [
  'Abel', 'Anton', 'Archivo Narrow', 'Asap', 'Bree Serif',
  'Crimson Text', 'Cuprum', 'Exo', 'Exo 2', 'Fira Sans',
  'Francois One', 'Josefin Sans', 'Karla', 'Libre Baskerville',
  'Merriweather Sans', 'Pacifico', 'Poiret One', 'Quicksand',
  'Signika', 'Varela Round', 'Arvo', 'Bitter', 'Cabin',
  'Catamaran', 'Dosis', 'Fjalla One', 'Hind', 'Inconsolata',
  'Indie Flower', 'Lobster', 'Muli', 'Noto Serif', 'Nunito',
  'Oxygen', 'PT Serif', 'Playfair Display', 'Poppins',
  'Titillium Web', 'Ubuntu Condensed', 'Yanone Kaffeesatz',
  'Baloo Bhai', 'David Libre', 'Droid Sans', 'Gidugu',
  'Lalezar', 'Lato', 'Lora', 'Montserrat', 'Open Sans',
  'Open Sans Condensed', 'Oswald', 'PT Sans', 'Raleway',
  'Roboto', 'Roboto Condensed', 'Roboto Slab', 'Ruslan Display',
  'Slabo 27px', 'Source Sans Pro', 'Ubuntu'
]

const SelectFontFamily = props => (
  <select {...props} className='font-controls-family select col col-8 h5'>
    <option value=''>Selecione uma fonte</option>
    {fonts.map(
      font => <option key={font} value={font}>{font}</option>
    )}
  </select>
)

SelectFontFamily.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SelectFontFamily
