import fetch from 'node-fetch';
import React from 'react';
import {
  PlipPlugin,
} from '../bonde-webpage';

const PlipConnected = (props): JSX.Element =>
  <PlipPlugin
    {...props}
    asyncFillWidget={async (args: any) =>
      (
        await fetch('/api/actions/plip', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
    }
  />
;

export default PlipConnected;
