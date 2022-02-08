import React from 'react';
import { createIcon } from '@chakra-ui/react';

const CheckIcon = createIcon({
  displayName: 'CheckIcon',
  viewBox: '0 0 16 6',
  path: (
    <>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M15.41 1.625l-9.62 9.62L0 5.455 1.625 3.83 5.79 7.995 13.785 0l1.625 1.625z"
        clipRule="evenodd"
      />
    </>
  ),
});

export default CheckIcon
