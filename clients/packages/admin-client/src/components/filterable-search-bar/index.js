import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setFilterableSearchBarList } from './actions'

export class FilterableSearchBar extends Component {
  componentDidMount () {
    const { dispatch, list } = this.props
    dispatch(setFilterableSearchBarList(list))
  }

  render () {
    const { list, dispatch, placeholder } = this.props
    return (
      <div
        className='bg-white rounded-top border-only-bottom border-whisper flex flex-wrap'
        style={{ padding: '1.6rem 2rem' }}
      >
        <i className='fa fa-search black pt1' style={{ fontSize: '1.1rem' }} />
        <input
          className='input border-none col-11 inline-block mb0'
          placeholder={placeholder}
          style={{ fontSize: '1.2rem' }}
          onChange={input => {
            dispatch(setFilterableSearchBarList(
              list.filter(item => item.name.match(new RegExp(input.target.value, 'gi')))
            ))
          }}
        />
      </div>
    )
  }
}

export default connect()(FilterableSearchBar)
