import combineReducers from 'react-combine-reducers';
import blocks, { initialState as blocksInitialState } from "./blocks";
import dataExport, { initialState as dataExportInitialState } from "./dataExport";
import edition, { initialState as editionInitialState } from "./edition";
import hover, { initialState as hoverInitialState } from "./hover";
import mobilizations, { initialState as mobilizationsInitialState } from "./mobilizations";
import uploader, { initialState as uploaderInitialState } from "./uploader";
import widgets, { initialState as widgetsInitialState } from "./widgets";
import plugins, { initialState as pluginsInitialState } from "./plugins";
import colorPicker, { initialState as colorPickerInitialState } from "./color-picker";

import type { StateBlocks, Block } from "./blocks";
import type { StateDataExport } from "./dataExport";
import type { StateEdition } from "./edition";
import type { StateMobilizations, Mobilization, Status } from "./mobilizations";
import type { StateWidgets, Widget, Kind } from "./widgets";
import type { StatePlugins, Content, Donation, Pressure } from "./plugins";
import type { StateColorPicker } from "./color-picker";

export type {
  StateBlocks,
  Block,
  StateDataExport,
  StateEdition,
  StateMobilizations,
  Status,
  Mobilization,
  StateWidgets,
  Widget,
  Kind,
  StatePlugins,
  Content,
  Donation,
  Pressure,
  StateColorPicker
}

export interface State {
  blocks: StateBlocks;
  dataExport: StateDataExport;
  edition: StateEdition;
  hover: Record<string, number>;
  mobilizations: StateMobilizations;
  uploader: Record<string, number>;
  widgets: StateWidgets;
  plugins: StatePlugins;
  colorPicker: StateColorPicker;
}

export const [reducer, initialState] = combineReducers({
  blocks: [blocks, blocksInitialState],
  dataExport: [dataExport, dataExportInitialState],
  edition: [edition, editionInitialState],
  hover: [hover, hoverInitialState],
  mobilizations: [mobilizations, mobilizationsInitialState],
  uploader: [uploader, uploaderInitialState],
  widgets: [widgets, widgetsInitialState],
  plugins: [plugins, pluginsInitialState],
  colorPicker: [colorPicker, colorPickerInitialState]
});