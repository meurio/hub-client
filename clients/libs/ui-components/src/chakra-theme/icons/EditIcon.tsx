import React from 'react';
import { createIcon } from '@chakra-ui/react';

const EditIcon = createIcon({
  displayName: 'EditIcon',
  path: (
    <>
      <circle cx="12" cy="12" r="11.5" fill="#E09" stroke="currentColor" />
      <path
        fill="currentColor"
        d="M6.04 15.008l-.013 2.418c0 .137.05.273.15.372.098.1.222.15.359.15l2.406-.013c.137 0 .26-.05.36-.149l8.31-8.31a.524.524 0 000-.732L15.23 6.338a.524.524 0 00-.731 0l-1.662 1.674-6.648 6.636a.553.553 0 00-.15.36zm8.83-7.579l1.675 1.675-.943.943-1.674-1.675.943-.943zm-7.8 7.802l6.126-6.127 1.675 1.674-6.127 6.115-1.687.012.012-1.674z"
      />
    </>
  ),
});

export default EditIcon;
