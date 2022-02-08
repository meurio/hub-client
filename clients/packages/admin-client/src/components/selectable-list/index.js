import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

// Parent module dependencies
import List from 'mobilizations/components/list'
import { Item, Avatar, Name, CreatedAt } from 'mobilizations/components/list/items'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

export const SelectableList = ({
  list,
  dispatch,
  selectedIndex,
  setSelectedIndex,
  activeCondition,
  emptyListText,
  emptyListIcon
}) => (
  <div className='selectable-list col-12'>
    <List>
      {list.length ? list.map((item, index) => (
        <Item
          key={`item-${index}`}
          onClick={() => { setSelectedIndex(item.id, item) }}
          className={classnames(
            'border border-whisper',
            { 'border-pagenta': item.id === selectedIndex }
          )}
        >
          <Avatar {...item} />
          <Name {...item} className='col-7' />
          <CreatedAt {...item} />
        </Item>
      )) : (
        <div>
          <div className='center'>
            <i className={`fa fa-${emptyListIcon} mb1`} style={{ fontSize: '5rem' }} />
          </div>
          <div className='center'>{emptyListText}</div>
        </div>
      )}
    </List>
  </div>
)

SelectableList.propTypes = {
  list: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  emptyListText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  emptyListIcon: PropTypes.string
}

SelectableList.defaultProps = {
  emptyListText: 'Lista vazia',
  emptyListIcon: 'frown-o'
}

export default SelectableList
