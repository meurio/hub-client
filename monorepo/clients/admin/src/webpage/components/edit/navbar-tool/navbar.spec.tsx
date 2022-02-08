import { expect } from 'chai'
import { shallow } from "enzyme";
// import { shallowWithIntl } from '../../../intl/helpers'
import Navbar from './navbar'
import MenuItems from './menu-items'

describe('client/mobrender/components/navbar', () => {
  const status: 'active' | 'archived' = "active"
  const properties = {
    editable: true,
    mobilization: {
      id: 1,
      name: "mobs",
      slug: "mobs",
      status,
      community_id: 1,
      user_id: 1,
      language: "pt-br",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    blockUpdate: jest.fn(),
    blocks: [
      {
        id: 1,
        hidden: false,
        menu_hidden: false
      },
      {
        id: 2,
        hidden: true,
        menu_hidden: false
      },
      {
        id: 3,
        hidden: false,
        menu_hidden: true
      }
    ]
  }

  it('renders absolute layout by default', () => {
    const wrapper = shallow(<Navbar {...properties} />)
    expect(wrapper.find('.absolute.col-12.z3').length).to.equal(1)
  })

  it('should render desktop and mobile version', () => {
    const wrapper = shallow(<Navbar {...properties} />)

    expect(wrapper.find(MenuItems).at(0).props().mobile).to.equal(undefined)
    expect(wrapper.find(MenuItems).at(1).props().mobile).to.equal(true)
  })

  describe('when is editable', () => {
    it('should passed to <Menu /> visible blocks', () => {
      const wrapper = shallow(<Navbar {...properties} />)

      const blocks = properties.blocks.filter(b => !b.hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })

  describe('when isnt editable', () => {
    it('should passed to <Menu /> only visible blocks menu', () => {
      const wrapper = shallow(<Navbar {...properties} />)
      wrapper.setProps({ editable: false })

      const blocks = properties.blocks.filter(b => !b.hidden && !b.menu_hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })
})
