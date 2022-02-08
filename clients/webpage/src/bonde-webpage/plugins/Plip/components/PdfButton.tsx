import React from 'react';
import { saveAs } from 'file-saver';
import EyeIcon from '../icons/EyeIcon';

/* Helper function */
const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

interface PdfButtonProps {
  dataPdf: string
  fileName: string;
}

const useIosWithChrome = () => {
  if (typeof navigator !== 'undefined') {
    console.log("userAgent", navigator.userAgent);
    const isIos = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    const isChrome = Boolean(navigator.userAgent.match(/Chrome/i));

    return isIos && isChrome;
  }

  return false;
}

const PdfButton = (props: PdfButtonProps) => {
  const renderAsLink = useIosWithChrome();
  const blob = b64toBlob(props.dataPdf.replace('data:application/pdf;filename=generated.pdf;base64,',''));

  console.log("renderAsLink", renderAsLink);
  if (renderAsLink) {
    return (
      <a
        href={URL.createObjectURL(blob)}
        rel="nooperer"
        download={props.fileName}
      >
        <EyeIcon />
        Ver ficha de assinatura
      </a>   
    );
  }

  return (
    <button
      onClick={() => {
        saveAs(blob, props.fileName);
      }}
    >
      <EyeIcon />
      Ver ficha de assinatura
    </button>
  );
};

export default PdfButton;
