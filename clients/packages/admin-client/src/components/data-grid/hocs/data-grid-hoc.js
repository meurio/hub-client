import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default ({ rowComponent: RowComponent }) =>
  (WrappedComponent) => {
    class PP extends React.Component {
      render () {
        const {
          children,
          data,
          fieldIndex,
          rowIndex: rowSelectedIndex,
          onSelectRow
        } = this.props
        const dataGridProps = {
          className: classnames('flex flex-column', this.props.className),
          data: WrappedComponent !== 'div' ? data : null
        }

        return (
          <WrappedComponent {...this.props} {...dataGridProps}>
            {data && data.map((item, rowIndex) => (
              <RowComponent
                key={`rowIndex-${rowIndex}`}
                actived={rowSelectedIndex === rowIndex}
                onSelectRow={() => {
                  onSelectRow && onSelectRow(item, rowIndex)
                }}
                data={item}
                rowIndex={fieldIndex ? item[fieldIndex] : rowIndex}
              >
                {children}
              </RowComponent>
            ))}
          </WrappedComponent>
        )
      }
    }

    PP.propTypes = {
      data: PropTypes.array
    }

    PP.defaultProps = {
      data: []
    }

    return PP
  }
