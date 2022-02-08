import ReactS3Uploader from 'react-s3-uploader'
// import { Progress } from '../../components/await'
import config from "../../../config";

interface FileUploaderProperties {
  file?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRemove?: (file: any) => void;
  progress?: number;
  onProgress: (percent: number) => void;
  onFinish: (url: string) => void;
}

const FileUploader = ({ file, onRemove, progress, onProgress, onFinish }: FileUploaderProperties): React.ReactElement => (
  <div className='flex flex-wrap px1'>
    {file && (
      <div className='py1'>
        <img src={file} style={{ maxHeight: '36px' }} alt="" />
        {onRemove && (
          <button
            type="button"
            className='btn bg-darken-4 white rounded remove'
            style={{ margin: '-25px 10px 0' }}
            onClick={(): void => {
              if (window.confirm('Deseja remover a imagem de fundo?')) {
                onRemove(file)
              }
            }}
          >
            <i className='fa fa-trash' />
          </button>)}
      </div>
    )}
    <div className='py1'>
      {!progress ? (
        <ReactS3Uploader
          className='input border-none white m0 bg-darken-4'
          accept='image/*'
          signingUrl={`${config.domainApiRest}/uploads`}
          onProgress={(percent: number): void => onProgress(percent)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onFinish={(image: any): void => {
            const url: string = image.signedUrl.slice(0, Math.max(0, image.signedUrl.indexOf('?')))
            onFinish(url)
          }}
        />
      ) : (
        <p className='bg-pagenta full-height rounded' style={{ height: '34px' }}>{progress}</p>
        // <Progress
        //   className='bg-pagenta full-height rounded'
        //   percent={progress}
        //   style={{ height: '34px' }}
        // />
      )}
    </div>
  </div>
);

export default FileUploader
