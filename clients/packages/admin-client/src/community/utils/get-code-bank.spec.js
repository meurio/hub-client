import React from 'react'
import { expect } from 'chai'
import getCodeBanks, { banks } from './get-code-banks'


describe('community/utils/get-code-banks', () => {
  it('should apply a filterReducer passed by param on list', () => {
    const filterReducer = (bank) => !isNaN(bank.code) && bank.code.length === 3
    const expected = banks.filter(filterReducer)

    expect(expected).to.deep.equal(getCodeBanks(filterReducer))
  })
})