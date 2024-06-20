/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
<<<<<<< HEAD
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import {
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
=======
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
	Image,
	ImageCaption,
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
<<<<<<< HEAD
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed, MediaEmbedToolbar } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import { Table, TableCaption } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { S3Upload } from './s3upload';
=======
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
<<<<<<< HEAD
		AutoLink,
		BlockQuote,
		Bold,
		CloudServices,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		Image,
		ImageCaption,
		ImageInsert,
		ImageResize,
=======
		BlockQuote,
		Bold,
		Essentials,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		Image,
		ImageCaption,
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
<<<<<<< HEAD
		LinkImage,
		List,
		MediaEmbed,
		MediaEmbedToolbar,
		Paragraph,
		S3Upload,
		SpecialCharacters,
		Style,
		Table,
		TableCaption,
		Underline,
=======
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		Table,
		TableToolbar,
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
		Undo
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
<<<<<<< HEAD
				'undo',
				'redo',
				'|',
=======
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
				'heading',
				'|',
				'bold',
				'italic',
<<<<<<< HEAD
				'underline',
				'blockQuote',
				'alignment',
				'|',
				'FontBackgroundColor',
				'fontColor',
				'fontFamily',
				'fontSize',
				'|',
				'link',
				'imageUpload',
				'imageInsert',
				'mediaEmbed',
				'insertTable',
				'|',
				'bulletedList',
				'numberedList'
			]
		},
		language: 'pt-br',
		heading: {
			options: [
					{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
					{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
					{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
					{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
			]
		},
=======
				'fontFamily',
				'fontSize',
				'fontColor',
				'link',
				'|',
				'alignment',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo'
			]
		},
		language: 'pt-br',
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
<<<<<<< HEAD
				'imageStyle:side',
				'linkImage'
=======
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
>>>>>>> 63416bc39 (feat: add ckeditor to autofire)
			]
		}
	};
}

export default Editor;
