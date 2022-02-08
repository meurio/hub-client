import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';
import { colorMarkStrategy, getMark, hasMark } from './ColorUtils';

// FIXME: Needs to handle assets files to work with SSR
import('./DraggableColorPicker.css')

interface OuterState {
  color: {
    showPicker: boolean;
    rgba: {
      r: number;
      g: number;
      b: number;
      a: number;
    }
  }
}

interface DraggableColorPickerProperties {
  value: any;
  changeState: any;
  outerState: OuterState;
}


const DraggableColorPicker: React.FC<DraggableColorPickerProperties | any> = ({
  value,
  changeState,
  outerState: {
    color: { showPicker },
  },
  pickerDefaultPosition,
}) => {
  let rgba = { r: 0, g: 0, b: 0, a: 1 }
  if (hasMark(value)) {
    rgba = getMark(value).data.get('rgba')
  }
  const draggableProperties: any = {
    handle: ".slate-color-plugin--draggable-handle",
    defaultPosition: pickerDefaultPosition,
    zIndex: 100
  }

  return (
    <Draggable {...draggableProperties}>
      <div className="slate-color-plugin--draggable-handle-container">
        <div className="slate-color-plugin--draggable-handle" />
        <SketchPicker
          color={rgba}
          onChangeComplete={color => {
            const rgbaChange = color.rgb
            changeState({
              value: colorMarkStrategy({ value, rgba: rgbaChange }).value,
              color: { rgba: rgbaChange, showPicker },
            })
          }}
        />
      </div>
    </Draggable>
  )
}

export default DraggableColorPicker
