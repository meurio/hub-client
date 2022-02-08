import { expect } from 'chai'
import { sanitize, slugify } from 'utils/string-helper'

describe('client/utils/string-helper', () => {
  describe('#sanitize', () => {
    it('should return a lowercase string that contains uppercase', () => {
      expect(sanitize('Foo')).to.be.equal('foo')
    })
    it('should return a sanitized string that contains white spaces and uppercase', () => {
      expect(sanitize('foo bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains white spaces', () => {
      expect(sanitize('Foo Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dash', () => {
      expect(sanitize('foo-bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dash and uppercase', () => {
      expect(sanitize('Foo-Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dot', () => {
      expect(sanitize('foo.bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dot and uppercase', () => {
      expect(sanitize('Foo.Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains underscore', () => {
      expect(sanitize('foo_bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains underscore and uppercase', () => {
      expect(sanitize('Foo_Bar')).to.be.equal('foobar')
    })
    it('should return a lowercase string that contains all uppercase', () => {
      expect(sanitize('FOOBAR')).to.be.equal('foobar')
    })
    it('should return sanitized that contains white space, dots, dashes and underscores', () => {
      expect(sanitize('foo bar  Hello.world--baz_Foo')).to.be.equal('foobarhelloworldbazfoo')
    })
  })

  describe('slugify', () => {
    it('should return slug of "Hello World"', () => {
      expect(slugify('Hello World')).to.be.equal('hello-world')
    })
    it('should return slug of "àlo brasil -"', () => {
      expect(slugify('àlo brasil -')).to.be.equal('alo-brasil')
    })
    it('should return slug of "hello -- world_dummy"', () => {
      expect(slugify('hello -- world_dummy')).to.be.equal('hello-world-dummy')
    })
  })
})
