import React from 'react'
import styled from 'styled-components'

const Checkbox = styled(({ children, className, ...inputProps }) => (
  <label className={className}>
    <input type='checkbox' {...inputProps} />
    <span>{children}</span>
    <div className='box' />
  </label>
))`{
  font-family: 'Nunito Sans', sans-serif;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;

  & input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  & .box {
    position: absolute;
    top: 2px;
    left: 0;
    height: 19px;
    width: 19px;
    background: #fff;
    border: 1px solid #4a4a4a;
    border-radius: 4px;
  }

  &:hover input:not([disabled]) ~ .box,
  & input:not([disabled]):focus ~ .box {
    border-color: #ee0099;
  }

  & input:checked ~ .box {
    background: #ff0099;
    border-color: #ff0099;
  }

  & input:disabled:checked ~ .box {
    background: #d1cdd2;
  }

  &:hover input:not([disabled]):checked ~ .box,
  & input:checked:focus ~ .box {
    background: #ff0099;
    border-color: #ff0099;
  }

  & input:disabled ~ .box {
    border-color: #d1cdd2;
    opacity: 0.6;
    pointer-events: none;
  }
  & input:disabled ~ span {
    color: #d1cdd2;
  }

  & .box:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ .box:after {
    display: block;
  }

  & .box:after {
    left: 8px;
    top: 4px;
    width: 3px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}`

/* @component */
export default Checkbox
