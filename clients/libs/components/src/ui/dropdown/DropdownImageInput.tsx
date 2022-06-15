import React from "react";
import styled from "styled-components";

interface Img {
  src: string;
  alt?: string;
}

interface Value {
  img: Img;
  label: string;
}

interface DropdownImageInputProps {
  value: Value;
  placeholder: string;
  clickable?: boolean;
}

const DropdownImageInput = styled(({ className, value }: any) => {
  const { img, label } = value;
  return (
    <div className={className}>
      <img src={img.src} alt={img.alt} />
      {label}
    </div>
  );
})<DropdownImageInputProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;

  img {
    border-radius: 50px;
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
`;

export default DropdownImageInput;
