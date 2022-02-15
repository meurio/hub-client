import React from 'react';
import { DraftEditor, SlateEditor } from '../../plugins/Content/components';

import { checkToParse } from '../../utils';

type Props = {
  widget: {
    settings: {
      finish_message: string;
      finish_message_background: string;
    };
  };
  readOnly: boolean;
  mobilization: Record<any, any>;
};

const FinishMessageCustom = ({
  readOnly,
  widget: { settings },
  mobilization,
}: Props) => {
  const {
    finish_message: finishMessage,
    finish_message_background: finishMessageBackground,
  } = settings;

  const content = checkToParse(finishMessage);

  return content.entityMap ? (
    <DraftEditor
      handleSave={() => console.log('salvando')}
      handleDelete={() => console.log('deletando')}
      mobilization={mobilization}
      settings={settings}
      readOnly={readOnly}
      value={content}
      editorStyle={{
        backgroundColor: `rgba(${finishMessageBackground})`,
        borderRadius: 3,
      }}
    />
  ) : (
    <SlateEditor
      content={finishMessage}
      readOnly={readOnly}
      contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
    />
  );
};

FinishMessageCustom.defaultProps = {
  readOnly: true,
};

export default FinishMessageCustom;
