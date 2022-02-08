import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

export const mountWithRouter = children => mount(<MemoryRouter>{children}</MemoryRouter>)
export const shallowWithRouter = children => shallow(<MemoryRouter>{children}</MemoryRouter>)
