import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import themes from '../themes';

type Props = {
  color?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    rgb: {};
  };
  onRemoveColor: any;
  onChangeColor: (color: any) => void;
  focusEditor: any;
  className?: string;
  theme?: any;
};

const ColorPickerButton = ({
  className,
  theme,
  color,
  onChangeColor,
}: Props) => {
  const [showColorPicker, setColorPicker] = useState(false);

  const toggleColorPicker = () => setColorPicker(!showColorPicker);

  const handleChangeColor = (focusEditor: any) => {
    setColorPicker(false);
    focusEditor();
  };

  const presetColors = theme ? (themes as any)[theme] : [];

  const colorPickerProps = {
    color: (color as any).rgb,
    presetColors,
    onChangeComplete: () => onChangeColor((color as any).rgb),
  };

  return (
    <div>
      <button type="button" className={className} onClick={toggleColorPicker}>
        <i className="fa fa-eyedropper" />
      </button>
      {showColorPicker ? (
        <div className="absolute left-0">
          <SketchPicker {...colorPickerProps} />
          <button
            className="btn bg-darken-4 white col-12 rounded-bottom"
            onClick={handleChangeColor}
          >
            Fechar
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ColorPickerButton;
