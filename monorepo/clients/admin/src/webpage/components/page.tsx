import { useEffect } from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { useAppState } from '../Application';
import fetchMobilizations from '../async-actions/fetch-mobilizations';
import Mobilization from "./mobilization";

const fonts = [
  { font: 'Armata', weights: ['regular'] },
  { font: 'Arvo', weights: ['regular', 'italic', '700', '700italic'] },
  { font: 'Dosis', weights: ['200', '300', 'regular', '500', '600', '700', '800'] },
  { font: 'Droid Sans', weights: ['regular', '700'] },
  { font: 'Fjalla One', weights: ['regular'] },
  { font: 'Glegoo', weights: ['regular', '700'] },
  {
    font: 'Lato',
    weights: ['100', '100italic', '300', '300italic', 'regular', 'italic', '700', '700italic', '900',
      '900italic']
  },
  {
    font: 'Merriweather',
    weights: ['300', '300italic', 'regular', 'italic', '700', '700italic', '900', '900italic']
  },
  {
    font: 'Merriweather Sans',
    weights: ['300', '300italic', 'regular', 'italic', '700', '700italic', '800', '800italic']
  },
  {
    font: 'Open Sans',
    weights: ['300', '300italic', 'regular', 'italic', '600', '600italic', '700', '700italic', '800',
      '800italic']
  },
  { font: 'Oswald', weights: ['300', 'regular', '700'] },
  { font: 'PT Mono', weights: ['regular'] },
  {
    font: 'Source Sans Pro',
    weights: ['200', '200italic', '300', '300italic', 'regular', 'italic', '600', '600italic', '700',
      '700italic', '900', '900italic']
  },
  {
    font: 'Ubuntu',
    weights: ['300', '300italic', 'regular', 'italic', '500', '500italic', '700', '700italic']
  }
]

const Page: React.FC = () => {
  const { state, dispatch } = useAppState();
  
  useEffect(() => {
    fetchMobilizations(state, dispatch)();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <GoogleFontLoader fonts={fonts} />
      <Mobilization />
    </>
  );
}

export default Page;