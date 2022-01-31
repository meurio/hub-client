import React from 'react';
import EyeIcon from '../icons/EyeIcon';

interface PdfButtonProps {
  dataPdf: string
  fileName: string;
}

const PdfButton = (props: PdfButtonProps) => {

  return (
    <a
      href={`data:application/octet-stream;attachment;base64,${props.dataPdf}`}
      download={`Ficha de Assinatura de ${props.fileName}`}
    >
      <EyeIcon />
      Ver ficha de assinatura
    </a>
  );
};

export default PdfButton;
