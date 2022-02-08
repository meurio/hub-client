import React from 'react';
import Editor from './EditableMode';
import { checkToParse } from '../../../../utils';
import { Wrapper } from './styles';

type Props = {
  mobilization: Record<any, any>;
  settings: Record<any, any>;
  readOnly: boolean;
  value?: any;
  editorStyle?: {
    backgroundColor: string;
    borderRadius: string | number;
  };
  handleSave: any;
  containerStyle?: Record<string, string | number>;
  toolbarStyle?: Record<string, string | number>;
  toolbarContainerStyle?: Record<string, string | number>;
  focusStyle?: Record<string, string | number>;
  theme?: string;
  handleDelete: any;
};

const DraftEditor = ({ mobilization, settings, ...props }: Props) => {
  const theme =
    mobilization && mobilization.color_scheme
      ? mobilization.color_scheme.replace('-scheme', '')
      : null;

  let value = checkToParse(settings.content);

  return (
    <Wrapper className="widgets--content-plugin widget editor-new">
      <Editor {...props} readOnly value={value} theme={theme} />
    </Wrapper>
  );
};

export default DraftEditor;
