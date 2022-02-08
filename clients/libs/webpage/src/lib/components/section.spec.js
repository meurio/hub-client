import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import { Section } from '.'
/*import Block from '@bonde-webpage/components/block.connected'*/

let blockComponent
const block = { id: 1 }
const widgets = [
    { id: 1, kind: 'draft', sm_size: 6, md_size: 6, lg_size: 6, block_id: 1 },
]
const WidgetComponent = ({ widget }) => (
    <p>{widget.kind}</p>
)
const props = {
    anchor: `section-${block.id}`,
    editable: true,
    block,
    widgets,
    widgetComponent: WidgetComponent,
    extraWidgetProps: {}
}
const BlockWrapper = ({ children }) => (
    <div id='block-wrapper'>{children}</div>
)

test.beforeEach(() => {
    blockComponent = shallow(<Section {...props} />, { disableLifecycleMethods: true })
})

test('should render default a navigation section', t => {
    t.is(blockComponent.find(`div#${props.anchor}`).length, 1)
})

test('should render wrapper outside of block when passed by props', t => {
    blockComponent.setProps({ wrapper: BlockWrapper })
    t.is(blockComponent.find(BlockWrapper).length, 1)

    const blockWrapper = blockComponent.find(BlockWrapper)
    t.is(blockWrapper.find(`div#${props.anchor}`).length, 1)
})

test('should pass required props to wrapper component', t => {
    blockComponent.setProps({ wrapper: BlockWrapper })
    const blockWrapperProps = blockComponent.find(BlockWrapper).props()
    // use this format because children is passed to wrapper component too
    t.deepEqual(blockWrapperProps.block, props.block)
    t.deepEqual(blockWrapperProps.editable, props.editable)
})

test('should render WidgetArea to each widget object', t => {
    t.is(blockComponent.find('WidgetArea').length, props.widgets.length)
})

test('should pass to WidgetArea block and widget', t => {
    const widgetProps = blockComponent.find('WidgetArea').at(0).props()
    t.deepEqual(widgetProps, {
        block: props.block,
        widget: props.widgets[0],
        widgetComponent: props.widgetComponent,
        extraWidgetProps: props.extraWidgetProps
    })
})