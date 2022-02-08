import React from 'react';
import {
  Button,
  Box,
  Flex,
  Header,
  Icon,
  Text,
  Tooltip,
  InfoIcon,
  Loading,
  Stack
} from 'bonde-components';
import NumberFormat from 'react-number-format';
import useDownloadCSV from './hooks/useDownloadCSV';
import type { PathDownload } from './hooks/useDownloadCSV';

interface NumberProps {
  total?: number;
  waiting?: number;
  format?: 'money'
}

export const Number: React.FC<NumberProps> = ({ children, total, waiting, format }) => {
  const formatProps: any = {
    displayType: 'text',
    thousandSeparator: '.',
    decimalSeparator: ','
  }
  
  if (format === 'money') {
    formatProps.decimalScale = 2
    formatProps.fixedDecimalScale = true
  }

  return (
    <>
      <Header.H2>
        <NumberFormat {...formatProps} value={total || 0} />
      </Header.H2>
      {waiting && (
        <Text style={{ color: '#a4a4a4' }}>
          <Icon color='#c7c7c7' name='Sync' size='small' />
          <NumberFormat {...formatProps} value={waiting} />
        </Text>
      )}
      {children}
    </>
  );
}

export const ContentBox: React.FC<any> = ({ children, w, p }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    shadow="sm"
    bg="white"
    borderRadius="sm"
    p={p || 6}
    w={w}
    h="100%"
  >
    {children}
  </Box>
);

interface DownloadProps {
  path: PathDownload
  label: string
  icon: any
}

export const Download: React.FC<DownloadProps> = ({ path, icon, label }) => {
  const { loading, onClick } = useDownloadCSV(path);

  return (
    <Button
      onClick={onClick}
      bg="white"
      p={4}
      w="205px"
      h="95px"
      borderRadius="sm"
      css={`
        white-space: normal;
        border: none;
        outline: none;
      
        &:active, &:focus, &:hover {
          border: none;
          outline: none;
        }

        h5 {
          text-align: left;
        }
      
        &:hover {
          background-color: white;
          h5 {
            color: #a4a4a4 !important;
          }
      
          .fill {
            path {
              fill: #a4a4a4 !important;
            }
          }
        }
      `}
    >
      {loading
        ? (
          <Loading size='small' />
        ) : (
          <Stack display="flex" direction="row" spacing={4}>
            <Icon name={icon as any} />
            <Header.H5 uppercase>{label}</Header.H5>
          </Stack>
        )
      }
    </Button>
  );
}

interface Props {
  label: string;
  tooltip?: string;
}

const AnalyticsCard: React.FC<Props> = ({ label, tooltip, children }) => {
  const Label = <Header.H5 style={{ fontWeight: 600, marginBottom: '12px', whiteSpace: 'nowrap' }} uppercase>{label}</Header.H5>;

  return (
    <Flex direction="column" flex={1} h="100%">
      <Stack direction="row" spacing={2} mt={4} align="baseline">
        {Label}
        {tooltip && (
          <Tooltip label={tooltip}>
            <InfoIcon color="gray.200" boxSize={3} />
          </Tooltip>
        )}
      </Stack>
      <ContentBox>
        {children}
      </ContentBox>
    </Flex>
  );
}

export default AnalyticsCard;