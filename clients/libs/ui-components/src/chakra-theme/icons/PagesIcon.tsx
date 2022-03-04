import React from 'react';
import { createIcon } from '@chakra-ui/react';

const PagesIcon = createIcon({
  displayName: 'PagesIcon',
  path: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 1.5v15h19v-15h-19zM1 0a1 1 0 00-1 1v16a1 1 0 001 1h20a1 1 0 001-1V1a1 1 0 00-1-1H1z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 6H0V4.5h22V6z"
        fill="currentColor"
      />
      <path
        d="M19 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        fill="currentColor"
      />
    </>
  ),
});

export default PagesIcon;
