import React from "react";
import styled from 'styled-components';
import { Header } from 'bonde-components';
import { SlateEditor, SlateToolbar, SlateContent } from "slate-editor";
import { BoldPlugin, BoldButton } from "@slate-editor/bold-plugin";
import { ItalicPlugin, ItalicButton } from "@slate-editor/italic-plugin";
import { UnderlinePlugin, UnderlineButton } from "@slate-editor/underline-plugin";
import { StrikethroughPlugin, StrikethroughButton } from "@slate-editor/strikethrough-plugin";
import { AlignmentPlugin, AlignmentButtonBar } from "@slate-editor/alignment-plugin";
import { LinkPlugin, LinkButton } from "@slate-editor/link-plugin";
import { ListPlugin, ListButtonBar } from "@slate-editor/list-plugin";
import { FontFamilyPlugin, FontFamilyDropdown } from "@slate-editor/font-family-plugin";
import { FontSizePlugin, FontSizeInput } from "@slate-editor/font-size-plugin";
import { ImagePlugin, ImageButton } from "@slate-editor/image-plugin";
import { ColorPlugin, ColorButton, ColorStateModel } from "@slate-editor/color-plugin";
import { GridPlugin, GridButtonBar } from "@slate-editor/grid-plugin";
import { EmbedPlugin, EmbedButton } from "@slate-editor/embed-plugin";

const Styles = styled.div`
  .editor--root {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 30px;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 45px;
    margin-bottom: 15px;

    h5:first-child {
      min-width: 265px;
    }
  }

  .editor--content {
    display: grid;
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;

    border: 1px solid #ccc;
    padding: .2rem;

    & > div {
      min-height: 100px;
    }
  }

  .editor--toolbar {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 2;

    &.buttons {
      grid-template-columns: repeat(3,45px) 135px;
    }
    &.inputs {
      grid-template-columns: 1fr auto;
      grid-column-gap: 15px;
    }
  }

  .toolbar--footer > * {
    float: right;
  }

  .toolbar--button {
    border-radius: 0;
    color: #000;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    padding: .5rem 1rem;
    margin: 0;
    width: 45px;
    height: 38px;
    vertical-align: middle;

    &:hover {
      border: 1px solid #000;
    }
  }

  .slate-alignment-plugin--button-bar,
  .slate-list-plugin--button-bar,
  .slate-grid-plugin--button-bar {
    display: flex;
  }

  .toolbar--dropdown {
    border-radius: 0;
    position: relative;
    background-color: white;
    color: #000;
    margin: 0;
    padding: 0 10px 0 15px;
    height: 38px;
    border-bottom: 1px solid #ee0099;

    &:focus {
      outline: none;
    }
  }
  .toolbar--input {
    height: 38px;
    padding: 0px 10px 0px 15px;
    position: relative;
    background-color: white;
    border-radius: 0;
    margin: 0;
    color: #000;
    border-bottom: 1px solid #ee0099;
    
    &:focus {
      outline: none;
    }
  }
`;

const fontSizePluginOptions = { initialFontSize: 16 };
const colorPluginOptions = new ColorStateModel()
  .rgba({ r: 100, g: 100, b: 100, a: 1 })
  .gen();

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

const classNames = {
  button: "toolbar--button",
  dropdown: "toolbar--dropdown",
  input: "toolbar--input",
  lastButton: "toolbar--button linebreak",
};

type RichEditorProps = {
  value: any
  onChange: any
}

const RichEditor = ({ value, onChange }: RichEditorProps) => (
  <Styles>
    <div className='header'>
      <Header.H5 uppercase>Customização</Header.H5>
      <Header.H5 uppercase>Preview</Header.H5>
    </div>
    <SlateEditor
      plugins={plugins}
      initialState={value}
      onChange={onChange}
    >
      {/* Toolbar */}
      <SlateToolbar className='buttons'>
        <BoldButton className={classNames.button} />
        <ItalicButton className={classNames.button} />
        <UnderlineButton className={classNames.button} />
        <AlignmentButtonBar className={classNames.button} />
        <StrikethroughButton className={classNames.button} />
        <LinkButton className={classNames.button} />
        <ImageButton
          className={classNames.button}
          signingUrl={process.env.REACT_APP_UPLOADS_URL}
        />
        <ListButtonBar className={classNames.button} />
        <ColorButton
          className={classNames.button}
          initialState={colorPluginOptions}
          pickerDefaultPosition={{ x: -520, y: 17 }}
        />
        <EmbedButton className={classNames.button} />
        <GridButtonBar className={classNames.button} />
      </SlateToolbar>
      {/* Toolbar */}
      <SlateToolbar className='inputs'>
        <FontFamilyDropdown className={classNames.dropdown} />
        <FontSizeInput
          {...fontSizePluginOptions}
          className={classNames.input}
        />
      </SlateToolbar>
      {/* Content */}
      <SlateContent />
    </SlateEditor>
  </Styles>
);

export default RichEditor;