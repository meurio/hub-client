import React from 'react';
import { IconButton, Stack } from '@chakra-ui/react';
import { Session, Community } from './types';

import SettingsIcon from '../chakra-theme/icons/SettingsIcon';
import PagesIcon from '../chakra-theme/icons/PagesIcon';
import BotIcon from '../chakra-theme/icons/BotIcon';
import NetIcon from '../chakra-theme/icons/NetIcon';

const items: any = {
  settings: [SettingsIcon, 'Configurações'],
  mobilization: [PagesIcon, 'Mobilizações'],
  redes: [NetIcon, 'Redes'],
  chatbot: [BotIcon, 'Chatbot'],
};

interface CommunityMenuProps {
  community: Community;
  inverted?: boolean;
  session: Session;
}

const CommunityMenu = ({
  community,
  session,
  inverted,
}: CommunityMenuProps): React.ReactElement => {
  const { apps: config, updateSession }: any = session;
  const { modules } = community;

  const handleClick = (url: string) => async () => {
    updateSession('community', community).then(() => {
      window.location.href = url;
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      {Object.keys(modules)
        .filter((key: string) => !!modules[key])
        .map((key: any, index: number) => {
          let moduleHost = '';
          let baseHost = '';
          try {
            moduleHost = new URL('', config[key]).host;
            baseHost = new URL('', window.location.href).host;
          } catch (err) {
            console.log('error URL', err);
          }

          const hoverColor = (color: string) => ({ color: `${color}.200` });
          const isActive = moduleHost === baseHost;
          const IconComponent: any = items[key][0];

          const colorSystem = inverted
            ? {
              color: isActive ? 'pink.200' : 'white',
              _hover: isActive ? hoverColor('pink') : hoverColor('gray'),
            }
            : {
              color: 'gray.400',
              _hover: hoverColor('gray'),
            };

          return (
            <IconButton
              aria-label={items[key][1]}
              key={`community-navigation-${index}`}
              variant="link"
              colorScheme="gray"
              title={items[key][1]}
              icon={<IconComponent {...colorSystem} boxSize={[0, 0, 4, 4]} />}
              onClick={handleClick(config[key])}
            />
          );
        })}
    </Stack>
  );
};

export default CommunityMenu;
