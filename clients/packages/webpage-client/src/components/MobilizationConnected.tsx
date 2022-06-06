import * as React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  MobilizationClass as Mobilization,
} from '../bonde-webpage';
import Footer from './Footer';

export interface MobilizationProperties {
  mobilization: any;
  blocks: any[];
  widgets: any[];
  blocksIsLoaded: boolean;
}

const MobilizationConnected = ({
  mobilization,
  blocks,
  widgets,
  blocksIsLoaded,
}: MobilizationProperties): JSX.Element => {
  const { t, i18n } = useTranslation();

  if (mobilization && blocksIsLoaded) {
    // Properties received by HOC
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont,
    } = mobilization;

    return (
      <Mobilization
        linkTo={(b: any) => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        // widgetComponent={PluggableWidget}
        footerComponent={Footer}
        colorScheme={colorScheme}
        headerFont={headerFont}
        bodyFont={bodyFont}
        mobilization={mobilization}
        t={t}
        i18n={i18n}
        Trans={Trans}
      />
    );
  }
  return <p>Carregando mobilização</p>;
};

export default MobilizationConnected;
