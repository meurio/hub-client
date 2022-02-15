import React from 'react';
import { PressureForm, EmailPressurePlugin, EmailFields } from '../src';
import PressureProps from './mocks/plugin/pressure';
import EmailProps from './mocks/plugin/pressure/email';

export const EmailPressureForm = ({
  targetList = PressureProps.targetList,
  disableSubjectAndBody = false,
}) => {
  return (
    <PressureForm
      {...PressureProps}
      saving={false}
      errors={[]}
      BeforeStandardFields={() =>
        EmailFields.before(targetList, () => console.log('onBlur'))
      }
      AfterStandardFields={() => EmailFields.after(disableSubjectAndBody)}
    />
  );
};

export const EmailPressure = () => {
  return (
    <EmailPressurePlugin
      {...EmailProps}
      asyncFillWidget={async () => ({ widget: {} })}
      overrides={{
        FinishCustomMessage: { component: null, props: {} },
        FinishDefaultMessage: {
          component: <div>compartilhe!</div>,
          props: { imageUrl: 'bla', href: 'https://www.mapalgbt.bonde.org' },
        },
      }}
    />
  );
};

export default {
  title: 'EmailPressurePlugin',
};
