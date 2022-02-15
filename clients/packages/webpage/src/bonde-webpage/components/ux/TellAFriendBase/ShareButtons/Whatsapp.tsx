import React from 'react';
import { Wrap } from './styles';
import { isMobile } from 'react-device-detect';
import { Translate } from '../../../MobilizationClass';

const WhatsAppShareButton = ({ whatsappText }: { whatsappText: string }) => {
  const baseUrl = isMobile ? 'whatsapp://' : 'https://web.whatsapp.com/';

  return (
    <Translate>
      {({ t }: any) => (
        <Wrap>
          <a
            href={`${baseUrl}send?text=${encodeURIComponent(whatsappText)}`}
            style={{ backgroundColor: '#4CEC68', color: '#fff' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("Share Social Midia", { app: "WhatsApp" })}
          </a>
        </Wrap>
    )}
    </Translate>
  );
};

export default WhatsAppShareButton;
