import React, { useState, useEffect } from 'react';
import EditorUtils from '../EditorUtils';
import SelectFontFamily from './SelectFontFamily';
import { Wrapper } from './styles';

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: any) => void;
  focusEditor: () => void;
  initialValue:
    | {
        fontSize: number;
        fontFamily: string;
      }
    | any;
};

const FontControls = ({
  focusEditor,
  editorState,
  setEditorState,
  ...props
}: Props) => {
  const [initialValues, setState] = useState(props.initialValue);
  const inlineStyle = editorState.getCurrentInlineStyle();
  const changeStyles = (editorState: any) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    setState({ ...EditorUtils.customSizeAndFamily(currentStyle) });
  };

  useEffect(() => {
    changeStyles(editorState);
  }, [inlineStyle, editorState]);

  const handleChangeSize = (e: any) => {
    const fontSize = e.target.value;

    if (fontSize) {
      const editorStateWithFontSize = EditorUtils.toggleInlineStyle(
        editorState,
        `font-size: ${fontSize}px;`
      );
      setEditorState(editorStateWithFontSize);
      setState({
        ...initialValues,
        fontSize,
      });
    }
  };

  const handleChangeFont = (e: any) => {
    const fontFamily = e.target.value;

    const editorStateWithFontFamily = EditorUtils.toggleInlineStyle(
      editorState,
      `font-family: ${fontFamily};`
    );
    setEditorState(editorStateWithFontFamily);
    setState({
      fontSize: initialValues.fontSize,
      fontFamily,
    });
  };

  const handleMouseOut = () => focusEditor();

  return (
    <Wrapper className="font-controls">
      <input
        type="number"
        value={initialValues.fontSize}
        onChange={handleChangeSize}
        onMouseOut={handleMouseOut}
        className="font-controls-size input col col-3 h5 mx1"
      />
      <SelectFontFamily
        onChange={handleChangeFont}
        value={initialValues.fontFamily}
        onMouseOut={handleMouseOut}
      />
    </Wrapper>
  );
};

export default FontControls;
