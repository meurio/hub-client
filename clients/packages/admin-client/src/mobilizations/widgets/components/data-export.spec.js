/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import { DataExport } from 'mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/data-export', () => {
  let wrapper
  const props = {
    loading: false,
    success: false,
    error: undefined,
    widget: { id: 1 },
    mobilization: { name: 'Foo bar' },
    // Actions
    asyncWidgetDataExport: mock.noop,
    dataExportMount: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<DataExport {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
