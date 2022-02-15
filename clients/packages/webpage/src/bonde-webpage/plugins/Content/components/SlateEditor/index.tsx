import React from 'react';
// import { injectIntl, intlShape } from 'react-intl'
import { SlateEditor, SlateContent } from './packages/slate-editor/src';
import { BoldPlugin } from './packages/slate-editor-bold-plugin/src';
import { ItalicPlugin } from './packages/slate-editor-italic-plugin/src';
import { UnderlinePlugin } from './packages/slate-editor-underline-plugin/src';
import { StrikethroughPlugin } from './packages/slate-editor-strikethrough-plugin/src';
import { AlignmentPlugin } from './packages/slate-editor-alignment-plugin/src';
import { LinkPlugin } from './packages/slate-editor-link-plugin/src';
import { ListPlugin } from './packages/slate-editor-list-plugin/src';
import { FontFamilyPlugin } from './packages/slate-editor-font-family-plugin/src';
import { FontSizePlugin } from './packages/slate-editor-font-size-plugin/src';
import { ImagePlugin } from './packages/slate-editor-image-plugin/src';
import { ColorPlugin } from './packages/slate-editor-color-plugin/src';
import { GridPlugin } from './packages/slate-editor-grid-plugin/src';
import { EmbedPlugin } from './packages/slate-editor-embed-plugin/src';

import { checkToParse } from '../../../../utils';
import { Wrapper } from './styles';

const fontSizePluginOptions = { initialFontSize: 16 };

const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  ColorPlugin(),
  EmbedPlugin(),
  FontFamilyPlugin(),
  FontSizePlugin(fontSizePluginOptions),
  GridPlugin(),
  ImagePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
];

const EditorSlate = ({ content, readOnly }: any) => {
  // const EditorSlate = ({ content, readOnly }: any) => {
  const initialState = checkToParse(content);
  // return <Wrapper className="widgets--content-plugin">{initialState}</Wrapper>;
  // const initialState = checkToParse(content);
  return (
    <Wrapper className="widgets--content-plugin">
      <SlateEditor
        plugins={plugins}
        initialState={initialState}
        style={{ color: '#fff' }}
      >
        <SlateContent
          wrapperStyle={{ position: 'relative', zIndex: 'inherit' }}
          style={{ minHeight: 150 }}
          readOnly={readOnly}
        />
      </SlateEditor>
    </Wrapper>
  );
};

// EditorSlate.propTypes = {
//   intl: intlShape.isRequired
// }

export default EditorSlate;
