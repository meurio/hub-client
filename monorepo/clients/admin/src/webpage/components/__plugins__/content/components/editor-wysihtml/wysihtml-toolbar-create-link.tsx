import { useAppState } from '../../../../../Application'
//
// The content widget module it is not the perfect module to provide these actions.
// Needs to refact to more abstract component like global reusable components module.
//
// import * as ContentActions from './../../mobilizations/widgets/__plugins__/content/action-creators'


interface WYSIHTMLToolbarCreateLinkProperties {
  editorLinkTargetType: string
  setEditorLinkTargetType: any
}

// You may will see the warning below:
// Warning: Stateless function components cannot be given refs (See ref "wrappedInstance" in
// WYSIHTMLToolbarCreateLink created by Connect(WYSIHTMLToolbarCreateLink)). Attempts to
// access this ref will fail.
//
// Upgrade React Redux to version 4 will should go away this warning.
// See: https://github.com/reactjs/react-redux/issues/141#issuecomment-148358733

export const WYSIHTMLToolbarCreateLink: React.FC<WYSIHTMLToolbarCreateLinkProperties> = ({ editorLinkTargetType, setEditorLinkTargetType }) => (
  <div
    data-wysihtml5-dialog='createLink'
    className='white p2 bg-darken-3'
    style={{ display: 'none' }}
  >
    <input
      type='text'
      data-wysihtml5-dialog-field='href'
      defaultValue='http://'
      className='input mr1'
    />
    <a data-wysihtml5-dialog-action='save' className='btn btn-outline' href='/inserir'>
      Inserir
    </a>
    <span className='ml2'>
      <input
        type='checkbox'
        name='editorLinkTargetType'
        onChange={e => setEditorLinkTargetType(e.target.checked ? '_blank' : '_self')}
        value={editorLinkTargetType}
        data-wysihtml5-dialog-field='target'
      />
      <label htmlFor='editorLinkTargetType'>
        Abrir link em nova aba
      </label>
    </span>
  </div>
)

// TODO: Replace by selectors
// const mapStateToProps = state => ()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state } = useAppState();
  const linkProperties: any = {
    editorLinkTargetType: state.plugins.content.editorLinkTargetType
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <WYSIHTMLToolbarCreateLink {...properties} {...linkProperties} />
}

