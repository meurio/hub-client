import { combineReducers } from 'redux'

import blocksReducer from './blocks'
import widgetsReducer from './widgets'
import editionReducer from './edition'
import hoverReducer from './hover'
import uploaderReducer from './uploader'
import mobilizationsReducer from './mobilizations'
import dataExportReducer from './data-export'

// Dependency modules
import templatesReducer from 'mobilizations/templates/reducers'
import pluginsReducer from 'mobilizations/widgets/__plugins__/reducers'

export default combineReducers({
  list: mobilizationsReducer,
  blocks: blocksReducer,
  templates: templatesReducer,
  widgets: widgetsReducer,
  edition: editionReducer,
  hover: hoverReducer,
  uploader: uploaderReducer,
  plugins: pluginsReducer,
  dataExport: dataExportReducer
})
