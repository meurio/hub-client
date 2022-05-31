import React from 'react';

interface PdfButtonProps {
  dataPdf: string
}

const PdfButton = (props: PdfButtonProps): JSX.Element => (
  <a href={props.dataPdf}>Ver ficha de assinatura</a>
)

export default PdfButton;
