import { useAppState } from '../../../../Application';
import EditorOld from './editor-old'
import Selectors from '../../../../selectors';
// import { handleEdit, handleCancelEdit } from './../../../../../mobrender/redux/action-creators'

// const mapStateToProps = (state, props) => {
//   const selectors = MobSelectors(state, props)
//   return {
//     mobilization: selectors.getMobilization()
//   }
// }

// const mapActionsToProps = (dispatch, ownProps) => ({
//   onEdit: () => dispatch(handleEdit('widget')),
//   onCancelEdit: () => dispatch(handleCancelEdit('widget')),
//   ...ownProps
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state } = useAppState();
  const selectors = Selectors(state, properties);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorProperties: any = {
    mobilization: selectors.getMobilization(),
    onEdit: () => console.log("onEdit editor"),
    onCancelEdit: () => console.log("onCancelEdit editor")
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditorOld {...properties} {...editorProperties} />
}
