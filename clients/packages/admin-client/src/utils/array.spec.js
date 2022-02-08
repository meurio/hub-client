import { expect } from 'chai'

import * as array from 'utils/array'

describe('client/utils/array', () => {
  describe('#distinct', () => {
    it('should return distinct values in totally different array', () => {
      const dummyArray = ['a', 1, 2, 'b', 'c']
      expect(dummyArray.filter(array.distinct)).to.have.members(dummyArray)
    })
    it('should return distinct values in repeat integer values array', () => {
      const dummyArray = ['a', 1, 1, 1, 2, 'b', 2, 'c']
      const expected = ['a', 1, 2, 'b', 'c']
      expect(dummyArray.filter(array.distinct)).to.have.members(expected)
    })
    it('should return distinct values in repeat string values array', () => {
      const dummyArray = ['a', 'a', 1, 1, 'a', 1, 2, 'b', 'b', 2, 'c', 'b']
      const expected = ['a', 1, 2, 'b', 'c']
      expect(dummyArray.filter(array.distinct)).to.have.members(expected)
    })
  })
})
