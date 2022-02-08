/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from 'enzyme'
import WidgetOverlay from './widget-overlay'

describe('client/mobrender/components/widget-overlay', () => {
  const kind: any = 'content'
  const properties = {
    children: <p>Widget Dummy</p>,
    widget: {
      id: 1,
      kind,
      sm_size: 3,
      md_size: 3,
      lg_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1
    },
    hasMouseOver: false,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseOut: jest.fn()
  }

  it('should render without crashed', () => {
    const over = shallow(<WidgetOverlay {...properties} />)
    expect(over).to.be.ok
  })

  it('should render children', () => {
    const over = shallow(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WidgetOverlay {...properties}>
        <h1>Children</h1>
      </WidgetOverlay>
    )
    expect(over.find('h1').length).to.equal(1)
  })

  it('should call onMouseOver passing ("widget", widget.id) when mouse enter', () => {
    let result
    const over = shallow(<WidgetOverlay {...properties} />)
    over.setProps({ onMouseOver: (key, id) => { result = [key, id] } })
    over.find('div.relative').simulate('mouseenter')
    expect(result).to.deep.equal(['widget', properties.widget.id])
  })

  it('should call onMouseOut passing ("widget") when mouse leave', () => {
    const over = shallow(<WidgetOverlay {...properties} />)
    let result
    over.setProps({ onMouseOut: key => { result = [key] } })
    over.find('div.relative').simulate('mouseleave')
    expect(result).to.deep.equal(['widget'])
  })

  it('should render cursor pointer', () => {
    const over = shallow(<WidgetOverlay {...properties} />)
    expect(over.find('div.relative').props().style).to.deep.equal({
      cursor: 'pointer'
    })
  })

  it('should call onEdit when click edit button', () => {
    let result
    const over = shallow(<WidgetOverlay {...properties} />)
    over.setProps({
      hasMouseOver: true,
      onEdit: () => { result = true }
    })
    over.find('button.btn-edit').simulate('click')
    expect(result).to.equal(true)
  })

  it('should call onDelete when click remove button', () => {
    let result
    const over = shallow(<WidgetOverlay {...properties} />)
    over.setProps({
      hasMouseOver: true,
      onDelete: () => { result = true }
    })
    over.find('button.btn-remove').simulate('click')
    expect(result).to.equal(true)
  })

  it('should render over div when has mouse over', () => {
    const over = shallow(<WidgetOverlay {...properties} />)
    over.setProps({ hasMouseOver: true })
    expect(over.find('div.overlay').length).to.equal(1)
  })
})
