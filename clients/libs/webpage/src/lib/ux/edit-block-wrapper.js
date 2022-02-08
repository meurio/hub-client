import React from 'react'


class EditBlockWrapper extends React.Component {

  render () {
    // Wrapper Props
    // - children must always render
    const { block, children, editable } = this.props

    return (
      <div
        onMouseEnter={() => {
          /*if (editable && !editing) onMouseOver(HOVER_MOUSE_KEY, block.id)*/
          if (editable) console.log(`[Block ${block.id}] onMouseEnter`)
        }}
        onMouseLeave={() => {
          /*if (editable && !editing) onMouseOut(HOVER_MOUSE_KEY)*/
          if (editable) console.log(`[Block ${block.id}] onMouseLeavr`)
        }}
        onKeyUp={evt => {
          // ESC keycode
          /*if (evt.keyCode === 27) {
            onCancelEdit(block)
          }*/
        }}
      >
        {children}
      </div>
    )
  }
}

export default EditBlockWrapper