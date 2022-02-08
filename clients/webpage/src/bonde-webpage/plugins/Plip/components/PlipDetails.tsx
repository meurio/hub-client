// import { BrowserRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import styles from './PlipDetails.module.css';
import PdfButton from './PdfButton';

interface PropsPlipDetails {
  pdf: any
}

const PlipDetails = (props: PropsPlipDetails) => {
  return (
    <div className={styles.PlipDetails}>
      <h3>Eba! Geramos uma ficha para você assinar:</h3>
      <PdfButton dataPdf={props.pdf.data.data?.pdf_data} fileName={props.pdf.data.data?.filename} />
      <ol>
        <li><strong>Assine:</strong> Imprima a sua ficha, assine e chame mais 7 pessoas para assinar também.</li>
        <li><strong>Envie a ficha:</strong> Junto com a ficha tem uma etiqueta de envio dos correios. É só levar até a agência mais próxima de você e enviar, é por nossa conta.</li>
      </ol>
      <p><strong>Contamos com você! 🌳✊</strong></p>
      <br />
      <p>Não pode imprimir agora? Tudo bem! Já enviamos uma cópia no seu e-mail também.</p>
    </div>
  )
}

export default PlipDetails;
