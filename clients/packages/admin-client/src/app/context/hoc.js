import React from 'react'
import Wrapper from './wrapper'

export default (Component) => ({ children, ...ownProps }) => (
  <Wrapper component={Component} {...ownProps}>
    {children}
  </Wrapper>
)
