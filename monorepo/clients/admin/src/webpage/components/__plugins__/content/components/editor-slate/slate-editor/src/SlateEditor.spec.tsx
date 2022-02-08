import { shallow } from 'enzyme'
import SlateEditor from './SlateEditor'

describe('package/slate-editor/SlateEditor.spec.js', () => {
  const props = {
    // style?: any;?
    // eslint-disable-next-line unicorn/no-keyword-prefix
    // className?: string;
    plugins: [],
    onChange: jest.fn()
  }
  
  const wrapper = shallow(<SlateEditor {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('.editor--root').length).toBe(1)
  })
})
