import React from 'react';
// import { saveAs } from 'file-saver';
// import EyeIcon from '../icons/EyeIcon';

/* Helper function */
// const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
//   const byteCharacters = atob(b64Data);
//   const byteArrays: Uint8Array[] = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, { type: contentType });
//   return blob;
// }

// interface PdfButtonProps {
//   dataPdf: string
//   // fileName: string;
// }

// const useIosWithChrome = () => {
//   if (typeof navigator !== 'undefined') {
//     // console.log("userAgent", navigator.userAgent);
//     const isIos = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
//     const isChrome = Boolean(navigator.userAgent.match(/Chrome/i));

//     return isIos && isChrome;
//   }

//   return false;
// }

// const useWithInstagram = () => {
//   if (typeof navigator !== 'undefined') {
//     // console.log("userAgent", navigator.userAgent);
//     const isInstagram = Boolean(navigator.userAgent.match(/Instagram/i));

//     return isInstagram;
//   }

//   return false;
// }

const PdfButton = (): JSX.Element => (
  <a href='https://amazoniadepe-staging.s3.amazonaws.com/Edital-Nacional-30%C2%BA-FIG-2022-11.05.2022.pdf' >Ver ficha de assinatura</a>
)

//   const renderAsLink = useIosWithChrome();
//   const renderAsInstagram = useWithInstagram();

//   const blob = b64toBlob(props.dataPdf.replace('data:application/pdf;filename=generated.pdf;base64,', ''));
//   const blobUrl = window.URL.createObjectURL(blob)
//   // console.log("renderAsLink", renderAsLink);
//   if (renderAsInstagram) {
//     return (
//       <a
//         href={blobUrl}
//         rel="nooperer"
//       >
//         <EyeIcon />
//         Ver ficha de assinatura
//       </a>
//     )
//   } else if (renderAsLink) {


//     return (
//       <a
//         href={blobUrl}
//         rel="nooperer"
//         target='_blank'
//       >
//         <EyeIcon />
//         Ver ficha de assinatura
//       </a>
//     );
//   }

//   return (
//     <button
//       onClick={() => {
//         saveAs(blob, props.fileName);
//       }}
//     >
//       <EyeIcon />
//       Ver ficha de assinatura
//     </button>
//   );

export default PdfButton;
