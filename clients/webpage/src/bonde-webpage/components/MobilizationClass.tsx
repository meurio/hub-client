import React, { createContext } from 'react';
import Section from './Section';
import Navigation from './navigation';

export interface FooterProps {
  mobilization: {
    community: {
      name: string;
      image: string;
      signature?: {
        name?: string;
        url?: string;
      };
    };
  };
}

export const TranslateContext = createContext<{ t?: any, Trans?: any, i18n?: any, mobilization?: { language: 'pt-BR' | 'es' } }>({});

export interface MobilizationProps {
  /* Define when the mobilization is in edit mode. */
  editable?: boolean;
  colorScheme?: string;
  headerFont?: string;
  bodyFont?: string;
  /* Function used to link navigation bar with block,
   * receives block as parameter and should return a string like id. */
  linkTo: Function;
  /* This component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked
   *
   * TODO: Review button should external to the mobilization component.
   */
  // newBlockButton: PropTypes.any,
  /* Sections of your mobilization, you will receive an item from this
   * list when you are rendering block customization. */
  blocks: any[];
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  // blockWrapper: PropTypes.any,
  /* Array of widgets object used on render. */
  widgets: any[];
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: any;
  // TODO: Documentation
  extraWidgetProps: any;
  /* Function used to link widgets with block, receives (block, widgets)
   * as param.
   * Default function use the attrs widget.block_id to relationship. */
  blockWidgetsRef?: Function;
  /* Custom component Footer */
  footerComponent: React.FC<FooterProps>;
}

type MobilizationState = {
  blocks: any[];
};

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */

const getVisibleBlocks = (blocks: any, editable: any) =>
  !editable ? blocks.filter((b: any) => !b.hidden) : blocks;

class Mobilization extends React.Component<
  MobilizationProps,
  MobilizationState
> {
  static defaultProps = {
    editable: false,
    blocks: [],
    widgets: [],
    extraWidgetProps: {},
    blockWidgetsRef: (b: any, ws: any) =>
      ws.filter((w: any) => w.block_id === b.id),
  };

  render() {
    // Props used on editable mode
    // Props to customize layout themes
    // TODO: Rever funcionamento da customização de layouts
    const { editable, colorScheme, headerFont, bodyFont } = this.props;
    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`;
    const layoutClassName = editable ? 'flex-auto relative' : 'relative';
    const layoutStyle = !editable
      ? { top: 0, bottom: 0, left: 0, right: 0, flexGrow: 1 }
      : undefined;

    // Props to render blocos
    const {
      linkTo,
      blockWidgetsRef,
      widgets,
      widgetComponent,
      footerComponent: FooterComponent,
      extraWidgetProps: {
        t,
        Trans,
        i18n,
        ...extraWidgetProps
      },
    } = this.props;

    // TODO: remove this and get of fetch
    const blocks = getVisibleBlocks(this.props.blocks, editable);

    return (
      <TranslateContext.Provider value={{ t, Trans, i18n, mobilization: extraWidgetProps.mobilization }}>
        <div
          className={`flex flex-column ${themeClassName} ${layoutClassName}`}
          style={layoutStyle}
        >
          <Navigation blocks={blocks} editable={editable} linkTo={linkTo} />
          <div
            id="blocks-list"
            className="flex-auto"
            style={{ overflowY: 'hidden' }}
          >
            {blocks.map((b: any, i: any) => (
              <Section
                key={`section-${i}`}
                anchor={linkTo(b)}
                block={b}
                editable={!!editable}
                widgets={blockWidgetsRef ? blockWidgetsRef(b, widgets) : []}
                widgetComponent={widgetComponent}
                extraWidgetProps={extraWidgetProps}
              />
            ))}
          </div>
          <FooterComponent mobilization={extraWidgetProps.mobilization} />
        </div>
      </TranslateContext.Provider>
    );
  }
}

export const Translate = TranslateContext.Consumer;

export default Mobilization;
