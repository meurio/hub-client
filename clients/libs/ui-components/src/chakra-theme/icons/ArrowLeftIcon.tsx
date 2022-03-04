import React from 'react';
import { createIcon } from '@chakra-ui/react';

const ArrowLeftIcon = createIcon({
  displayName: 'ArrowUpIcon',
  viewBox: '0 0 12 18',
  path: (
    <>
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
        d="M3.463 9l6.323 6.017.414.395-.829.788-.414-.394-6.322-6.017-.007.006-.828-.789L1.806 9 1.8 8.994l.828-.788.007.006 6.322-6.018.414-.394.829.788-.414.395L3.463 9z"
        clipRule="evenodd"
      />
    </>
  ),
});

export default ArrowLeftIcon;
