import React from 'react';
import fonts from './fonts';

type Props = {
  value: string;
  onChange: (e: any) => any;
  onMouseOut: () => any;
};

const SelectFontFamily = (props: Props) => (
  <select {...props} className="font-controls-family select col col-8 h5">
    <option value="">Selecione uma fonte</option>
    {fonts.map(font => (
      <option key={font} value={font}>
        {font}
      </option>
    ))}
  </select>
);

export default SelectFontFamily;
