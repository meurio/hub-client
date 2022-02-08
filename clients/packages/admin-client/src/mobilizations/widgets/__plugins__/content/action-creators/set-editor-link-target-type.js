import * as t from '../action-types'
import { createAction } from './create-action'

const setEditorLinkTargetType = type => createAction(t.SET_EDITOR_LINK_TARGET_TYPE, type)

export default setEditorLinkTargetType
