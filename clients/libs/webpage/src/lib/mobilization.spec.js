/* eslint-disable no-unused-expressions */
import * as React from 'react'
import { shallow } from 'enzyme'
import Mobilization from './mobilization'
import test from 'ava'
import { Section } from './components'
/*import Block from '@bonde-webpage/components/block.connected'*/

const props = {
  colorScheme: 'meu-rio',
  headerFont: 'headerFont',
  bodyFont: 'bodyFont',
  /*mobilization: {
    color_scheme: 'meu-rio',
    header_font: 'headerFont',
    body_font: 'bodyFont',
    name: 'Lorem',
    goal: 'Lorem ipsum dolor',
    facebook_share_title: 'Facebook share title',
    facebook_share_description: 'Facebook share description',
    facebook_share_image: 'http://facebook.com/share-image.png'
  },*/
  editable: true,
  linkTo: (b) => `section-${b.id}`,
  blocks: [
    { id: 1, hidden: false },
    { id: 2, hidden: false },
    { id: 3, hidden: true }
  ],
  widgets: [
    { id: 1, block_id: 1, kind: 'draft' },
    { id: 2, block_id: 2, kind: 'draft' },
    { id: 2, block_id: 3, kind: 'draft' }
  ],
  widgetComponent: ({ widget }) => (
    <p>{widget.kind}</p>
  ),
  extraWidgetProps: {}
/*    store: mock.store({ auth: { user: { email: 'foo@bar.com' } } })*/
}

function setupWrapper() {
  return shallow(<Mobilization {...props} />, { disableLifecycleMethods: true }) 
}

test('render without crashed', t => {
  t.truthy(setupWrapper())
})

test('renders with color_scheme, header_font, body_font custom by default', t => {
  const { colorScheme, headerFont, bodyFont } = props
  const themeClassName = `.${colorScheme}.${headerFont}-header.${bodyFont}-body`
  t.is(setupWrapper().find(`div${themeClassName}`).length, 1)
})

// it('renders Navbar with blocks and editable props passed', () => {
//   expect(wrapper.find('Navbar').props().blocks).to.equal(props.blocks)
//   expect(wrapper.find('Navbar').props().editable).to.equal(props.editable || false)
// })

test('should render blocks with section basic structure', t => {
  t.is(setupWrapper().find(Section).length, props.blocks.length)
})


test('should pass block props to section component', t => {
  const firstBlock = props.blocks[0]
  const firstBlockProps = {
    block: firstBlock,
    editable: props.editable,
    anchor: props.linkTo(firstBlock),
    wrapper: props.blockWrapper,
    widgets: props.widgets.filter(w => w.block_id === firstBlock.id),
    widgetComponent: props.widgetComponent,
    extraWidgetProps: props.extraWidgetProps
  }
  const sectionProps = setupWrapper().find(Section).at(0).props()
  t.deepEqual(sectionProps, firstBlockProps)
})

test('should possible change block widgets relationship method', t => {
  const wrapper = setupWrapper()
  const firstBlock = props.blocks[0]
  const widgets = [
    {id: 1, kind: 'draft', ref: firstBlock.id },
    {id: 1, kind: 'draft', ref: 10 }
  ]
  const blockWidgetsRef = (b, ws) => ws.filter(w => w.ref === b.id)
  wrapper.setProps({ widgets, blockWidgetsRef })

  const sectionProps = wrapper.find(Section).at(0).props()
  t.deepEqual(sectionProps.widgets, blockWidgetsRef(firstBlock, widgets))
})

// describe('when is editable', () => {
//   const editableWrapper = shallow(<Mobilization {...props} editable />, {
//     disableLifecycleMethods: true
//   })

//   it('should renders relative layout classNames', () => {
//     const layoutClassName = '.flex-auto.relative'
//     const main = editableWrapper.find(`div${layoutClassName}`)
//     expect(main.length).to.equal(1)
//     expect(main.props().style).to.equal(undefined)
//   })

//   it('should not render DocumentMeta', () => {
//     expect(editableWrapper.find('DocumentMeta').length).to.equal(0)
//   })

//   it('should render all blocks', () => {
//     editableWrapper.setProps({ editable: true })
//     expect(editableWrapper.find(Block).length).to.equal(props.blocks.length)
//   })
// })

function setupEditable(wrapper) {
  wrapper.setProps({
    editable: false
  })
}

test('should renders absolute layout classNames', t => {
  const wrapper = setupWrapper()
  setupEditable(wrapper)
  const layoutClassName = '.absolute.flex'
  const main = wrapper.find(`div${layoutClassName}`)
  t.is(main.length, 1)
  t.deepEqual(main.props().style, { top: 0, bottom: 0, left: 0, right: 0 })
})

// test('should render only visible blocks', t => {
//   const wrapper = setupWrapper()
//   const visibleBlocks = props.blocks.filter(b => !b.hidden)
//   t.is(wrapper.find(Section).length, visibleBlocks.length)
// })
