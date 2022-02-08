import * as t from '../action-types'
import { createAction } from './create-action'

const setWidgetList = widgets => createAction(t.SET_WIDGET_LIST, widgets)

export default setWidgetList
