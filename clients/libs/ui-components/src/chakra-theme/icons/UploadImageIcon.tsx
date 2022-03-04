import React from 'react';
import { createIcon } from '@chakra-ui/react';

const UploadImageIcon = createIcon({
  displayName: 'UploadImageIcon',
  viewBox: '0 0 84 84',
  path: (
    <>
      <circle cx="42" cy="42" r="41.5" fill="#424242" stroke="#EEE" />
      <path fill="#000" d="M59.58 29H25v25.56h34.58V29z" opacity="0.502" />
      <path fill="#fff" d="M37.968 36.668l9.262 12.78H28.705l9.263-12.78z" />
      <path fill="#fff" d="M49.083 43.058l5.558 6.39H43.525l5.558-6.39z" />
      <path
        fill="#D8D8D8"
        stroke="#fff"
        d="M57.904 52.558h3.89v.228h-3.891v3.964h-.242v-3.964h-3.884v-.228h3.884v-3.825h.243v3.825z"
      />
      <circle cx="72" cy="72" r="11.5" fill="#E09" stroke="#fff" />
      <path
        fill="#fff"
        d="M66.04 75.008l-.013 2.418c0 .137.05.273.15.372.098.1.222.15.359.15l2.406-.013c.137 0 .26-.05.36-.149l8.31-8.31a.524.524 0 000-.732l-2.382-2.406a.524.524 0 00-.731 0l-1.662 1.674-6.648 6.636a.553.553 0 00-.15.36zm8.83-7.579l1.675 1.675-.942.942-1.675-1.674.943-.943zm-7.8 7.802l6.126-6.127 1.675 1.674-6.127 6.115-1.687.012.012-1.674z"
      />
    </>
  ),
});

export default UploadImageIcon;
