import React from 'react'
import styled from '@emotion/styled'

interface SwitchProps {
  onClick?: () => void
  checked?: boolean
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({ onClick, checked, disabled }) => {
  return (
    <Label>
      <input onClick={onClick} type="checkbox" checked={checked} disabled={disabled}/>
      <span className="slider" />
    </Label>
  )
}

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 28px;
  min-width: 28px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 3px 3px 10px 1px rgb(138 138 138 / 55%);

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    border-radius: 34px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #858585;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider::before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    border-radius: 50%;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #50E3C2;
  }

  input:checked + .slider::before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
  }
`

export default Switch;
