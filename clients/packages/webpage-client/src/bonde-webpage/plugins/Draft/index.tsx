import React from 'react';
import { DraftWidgetPublic } from './styles';

const DraftPlugin_PREFIX = '_draftPlugin';

const DraftPlugin = (): JSX.Element => <DraftWidgetPublic>&nbsp;</DraftWidgetPublic>;

DraftPlugin.setOptions = (settings: any) => {
  return { [DraftPlugin_PREFIX]: settings };
};

/** ## DraftPlugin
 *
 * Menu with plugin options for selecting widgets within a block.
 *
 * Options:
 * - label: String
 * - icon: Component
 * - action: Function
 *
 * NOTE: Configure your plugin extra props using the method
 * DraftPlugin.setOptions, it return a object that can merged in
 * your options.
 *
 */
export default DraftPlugin;
