import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import * as paths from 'paths'
import { SettingsMenu } from 'mobilizations/widgets/__plugins__/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/settings-menu', () => {
  let props = {
    mobilization: {},
    widget: {},
    location: {}
  }

  describe('tabs', () => {
    it('should render 1 <Tabs /> component', () => {
      const wrapper = shallow(<SettingsMenu {...props} />)
      expect(wrapper.find('Tabs')).to.have.length(1)
    })
    it('should render 5 <Tab /> components as a children', () => {
      const wrapper = shallow(<SettingsMenu {...props} />)
      expect(wrapper.find('Tab')).to.have.length(5)
    })
  })

  describe('when active menu with pathname equals location', () => {
    const dummyId = 1
    props.mobilization.id = dummyId
    props.widget.id = dummyId

    it('should active tab Ajustes (form settings)', () => {
      props.location.pathname = paths.formMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<SettingsMenu {...props} />)
      let node = wrapper.find('Tabs Tab').at(0)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Campos do formulário (fields settings)', () => {
      props.location.pathname = paths.fieldsMobilizationWidget(dummyId, dummyId)

      let wrapper = shallow(<SettingsMenu {...props} />)
      let node = wrapper.find('Tabs Tab').at(1)
      expect(node.props().isActive).to.equals(true)
    })

    it('should active tab Mensagem agradecimento (autofire)', () => {
      props.location.pathname = paths.formAutofire(dummyId, dummyId)

      let wrapper = shallow(<SettingsMenu {...props} />)
      let node = wrapper.find('Tabs Tab').at(2)
      expect(node.props().isActive).to.equals(true)
    })
  })
})
