import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import Font from '@ckeditor/ckeditor5-font/src/font';


const editorConfiguration = {
  plugins: [Underline, Alignment, Font],
  toolbar: [ 'bold', 'italic' ]
};


const CustomEditorBase = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          plugins: [Alignment, Font],
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'underline', 'link', '|',
            'bulletedList', 'numberedList', '|',
            'insertTable', 'blockQuote', 'mediaEmbed', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'imageUpload', 'insertButton'
          ],
          image: {
            toolbar: [
              'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
            ]
          },
          table: {
            contentToolbar: [
              'tableColumn', 'tableRow', 'mergeTableCells'
            ]
          },
        }}
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default CustomEditorBase;
