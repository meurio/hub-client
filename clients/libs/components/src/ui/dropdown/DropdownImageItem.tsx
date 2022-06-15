import React from "react";
import styled from "styled-components";
import Header from "../content/Header";

interface Img {
  src: string;
  alt?: string;
}

interface Value {
  img: Img;
  label: string;
}

interface DropdownImageItemProps {
  value: Value;
  placeholder: string;
  clickable?: boolean;
}

const DropdownImageItem = styled(({ className, value }: any) => {
  const { img, label } = value;
  return (
    <div className={className}>
      <img src={img.src} alt={img.alt} />
      {label}
    </div>
  );
})<DropdownImageItemProps>`
  display: flex;
  padding: 10px 25px;
  flex-grow: 1;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  ${(props) =>
    props.clickable &&
    `
    &:hover {
      background-color: #c7c7c7;
    }
  `}
  ${Header.H4}, ${Header.H5} {
    margin: 0;
  }
`;

export default DropdownImageItem;
