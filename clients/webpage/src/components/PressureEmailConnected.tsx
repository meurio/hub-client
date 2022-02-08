import fetch from 'node-fetch';
import {
  EmailPressurePlugin,
  PressureAnalytics,
  FinishMessageCustom,
  PressureTellAFriend,
} from '../bonde-webpage';
import Utils from '../Utils';

const PressureEmailConnected = (props: any) =>
  <EmailPressurePlugin
    {...props}
    asyncFetchTargets={async (args: any) =>
      (
        await fetch('/api/data/targets', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
    }
    asyncFillWidget={async (args: any) =>
      (
        await fetch('/api/actions/pressure', {
          method: 'post',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json()
    }
    analyticsEvents={PressureAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PressureTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
  />
;

export default PressureEmailConnected;
