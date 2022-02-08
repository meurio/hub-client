// import { useAppState } from '../../../../Application';
import EditorNew from './editor-new'
// import { handleEdit, handleCancelEdit } from './../../../../../mobrender/redux/action-creators'

// const mapActionsToProps = {
//   onEdit: () => handleEdit('widget'),
//   onCancelEdit: () => handleCancelEdit('widget')
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  // const { state } = useAppState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorProperties: any = {
    // onEdit: () => handleEdit('widget'),
    onEdit: () => console.log("onEdit widget"),
    onCancelEdit: () => console.log("onCancelEdit widget")
    // onCancelEdit: () => handleCancelEdit('widget')
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditorNew {...properties} {...editorProperties} />;
}
