import classnames from 'classnames'
import { SketchPicker } from 'react-color'
import { useAppState } from '../../../Application';
import * as t from "../../../action-types";
import themes from './themes'

interface ColorPickerProperties {
  onChangeColor?: any;
  className?: string[] | string;
  showColorPicker?: boolean;
  theme?: string;
  color: any;
  selectedColor?: any;
}

export const ColorPicker = ({
  className,
  theme,
  showColorPicker,
  onChangeColor,
  selectedColor,
  color
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: ColorPickerProperties): any => {
  const hasTheme = theme && themes[theme]
  const colorStrategy = selectedColor || (hasTheme ? themes[theme][0] : '#333')

  return showColorPicker && (
    <div className={classnames('color-picker-container', className)}>
      <SketchPicker
        color={color || colorStrategy}
        onChangeComplete={onChangeColor}
        presetColors={hasTheme ? themes[theme] : []}
      />
    </div>
  );
}

export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const colorPickerProperties = {
    selectedColor: state.colorPicker.color || "#333",
    onChangeColor: (color: any): void => dispatch({ type: t.SET_SELECTED_COLOR, payload: color })
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ColorPicker {...properties} {...colorPickerProperties} />;
}
