import React from 'react';
import { Targets, Count, Footer } from '../src';
import PressureProps from './mocks/plugin/pressure';

export const TargetList = () => {
  return <Targets targets={PressureProps.targetList} pressureType={'email'} />;
};

export const CountContainer = () => {
  return (
    <Count
      value={PressureProps.widget.count || 0}
      color={PressureProps.widget.settings.main_color}
      text={'pressões'}
      startCounting={true}
    />
  );
};

export const FooterContainer = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div>CONTENT</div>
      <Footer />
    </div>
  );
};

export default {
  title: 'Components',
};
