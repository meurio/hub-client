import React from 'react';
import Button from './Button';
import { DraftWidget, DraftWidgetPublic } from './styles';

const DraftPlugin_PREFIX = '_draftPlugin';

type Props = {
  editable: any;
  plugins: Array<any>;
  widget: any;
};

const getOptions = (plugin: any) =>
  plugin.options ? plugin.options[DraftPlugin_PREFIX] || {} : {};

const DraftPlugin = ({ editable, plugins, widget }: Props) => {
  const pluginsWithoutDraft = plugins.filter((w: any) => w.kind !== 'draft');
  if (editable)
    return (
      <DraftWidget id={`widget-${widget.id}`}>
        {pluginsWithoutDraft.map((plugin: any, index: any) => {
          // Settings each plugin
          const { action, label, icon: Icon } = getOptions(plugin);
          return (
            <Button
              key={`wc-${index}`}
              label={label}
              onClick={() => action && action(widget)}
            >
              {Icon && <Icon />}
              <span>{label}</span>
            </Button>
          );
        })}
      </DraftWidget>
    );
  return <DraftWidgetPublic>&nbsp;</DraftWidgetPublic>;
};

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
