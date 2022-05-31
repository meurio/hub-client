import React from 'react';
import PlipDetailsStyles from './PlipDetailsStyles';
import PdfButton from './PdfButton';

interface PropsPlipDetails {
  pdf: any
}

const PlipDetails = (props: PropsPlipDetails): JSX.Element => {
  return (
    <PlipDetailsStyles>
      <h3><strong>Eba! Geramos uma ficha para você assinar:</strong></h3>
      <PdfButton dataPdf={props.pdf.data.data?.pdf_data?.url} />
      <ol>
        <li><strong>Imprima sua ficha:</strong> Não pode imprimir agora? Tudo bem! Já enviamos uma cópia da ficha no seu e-mail também.</li>
        <li><strong>Colete assinaturas:</strong> Assine e chame mais pessoas para assinar também.</li>
        <li><strong>Envie a ficha:</strong> Na ficha tem o endereço para o envio dos correios. É só levar até a agência mais próxima de você e enviar!</li>
      </ol>
      <p><strong>A Amazônia conta com você! 🌳✊</strong></p>
    </PlipDetailsStyles>
  )
}

export default PlipDetails;
