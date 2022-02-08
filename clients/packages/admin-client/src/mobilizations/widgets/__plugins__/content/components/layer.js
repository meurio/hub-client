import React from 'react'

const Layer = ({ editing, onClick, value, changeState }) => {
  return (
    <div
      style={{
        display: editing ? 'block' : 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
        zIndex: 1
      }}
      onClick={() => onClick(value, changeState)}
    />
  )
}

export default Layer
