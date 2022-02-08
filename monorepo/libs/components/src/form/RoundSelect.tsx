import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ReactSelect, { components } from 'react-select';
import { ArrowDownIcon } from '../icons';

const SelectIcon = styled.div<{ show: boolean }>`
  transition: all 350ms;

  ${props =>
    props.show &&
    css`
      transform: rotate(180deg);
      position: relative;
      top: 2px;
    `}
`;

const StyledControl = styled.div<{
  value: string;
  theme: any;
  invalid: boolean;
}>`
  & > .Select__control {
    // Sets clear button color dinamically
    & > .Select__indicators > .Select__clear-indicator {
      color: #ee0099;
    }
    background-color: unset;
    ${props =>
      !props.value
        ? css`
            &:hover,
            &:focus {
              border-color: #aaa;
            }
            border-color: #aaa;
          `
        : css`
            &:hover,
            &:focus {
              border-color: #ee0099;
            }
            border-color: #ee0099;
          `}
    ${props =>
      props.invalid &&
      css`
        &:hover,
        &:focus {
          border-color: #FF2B4E;
        }
        border-color: #FF2B4E;
      `}
    box-shadow: none;
    width: 100%;
    & > .Select__value-container {
      & > .Select__placeholder {
        font-family: 'Nunito Sans', sans-serif;
        color: #4A4A4A;
      }
    }
  }
`;

const StyledSingleValue = styled.div<{
  isDisabled: boolean;
  theme: any;
  value: string;
}>`
  & > .Select__single-value {
    opacity: ${props => (props.isDisabled ? 0.5 : 1)};
    transition: opacity 300ms;
    font-family: 'Nunito Sans', sans-serif;
    color: ${props =>
      !props.value ? "#aaa" : "#ee0099"};
  }
`;

const StyledOption = styled.div<{
  theme: any;
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}>`
  & > .Select__option {
    font-family: 'Nunito Sans', sans-serif;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'default'};
    ${props =>
      props.isSelected &&
      css`
        background-color: rgba(74, 74, 74, 0.5);
        &:active {
          backgroundcolor: rgba(74, 74, 74, 0.5);
        }
      `}
    ${props =>
      props.isFocused &&
      css`
        background-color: rgba(74, 74, 74, 0.3);
      `}
    ${props =>
      props.isDisabled &&
      css`
        color: #ccc;
      `}
    color: ${props => props.isSelected ? "#fff" : "#4A4A4A"};
  }
`;

const StyledMenu = styled.div`
  & > .Select__menu {
    z-index: 3;
  }
`;

const SingleValue = (props: any) => (
  <StyledSingleValue value={props.selectProps.value} {...props}>
    <components.SingleValue {...props} />
  </StyledSingleValue>
);

const DropdownIndicator = (props: any) => {
  const color = !props.selectProps.value
    ? "#4A4A4A"
    : "#ee0099";
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon show={props.selectProps.show}>
        <ArrowDownIcon color={color} />
      </SelectIcon>
    </components.DropdownIndicator>
  );
};

const Control = (props: any) => (
  <StyledControl value={props.selectProps.value} {...props}>
    <components.Control {...props} />
  </StyledControl>
);

const Option = (props: any) => (
  <StyledOption value={props.selectProps.value} {...props}>
    <components.Option {...props} />
  </StyledOption>
);

const Menu = (props: any) => {
  return (
    <StyledMenu>
      <components.Menu {...props}>{props.children}</components.Menu>
    </StyledMenu>
  );
};

type Props = {
  options: Array<{
    value: unknown;
    label: string | number;
  }>;
  value: {
    value: unknown;
    label: string | number;
  };
  onChange: (event: any) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  menuPortalTarget?: HTMLBodyElement | null;
  isClearable?: boolean;
  maxMenuHeight?: number;
  menuPlacement?: 'auto' | 'top' | 'bottom';
  menuHeight?: any
};

const RoundSelect: React.FC<Props> = ({ ...props }) => {
  const [show, toggle] = useState(false);
  return (
    <ReactSelect
      {...props}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
        Control,
        SingleValue,
        Option,
        Menu,
      }}
      menuIsOpen={show}
      onMenuOpen={() => toggle(true)}
      onMenuClose={() => toggle(false)}
      onInputChange={() => toggle(false)}
      classNamePrefix={'Select'}
    />
  );
};

RoundSelect.defaultProps = {
  menuHeight: 300
};

RoundSelect.displayName = 'RoundSelect';

export default RoundSelect;
