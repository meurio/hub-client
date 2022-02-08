import React from 'react';
import {
  CallAgain,
  CallCompleted,
  CallFailed,
  CallNextTarget,
  Calling,
  HowItWorks,
  FinishButton,
} from '../src/plugins/Pressure/Phone/components';
import PressureProps from './mocks/plugin/pressure/phone';
import styled from 'styled-components';
import {
  // PhonePressurePlugin,
  PressureForm,
  PhoneFields,
} from '../src';

const UnordedList = styled.ul`
  font-family: inherit;
  font-size: 0.8rem;
  color: #333333;
  & li {
    text-transform: uppercase;
    display: grid;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    grid-template-columns: auto auto;
  }
`;

export const PhonePressureForm = ({
  targetList = PressureProps.targetList,
}) => {
  return (
    <PressureForm
      {...PressureProps}
      onSubmit={() => console.log('onSubmit')}
      saving={false}
      BeforeStandardFields={() => PhoneFields(targetList, () => {})}
      errors={[]}
    />
  );
};

export const CallingTargets = () => {
  return (
    <>
      <UnordedList>
        <CallAgain
          name="Viviane"
          listKey={`call-again-${1}`}
          attempts={3}
          {...PressureProps}
        />
        <br />
        <CallCompleted
          name="Camila"
          listKey={`call-again-${1}`}
          duration="37"
        />
        <br />
        <CallFailed name="Lucas" listKey={`call-again-${1}`} />
        <br />
        <CallNextTarget
          name="Viviane"
          listKey={`call-again-${1}`}
          {...PressureProps}
        />
        <br />
        <Calling
          name="Lucas"
          listKey={`call-again-${1}`}
          status="in-progress"
        />
      </UnordedList>
      <HowItWorks />
      <br />
      <FinishButton
        buttonColor="#f1618c"
        toggleFinishMessage={() => console.log('toggleFinishMessage')}
        {...PressureProps}
      />
    </>
  );
};

export const PhoneWithoutCallTransition = () => {
  return (
    <div>PhoneWithoutCallTransition</div>
    // <PhonePressurePlugin
    //   {...PressureProps}
    //   asyncFillWidget={async () => ({ widget: {} })}
    //   overrides={{
    //     FinishCustomMessage: { component: null, props: {} },
    //     FinishDefaultMessage: {
    //       component: <div>compartilhe!</div>,
    //       props: { imageUrl: 'bla', href: 'https://www.mapalgbt.bonde.org' },
    //     },
    //   }}
    // />
  );
};

export const PhoneWithCallTransition = () => {
  return (
    <div>PhoneWithCallTransition</div>
    // <PhonePressurePlugin
    //   {...PressureProps}
    //   asyncFillWidget={() => Promise.resolve()}
    //   overrides={{
    //     FinishCustomMessage: { component: null, props: {} },
    //     FinishDefaultMessage: {
    //       component: <div>compartilhe!</div>,
    //       props: { imageUrl: 'bla', href: 'https://www.mapalgbt.bonde.org' },
    //     },
    //   }}
    // />
  );
};

export default {
  title: 'PhonePressure',
};
