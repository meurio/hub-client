import React, { useState } from "react";
import styled, { css } from "styled-components";
import ReactSelect, { components } from "react-select";

import theme from "../base/theme";
import Icon from "../content/Icon";

const SelectIcon = styled.div<{ show: boolean }>`
  transition: all 350ms;

  ${(props) =>
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
      color: ${(props) => props.theme.brand.main};
    }
    background-color: unset;
    ${(props) =>
      !props.value
        ? css`
            &:hover,
            &:focus {
              border-color: ${props.theme.commons.main};
            }
            border-color: ${props.theme.commons.main};
          `
        : css`
            &:hover,
            &:focus {
              border-color: ${props.theme.brand.main};
            }
            border-color: ${props.theme.brand.main};
          `}
    ${(props) =>
      props.invalid &&
      css`
        &:hover,
        &:focus {
          border-color: ${props.theme.error};
        }
        border-color: ${props.theme.error};
      `}
    box-shadow: none;
    width: 100%;
    & > .Select__value-container {
      & > .Select__placeholder {
        font-family: ${(props) => props.theme.fontFamily};
        color: ${(props) => props.theme.commons.dark};
      }
    }
  }
`;

StyledControl.defaultProps = {
  theme,
};

const StyledSingleValue = styled.div<{
  isDisabled: boolean;
  theme: any;
  value: string;
}>`
  & > .Select__single-value {
    opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
    transition: opacity 300ms;
    font-family: ${(props) => props.theme.fontFamily};
    color: ${(props) =>
      !props.value ? props.theme.commons.main : props.theme.brand.main};
  }
`;

StyledSingleValue.defaultProps = {
  theme,
};

const StyledOption = styled.div<{
  theme: any;
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}>`
  & > .Select__option {
    font-family: ${(props) => props.theme.fontFamily};
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "default")};
    ${(props) =>
      props.isSelected &&
      css`
        background-color: rgba(74, 74, 74, 0.5);
        &:active {
          backgroundcolor: rgba(74, 74, 74, 0.5);
        }
      `}
    ${(props) =>
      props.isFocused &&
      css`
        background-color: rgba(74, 74, 74, 0.3);
      `}
    ${(props) =>
      props.isDisabled &&
      css`
        color: #ccc;
      `}
    color: ${(props) =>
      props.isSelected ? props.theme.brand.light : props.theme.commons.dark};
  }
`;

const StyledMenu = styled.div`
  & > .Select__menu {
    z-index: 3;
  }
`;

StyledOption.defaultProps = {
  theme,
};

const SingleValue = (props: any) => (
  <StyledSingleValue value={props.selectProps.value} {...props}>
    <components.SingleValue {...props} />
  </StyledSingleValue>
);

const DropdownIndicator = (props: any) => {
  const color = !props.selectProps.value
    ? theme.commons.main
    : theme.brand.main;
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon show={props.selectProps.show}>
        <Icon name="ArrowDown" size="small" color={color} />
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
  menuPlacement?: "auto" | "top" | "bottom";
};

const RoundSelect = ({ ...props }: Props) => {
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
      onMenuOpen={() => toggle(true)}
      onMenuClose={() => toggle(false)}
      onInputChange={() => toggle(false)}
      show={show}
      classNamePrefix={"Select"}
    />
  );
};

RoundSelect.defaultProps = {
  theme,
  menuHeight: 300,
};

RoundSelect.displayName = "RoundSelect";

export default RoundSelect;
