import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mountWithIntl } from 'intl/helpers'
import { InputTag } from 'mobilizations/widgets/components/input-tag'
import * as os from 'utils/browser/os'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('client/mobilizations/widgets/components/input-tag', () => {
  let wrapper
  // eslint-disable-next-line
  const re = /[\w ]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/
  const tags = ['Tag 1', 'Tag 2']
  const props = {
    values: tags,
    label: 'Foo',
    onInsertTag: targets => {
      wrapper.setProps({ values: [...tags, ...targets] })
    },
    onRemoveTag: value => {
      wrapper.setProps({ values: tags.filter(tag => tag !== value) })
    },
    validate: targets => {
      const errors = { valid: true }
      if (targets.some(target => !target.match(re))) {
        errors.valid = false
        errors.message = 'Dismatch error'
      }
      return errors
    },
    onRemoveAll: () => {},
    helperText: ''
  }

  beforeEach(() => {
    wrapper = mountWithIntl(<InputTag {...props} intl={intl} />)
  })

  it('should render one <label> element', () => {
    expect(wrapper.find('label[htmlFor="insert-tag-id"]')).to.have.length(1)
  })

  it('should render one <label> element with its content as passed label prop value', () => {
    expect(wrapper.find('label[htmlFor="insert-tag-id"]').text()).to.be.equal(props.label)
  })

  it('should render error when keyDown `cmd` + `enter` on Mac and validade returns false', () => {
    let confirmStub = sinon.stub(os, 'isMac')
    confirmStub.returns(true)
    wrapper.find('textarea').simulate('keyDown', {
      charCode: 13,
      nativeEvent: { metaKey: true }
    })
    expect(wrapper.find('.red').text()).to.have.string('Dismatch error')
  })

  it('should render error when keyDown `ctrl` + `enter` on Windows and validade returns false',
    () => {
      let confirmStub = sinon.stub(os, 'isWindows')
      confirmStub.returns(true)
      wrapper.find('textarea').simulate('keyDown', {
        charCode: 13,
        ctrlKey: true
      })
      expect(wrapper.find('.red').text()).to.have.string('Dismatch error')
    }
  )

  it('should render error when keyDown `ctrl` + `enter` on Linux and validade returns false', () => {
    let confirmStub = sinon.stub(os, 'isLinux')
    confirmStub.returns(true)
    wrapper.find('textarea').simulate('keyDown', {
      charCode: 13,
      ctrlKey: true
    })
    expect(wrapper.find('.red').text()).to.have.string('Dismatch error')
  })

  it('should clean and call onInsertTag when keyDown `cmd` + `enter` and validade return is true',
    () => {
      // simulate click with fill input
      wrapper.setState({ value: 'Igor Santos <igor@nossascidades.org>' })
      wrapper.find('textarea').simulate('keyDown', {
        charCode: 13,
        nativeEvent: { metaKey: true }
      })

      expect(wrapper.props().values).to.deep.equal(['Tag 1', 'Tag 2', 'Igor Santos <igor@nossascidades.org>'])
      expect(wrapper.instance().state.value).to.equal('')
    }
  )

  it('should insert value in input and onRemoveTag when clicked to edit tag', () => {
    // find first tag: "Tag 1"
    const firstTag = wrapper.find('BlockTag').find('Tag').at(0)
    firstTag.find('span').at(1).simulate('click')
    expect(wrapper.instance().state.value).to.equal('Tag 1')
    expect(wrapper.props().values).to.deep.equal(['Tag 2'])
  })

  it('should insert failure if value exists in values', () => {
    // prepare values
    wrapper.setProps({ values: ['Igor Santos <igor@nossascidades.org>'] })
    // set value to insert
    wrapper.setState({ value: 'Igor Santos <igor@nossascidades.org>' })
    wrapper.find('textarea').simulate('keyUp', { key: 'Enter' })

    expect(wrapper.props().values.length).to.equal(1)
  })
})
