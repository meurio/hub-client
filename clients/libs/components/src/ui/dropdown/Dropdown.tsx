import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import DropdownList from "./ui/DropdownList";
import DropdownItem from "./ui/DropdownItem";
import DropdownInput from "./ui/DropdownInput";
import Icon from "../content/Icon";
import theme from "../base/theme";

const useOutsideAlerter = (ref: any, onEvent: any) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onEvent();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export const DropdownFluid = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fontFamily};
`;

DropdownFluid.defaultProps = {
  theme,
};

interface DropdownFluidListProps {
  direction?: "left" | "right";
}

const DropdownFluidList = styled.div<DropdownFluidListProps>`
  position: absolute;
  top: calc(100% + 15px);
  display: flex;
  flex-direction: column;
  z-index: 3;
  ${(props) =>
    props.direction === "left" &&
    `
    left: 0;
  `}
  ${(props) =>
    props.direction === "right" &&
    `
    right: 0;
  `}
`;

const DropdownFluidInput = styled(
  ({ children, className, onToggle, open }: any) => (
    <div className={className} onClick={onToggle}>
      {children}
      <Icon name={!open ? "ArrowDown" : "ArrowUp"} color="#fff" size="small" />
    </div>
  )
)`
  display: flex;
  z-index: 2;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  text-transform: uppercase;

  ${Icon} {
    margin-left: 10px;
  }
`;

interface DropdownFluidItemProps {
  clickable?: boolean;
  onClick?: any;
}

const DropdownFluidItem = styled.div<DropdownFluidItemProps>`
  display: flex;
  ${(props) => props.clickable && `cursor: pointer;`}
`;

const DropdownFluidLayout = styled.div`
  position: relative;
`;

interface DropdownProps {
  placeholder?: string;
  item?: any;
  items: any[];
  selectable?: boolean;
  onSelect: Function;
  dropdownInput?: any;
  dropdownItem?: any;
  dropdownList?: any;
  direction?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  item,
  items,
  selectable,
  onSelect,
  direction,
  dropdownInput: DropdownInputUI,
  dropdownItem: DropdownItemUI,
  dropdownList: DropdownListUI,
}) => {
  const [open, setOpen] = useState(false);
  // click ousite dropdown is close
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => setOpen(false));

  return (
    <DropdownFluid ref={dropdownRef}>
      <DropdownFluidInput open={open} onToggle={() => setOpen(!open)}>
        {!item ? (
          <span>{placeholder}</span>
        ) : selectable && !!item ? (
          <DropdownInputUI value={item} />
        ) : (
          <span>{placeholder}</span>
        )}
      </DropdownFluidInput>
      <DropdownFluidLayout>
        {open && (
          <DropdownFluidList direction={direction}>
            <DropdownListUI>
              {items.map((value, index) => {
                const clickable =
                  typeof value === "string"
                    ? true
                    : typeof value.clickable === "undefined"
                    ? true
                    : value.clickable;

                const itemProps = {
                  clickable,
                  onClick: !clickable
                    ? null
                    : () => {
                        onSelect(value);
                        setOpen(false);
                      },
                };

                return (
                  <DropdownFluidItem
                    key={`dropdown-item-${index}`}
                    {...itemProps}
                  >
                    {typeof value !== "string" && value.render ? (
                      <value.render value={value} selected={item} />
                    ) : (
                      <DropdownItemUI clickable value={value} selected={item} />
                    )}
                  </DropdownFluidItem>
                );
              })}
            </DropdownListUI>
          </DropdownFluidList>
        )}
      </DropdownFluidLayout>
    </DropdownFluid>
  );
};

Dropdown.defaultProps = {
  direction: "left",
  selectable: true,
  items: [],
  dropdownInput: DropdownInput,
  dropdownItem: DropdownItem,
  dropdownList: DropdownList,
};

export default Dropdown;
