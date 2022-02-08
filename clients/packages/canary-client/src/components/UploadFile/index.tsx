import React, { useRef } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import { Text, FormLabel, Link, useField, Hint } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from './Image';
import UploadImageIcon from './UploadImageIcon';

interface UploadFieldProps {
  scale?: number
}

const UploadField = styled.div<UploadFieldProps>`
  position: relative;
  display: flex;
  padding: 0 0 24px;
  flex-direction: row;
  align-items: center;

  button {
    margin-right: calc(30px * ${props => props.scale});

    &:focus {
      outline: none;
      border: none;
    }
  }

  input[type='file'] {
    display: none;
  }

  .detail > * {
    margin: 10px 0;
  }

  .detail {
    ${Hint} {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`

type Props = {
  label?: string;
  name: string;
  imageScale?: number
  validate?: any
  disabled?: boolean
};

const Upload: React.FC<Props> = ({ label, name, imageScale, validate, disabled }) => {
  const uploadInput: any = useRef(null);
  // const [image, setImage] = useState<string>('');
  const { input, meta } = useField(name, { validate });
  const { t } = useTranslation('app');

  const onProgress = (args: any) => {
    console.log('onProgress', { args });
  }
  const onError = (args: any) => {
    console.log('onError', { args });
  }
  const onFinish = ({ signedUrl }: any) => {
    const imageUrl: string = signedUrl.substring(0, signedUrl.indexOf('?'));
    console.log('onFinish', { imageUrl });
    input.onChange(imageUrl);
  }

  const handleClick = (event: any) => {
    event?.preventDefault();
    uploadInput?.current.click();
  }

  return (
    <UploadField scale={imageScale}>
      <button onClick={handleClick} title={t('upload.button')} disabled={disabled}>
        {input.value
          ? <Image src={input.value} alt={label} scale={imageScale} />
          : <UploadImageIcon scale={imageScale} />
        }
      </button>
      <div className='detail'>
        {label && <FormLabel>{label}</FormLabel>}
        <Text>{t('upload.information')}</Text>
        {meta.touched && meta.error && <Hint color='error'>{meta.error}</Hint>}
        <ReactS3Uploader
          signingUrl={process.env.REACT_APP_UPLOADS_URL}
          accept="image/*"
          onProgress={onProgress}
          onError={onError}
          onFinish={onFinish}
          inputRef={uploadInput}
          style={{ display: 'none' }}
        />
        {input.value && (
          <Link component='button' type='button' onClick={() => input.onChange(null)}>
            Remover
          </Link>
        )}
      </div>
    </UploadField>
  );
}

Upload.defaultProps = {
  imageScale: 1
}

export default Upload;

export { ImageStyled as Image } from './Image';
