/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import * as helper from 'utils/format-number-helper'

describe('client/utils/format-number-helper', () => {
  describe('currency', () => {
    it('should return a number in BRL currency format', () => {
      expect(helper.currency(1000)).to.be.equal('R$ 1.000,00')
    })
  })
  describe('currencyInt', () => {
    it('should return an interger number in BRL currency format', () => {
      expect(helper.currencyInt(1000.50)).to.be.equal('R$ 1.000')
    })
  })
  describe('number', () => {
    it('should return a number in brazilian number format', () => {
      expect(helper.number(1000)).to.be.equal('1.000')
    })
  })
  describe('float', () => {
    it('should return an integer number in float format', () => {
      expect(helper.float(1000)).to.be.equal('1000.00')
    })
  })
  describe('integer', () => {
    it('should return a float number in integer format', () => {
      expect(helper.integer(1000.5)).to.be.equal('1000')
    })
  })
})
