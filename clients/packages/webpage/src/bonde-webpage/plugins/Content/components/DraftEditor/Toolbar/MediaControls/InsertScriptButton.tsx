import React, { useState } from 'react';

type Props = {
  buttonClassName?: string;
  popoverClassName?: string;
  handleInsertScript: (param1: any, param2: any) => void;
};

const InsertScriptButton = ({
  handleInsertScript,
  buttonClassName,
  popoverClassName,
}: Props) => {
  const [showInputDialog, toggleInputDialog] = useState(false);
  const [script, setScript] = useState('');

  const getTagName = (script: any) => {
    if (script.startsWith('<iframe')) {
      return 'iframe';
    } else if (script.startsWith('<script')) {
      return 'script';
    }
    throw new Error('Sorry, script name not permitted');
  };

  const insertScript = () => {
    handleInsertScript(getTagName(script), script);
    setScript('');
    return toggleInputDialog(false);
  };

  return (
    <div>
      <button
        className={buttonClassName}
        onClick={() => toggleInputDialog(!showInputDialog)}
      >
        <i className="fa fa-code" />
      </button>
      {!showInputDialog ? null : (
        <div className={popoverClassName}>
          <input
            type="text"
            value={script}
            onChange={e => setScript(e.target.value)}
          />
          <button className="btn btn-outline white mx1" onClick={insertScript}>
            <i className="fa fa-check" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InsertScriptButton;
