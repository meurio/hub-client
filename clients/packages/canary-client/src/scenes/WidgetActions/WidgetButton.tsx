import React, { useContext } from 'react';
import { Header, Text, Icon, Box, Flex, Image, Stack } from 'bonde-components';
import { Context as SessionContext } from 'bonde-core-tools';
import { Link } from 'react-router-dom';
import { Widget } from './FetchWidgets';
import Labels from './Labels';

type Props = {
  widget: Widget
}

const WidgetButton: React.FC<Props> = ({ widget }) => {
  const { community, updateSession } = useContext(SessionContext);
  const {
    id,
    kind,
    block: {
      mobilization: {
        id: mobilization_id,
        image,
        name
      }
    },
    actions: {
      aggregate: {
        count
      }
    }
  } = widget;

  const label = Labels.get(kind);
  let linkProps: any = {
    onClick: () => {
      if (process.env.REACT_APP_DOMAIN_ADMIN) {
        updateSession("community", community).then(() => {
          window.location.href = new URL(
            `/mobilizations/${mobilization_id}/widgets/${id}/${kind.replace('-phone', '')}`,
            process.env.REACT_APP_DOMAIN_ADMIN
          ).href;
        });
      }
    }
  };

  if (kind === 'pressure' || kind === 'plip') {
    linkProps = { to: `/widgets/${id}/settings` };
  }

  const mobilizationLinkProps: any = {
    onClick: () => {
      if (process.env.REACT_APP_DOMAIN_ADMIN) {
        updateSession("community", community).then(() => {
          window.location.href = new URL(
            `/mobilizations/${mobilization_id}/edit`,
            process.env.REACT_APP_DOMAIN_ADMIN
          ).href;
        });
      }
    }
  }

  return (
    <Box bg="white" boxShadow="sm" px={6} py={4}>
      <Stack direction="column" spacing={4}>
        <Flex direction="row" justify="space-between">
          <Text>{label.title}</Text>
          <Link {...linkProps}>
            <Icon name='Settings' size='small' />
          </Link>
        </Flex>
        <Link {...mobilizationLinkProps}>
          <Stack direction="row" spacing={2}>
            <Image
              alt={name}
              boxSize="40px"
              src={image || 'https://via.placeholder.com/40'}
            />
            <Text>{name}</Text>
          </Stack>
        </Link>
        <Flex align="flex-end">
          <Header.H2 style={{ marginRight: '5px' }}>{count}</Header.H2>
          <Text>{label.count}</Text>
        </Flex>
      </Stack>
    </Box>
  );
}

export default WidgetButton;