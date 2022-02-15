import React from 'react';
import { DraftEditor, SlateEditor } from './components';

type Props = {
  mobilization: Record<any, any>;
  widget: {
    id: number;
    settings: {
      content: string | Record<any, any>;
    };
  };
  editable?: boolean;
  handleSave: any;
  handleDelete: any;
};

const Content = ({ widget: { settings }, ...props }: Props) => {
  let content = settings.content;
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (e) {
      // HTML only
      return <div dangerouslySetInnerHTML={{ __html: content as string }} />;
    }
  }

  if ((content as Record<any, any>).entityMap) {
    return (
      <DraftEditor {...props} readOnly={!props.editable} settings={settings} />
    );
  }

  return (
    <SlateEditor {...props} readOnly={!props.editable} content={content} />
  );
};

export default Content;
