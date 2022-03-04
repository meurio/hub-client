import React from 'react';
import { createIcon } from '@chakra-ui/react';

const ChartIcon = createIcon({
  displayName: 'CloseIcon',
  viewBox: '0 0 21 21',
  path: (
    <>
      <g fill="currentColor" clipPath="url(#clip0)">
        <path d="M15.72 21h5.24V3.5h-5.24V21zm1.746-15.75h1.747v14h-1.747v-14zM5.24 13.125H0V21h5.24v-7.875zM3.493 19.25H1.747v-4.375h1.746v4.375zM7.86 13.125V21h5.24V8.312h-1.748V19.25H9.606v-6.125H7.859z" />
        <path d="M4.9 9.625H0v1.75h5.58L16.058 1.75h4.9V0h-5.58L4.9 9.625z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H20.959V21H0z"></path>
        </clipPath>
      </defs>
    </>
  ),
});

export default ChartIcon;
