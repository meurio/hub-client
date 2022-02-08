import React from "react";
import {
  Box,
  Button,
  Image,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack
} from "@chakra-ui/react";
import { useField } from "react-final-form";
import ReactS3Uploader from "react-s3-uploader";
import { PencilIcon as EditIcon, UploadImageIcon } from "../icons";

interface S3UploadFileFieldProps {
  signingUrl: string;
  onChange: any;
  disabled?: boolean;
}

export const S3UploadFileField: React.FC<S3UploadFileFieldProps> = ({
  children,
  onChange,
  signingUrl,
  disabled
}) => {
  const inputRef: any = React.useRef(null);

  // Override callbacks
  const onProgress = (args: any) => {
    console.log('onProgress', { args });
  }
  const onError = (args: any) => {
    console.log('onError', { args });
  }
  const onFinish = ({ signedUrl }: any) => {
    const imageUrl: string = signedUrl.substring(0, signedUrl.indexOf('?'));
    console.log('onFinish', { imageUrl });
    onChange(imageUrl);
  }
  // Button should be ReactS3Uploader active.
  const onClick = (evt: any) => {
    evt?.preventDefault();
    inputRef?.current.click();
  }

  return (
    <div className="wrapper-upload-file-button">
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <ReactS3Uploader
        signingUrl={signingUrl}
        accept="image/*"
        onProgress={onProgress}
        onError={onError}
        onFinish={onFinish}
        inputRef={inputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}

interface S3UploadFieldProps extends Record<string, any> {
  name: string
  label?: string
  helpText?: string
  disabled?: boolean
  alt?: string
  signingUrl: string
  uploadImageIcon?: any
  removeTextButton?: string
  borderRadius?: any
  boxSize?: any
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const S3UploadField = (props: S3UploadFieldProps) => {
  const {
    label,
    helpText,
    name,
    disabled,
    alt,
    signingUrl,
    uploadImageIcon: UploadImageIconComponent,
    removeTextButton,
    borderRadius,
    boxSize,
    ...config
  } = props;
  const { input } = useField(name, config);

  return (
    <Stack direction="row" spacing={6} mb={4} align="center">
      <S3UploadFileField
        onChange={input.onChange}
        disabled={disabled}
        signingUrl={signingUrl}
      >
        {input.value ? (
          <Box
            position="relative"
            boxSize={boxSize}
            borderRadius={borderRadius}
          >
            <Image alt={alt} src={input.value} />
            <Box position="absolute" bottom="3px" right="0">
              <EditIcon
                color="white"
                boxSize={6}
              />
            </Box>
          </Box>
        ) : (
          <UploadImageIconComponent
            boxSize={boxSize}
          />
        )}
      </S3UploadFileField>
      <FormControl id={`${name}-id`}>
        <FormLabel>{label}</FormLabel>
        {helpText && (
          <FormHelperText mt={3} color="gray.400" fontSize="md">
            {helpText}
          </FormHelperText>
        )}
        {input.value && (
          <Button
            type="button"
            variant="link"
            fontWeight="normal"
            colorScheme="gray"
            onClick={() => input.onChange(null)}
          >
            {removeTextButton}
          </Button>
        )}
      </FormControl>
    </Stack>
  );
}

S3UploadField.defaultProps = {
  uploadImageIcon: UploadImageIcon,
  removeTextButton: "Remover",
  borderRadius: "50%",
  boxSize: "85px" 
}

export default S3UploadField;