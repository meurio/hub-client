import React, { useState, useRef } from 'react';
import ReactS3Uploader from 'react-s3-uploader';

type Props = {
  buttonClassName?: string;
  popoverClassName?: string;
  handleUploadFinish: (param: any) => void;
};

const InsertImageButton = ({ handleUploadFinish, buttonClassName }: Props) => {
  const [, toggleIsLoading] = useState(false);

  const inputFile = useRef(null);

  const handleUploadProgress = () => toggleIsLoading(true);

  const handleUploadError = () => toggleIsLoading(false);

  const onUploadFinish = (e: any) => {
    const imgUrl = e.signedUrl.substring(0, e.signedUrl.indexOf('?'));
    toggleIsLoading(false);
    return handleUploadFinish(imgUrl);
  };

  const handleOpenDialog = () =>
    inputFile.current && (inputFile.current as any).click();

  return (
    <div>
      <button className={buttonClassName} onClick={handleOpenDialog}>
        <i className="fa fa-image" />
      </button>
      <ReactS3Uploader
        signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`}
        accept="image/*"
        onProgress={handleUploadProgress}
        onError={handleUploadError}
        onFinish={onUploadFinish}
        ref={inputFile}
        style={{
          position: 'absolute',
          visibility: 'hidden',
        }}
      />
    </div>
  );
};

export default InsertImageButton;
