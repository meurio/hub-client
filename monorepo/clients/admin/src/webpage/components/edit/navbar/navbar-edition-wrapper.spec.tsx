import { expect } from 'chai'
import { shallow } from 'enzyme';
import { NavbarEditionWrapper } from './navbar-edition-wrapper'

const block = {};
const blockUpdate = jest.fn();

describe('client/components/navigation/navbar/navbar-edition-wrapper', () => {
  const wrapper = shallow(
    <NavbarEditionWrapper
      block={block}
      blockUpdate={blockUpdate}
    />
  )
  it('should render form when its in the edit mode', () => {
    wrapper.setState({ isEditing: true })
    expect(wrapper.find('NavbarForm')).to.have.length(1)
  })

  it('should render button when its not in the edit mode', () => {
    wrapper.setState({ isEditing: false })
    expect(wrapper.find('NavbarButton')).to.length(1)
  })
})
