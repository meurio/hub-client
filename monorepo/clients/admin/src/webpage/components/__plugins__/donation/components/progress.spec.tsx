import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Progress from './progress'

describe('client/mobrender-v2/widgets/donation/progress', () => {
  let progress

  it('should render without crash', () => {
    progress = shallow(<Progress value={50} />)
    // eslint-disable-next-line
    expect(progress).to.be.ok
  })

  it('should render a <div> element with `progress` class', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('.progress')).to.have.length(1)
  })

  it('should render the .progress element as `max` prop with 100 by default', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('.progress').props().max).to.be.equal(100)
  })

  it('should render a .progress-value element inside of .progress element', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('.progress .progress-value')).to.have.length(1)
  })

  it('should render .progress-value element with `fillColor` with turquoise by default', () => {
    const turquoise = 'hsl(171, 100%, 41%)'
    progress = shallow(<Progress value={50} />)
    expect(progress.find('.progress-value').props().style.backgroundColor).to.be.equal(turquoise)
  })

  it('should render .progress-value element with `fillColor` properly', () => {
    const color = '#f00'
    progress = shallow(<Progress value={50} fillColor={color} />)
    expect(progress.find('.progress-value').props().style.backgroundColor).to.be.equal(color)
  })

  it('should render the `valueTopLeft` prop value in .progress-top-left properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueTopLeft={text} />)
    expect(progress.find('.progress-top > .progress-top-left').text()).to.be.equal(text)
  })

  it('should render the `valueTopCenter` prop value in .progress-top-center properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueTopCenter={text} />)
    expect(progress.find('.progress-top > .progress-top-center').text()).to.be.equal(text)
  })

  it('should render the `valueTopRight` prop value in .progress-top-right properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueTopRight={text} />)
    expect(progress.find('.progress-top > .progress-top-right').text()).to.be.equal(text)
  })

  it('should render the `valueBottomLeft` prop value in .progress-bottom-left properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueBottomLeft={text} />)
    expect(progress.find('.progress-bottom > .progress-bottom-left').text()).to.be.equal(text)
  })

  it('should render the `valueBottomCenter` prop value in .progress-bottom-center properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueBottomCenter={text} />)
    expect(progress.find('.progress-bottom > .progress-bottom-center').text()).to.be.equal(text)
  })

  it('should render the `valueBottomRight` prop value in .progress-bottom-right properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueBottomRight={text} />)
    expect(progress.find('.progress-bottom > .progress-bottom-right').text()).to.be.equal(text)
  })
})
