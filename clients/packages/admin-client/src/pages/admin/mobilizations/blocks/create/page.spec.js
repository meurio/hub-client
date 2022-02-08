import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { FormattedMessage } from 'react-intl'

import BLOCK_LAYOUTS from 'mobilizations/blocks/constants/block-layouts'
import Page from './page'

describe('routes/admin/authenticated/sidebar/blocks-create/page', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    blocks: {},
    auth: { credentials: {} },
    mobilization: { id: 1, color_scheme: 'meurio-scheme' },
    location: { pathname: '' },
    onCreateBlock: () => {}
  }

  describe('#render', () => {
    beforeEach(() => {
      wrapper = shallow(<Page {...props} />)
    })

    it('should render root settings page layout', () => {
      expect(wrapper.find('SettingsPageLayout')).to.have.length(1)
    })

    describe('new block header', () => {
      it('should render one settings page menu layout', () => {
        expect(wrapper.find('SettingsPageMenuLayout')).to.have.length(1)
      })
      it('should render one <h1> with its content properly', () => {
        const expectedTitleIntl = (
          <FormattedMessage
            id='page--block-create.title'
            defaultMessage='Adicione um bloco de conteúdo'
          />
        )
        const titleIntl = wrapper.find('SettingsPageMenuLayout').props().title
        expect(titleIntl.props).to.be.deep.equal(expectedTitleIntl.props)
      })
      it('should render one <Tabs> component', () => {
        expect(wrapper.find('Tabs')).to.have.length(1)
      })
    })

    describe('block miniatures', () => {
      it(`should render ${BLOCK_LAYOUTS.length} <BlockMiniature> components`, () => {
        expect(wrapper.find('BlockMiniature')).to.have.length(BLOCK_LAYOUTS.length)
      })
    })

    describe('new block button', () => {
      it('should render one .block-create-button button', () => {
        expect(wrapper.find('Button')).to.have.length(1)
      })
    })
  })
})
