import React from 'react';
import styled from 'styled-components';
import { Header, Icon } from 'bonde-components';
import { Text, Flex } from 'bonde-components/chakra';

export type ColProps = {
  align?: string
}

export const Col = styled.div<ColProps>`
  text-align: ${props => props.align};

  p {
    text-align: ${props => props.align};
  }
`;

Col.defaultProps = {
  align: 'left'
}

export type DNSProps = {
  header?: boolean
}

export const DNS = styled.div<DNSProps>`
  display: grid;
  grid-template-columns: 500px auto 150px;
  grid-template-rows: ${props => props.header ? '35px' : '60px'};
  background-color: ${props => props.header ? 'none' : '#fff'};
  border-bottom: ${props => props.header ? 'none' : '1px solid #eee'};

  ${Col} {
    padding: ${props => props.header ? '0 20px 18px' : '18px 20px'};

    ${Header.H5} {
      margin: 14px 0 8px;
    }
  }

  ${props => !!props.header && `
    p {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 700;
    }
  `}
`

export type StatusProps = {
  value?: string
  labels: Record<string, string>
  activeStatus?: string
  inactiveStatus?: string
  isActived?: () => boolean
}

type StatusStyledProps = {
  active?: boolean
  disabled?: boolean
}

// Status propagando: #444444
export const StatusStyled = styled(Text).attrs({ bold: true, uppercase: true })`
  cursor: pointer;
  font-size: 13px !important;
  color: ${(props: StatusStyledProps) => props.active ? '#50E3C2' : props.disabled ? '#ee0099' : '#444444'} !important;

  svg {
    margin: 0 5px 3px 0;

    g, path {
      fill: ${(props: StatusStyledProps) => props.active ? '#50E3C2' : props.disabled ? '#ee0099' : '#444444'} !important;
    }
  }
`;

export const Status = ({ value, labels, activeStatus, inactiveStatus, isActived }: StatusProps) => {
  const isActive = isActived ? isActived() : value === activeStatus;
  const isDisabled = isActived ? !isActived() : value === inactiveStatus;

  return (
    <StatusStyled active={isActive} disabled={isDisabled}>
      {isActive ? (
        <Flex direction="row">
          <Icon size='small' name='Check' />
          <span>{labels && labels[value || 'active']}</span>
        </Flex>
      ) : inactiveStatus ? (
        <Flex direction="row">
          <Icon size='small' name='Warning' />
          <span>{labels && labels[value || 'inactive']}</span>
        </Flex>
      ) : (
        <Flex direction="row" alignItems="center" >
          <Icon size='small' name='Sync' />
          <span>{labels && labels[value || 'disabled']}</span>
        </Flex>
      )
      }
    </StatusStyled >
  );
}

Status.defaultProps = {
  activeStatus: 'active'
}

export const MainTitle: React.FC = ({ children }) => (
  <Text fontSize="sm" color="gray.400" textTransform="uppercase">{children}</Text>
)

export const SmallText = styled(Text)`
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;

  a {
    color: #ee0099;

    &:hover {
      color: #e2058a
    }
  }
`;
