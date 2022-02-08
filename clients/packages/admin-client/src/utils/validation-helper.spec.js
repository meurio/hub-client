/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import * as validator from 'utils/validation-helper'

describe('client/utils/validation-helper', () => {
  describe('isValidEmail(email[:string:required])', () => {
    it('should validate is false e-mail name@provedor.com@', () => {
      expect(validator.isValidEmail('name@provedor.com@')).to.be.false
    })
  })

  describe('isValidDomain', () => {
    it('should return false for www..', () => {
      expect(validator.isValidDomain('www..')).to.be.false
    })
    it('should return false for www.foo.bar@.fooz.barz', () => {
      expect(validator.isValidDomain('www.foo.bar@.fooz.barz')).to.be.false
    })
    it('should return false for http://www.foo.bar.fooz.barz', () => {
      expect(validator.isValidDomain('http://www.foo.bar.com')).to.be.false
    })
    it('should return true for www.foo.bar.com', () => {
      expect(validator.isValidDomain('www.foo.bar.com')).to.be.true
    })
  })

  describe('isValidCodeGA', () => {
    it('should return false for FOO-123123123-123', () => {
      expect(validator.isValidCodeGA('FOO-123123123-123')).to.be.false
    })
    it('should return false for FOO-12345678-0', () => {
      expect(validator.isValidCodeGA('FOO-12345678-0')).to.be.false
    })
    it('should return false for FO-87654321-0', () => {
      expect(validator.isValidCodeGA('FOO-12345678-0')).to.be.false
    })
    it('should return true for UA-87654321-0', () => {
      expect(validator.isValidCodeGA('UA-87654321-0')).to.be.true
    })
    it('should return true for YT-87654321-0', () => {
      expect(validator.isValidCodeGA('YT-87654321-0')).to.be.true
    })
    it('should return true for MO-87654321-0', () => {
      expect(validator.isValidCodeGA('MO-87654321-0')).to.be.true
    })
    it('should return true for MO-87654321-0123123123', () => {
      expect(validator.isValidCodeGA('MO-87654321-0123123123')).to.be.true
    })
    it('should return true for G-AAAAAA00000', () => {
      expect(validator.isValidCodeGA('G-AAAAAA00000')).to.be.true
    })
  })

  describe('isValidFromEmail', () => {
    it('should return false for " <>"', () => {
      expect(validator.isValidFromEmail(' <>')).to.equal(false)
    })

    it('should return false for "I9 <>"', () => {
      expect(validator.isValidFromEmail('I9 <>')).to.equal(false)
    })

    it('should return false for "I9"', () => {
      expect(validator.isValidFromEmail('I9')).to.equal(false)
    })

    it('should return false for "I9 <contact@i9.org"', () => {
      expect(validator.isValidFromEmail('I9 <contact@i9.org')).to.equal(false)
    })

    it('should return false for "I9 contact@i9.org>"', () => {
      expect(validator.isValidFromEmail('I9 contact@i9.org>')).to.equal(false)
    })

    it('should return false for "I9 <contact@org>"', () => {
      expect(validator.isValidFromEmail('I9 <contact@org>')).to.equal(false)
    })

    it('should return false for "I9 <@i9.org>"', () => {
      expect(validator.isValidFromEmail('I9 <@i9.org>')).to.equal(false)
    })

    it('should return false for "I9 <contacti9.org>"', () => {
      expect(validator.isValidFromEmail('I9 <contacti9.org>')).to.equal(false)
    })

    it('should return true for "I9 <contact@i9.org>"', () => {
      expect(validator.isValidFromEmail('I9 <contact@i9.org>')).to.equal(true)
    })
  })

  describe('isValidPhone', () => {
    it('should return true for "+551199999-9999"', () => {
      expect(validator.isValidPhone('+551199999-9999')).to.equal(true)
    })
    it('should return true for "+5511999999999"', () => {
      expect(validator.isValidPhone('+5511999999999')).to.equal(true)
    })
    it('should return true for "+55119999-9999"', () => {
      expect(validator.isValidPhone('+55119999-9999')).to.equal(true)
    })
    it('should return true for "+551199999999"', () => {
      expect(validator.isValidPhone('+551199999999')).to.equal(true)
    })
    it('should return true for "1199999-9999"', () => {
      expect(validator.isValidPhone('1199999-9999')).to.equal(true)
    })
    it('should return true for "11999999999"', () => {
      expect(validator.isValidPhone('11999999999')).to.equal(true)
    })
    it('should return true for "119999-9999"', () => {
      expect(validator.isValidPhone('119999-9999')).to.equal(true)
    })
    it('should return true for "1199999999"', () => {
      expect(validator.isValidPhone('1199999999')).to.equal(true)
    })
    it('should return false for "119999-999"', () => {
      expect(validator.isValidPhone('119999-999')).to.equal(false)
    })
    it('should return false for "9999-9999"', () => {
      expect(validator.isValidPhone('9999-9999')).to.equal(false)
    })
    it('should return false for "99999-9999"', () => {
      expect(validator.isValidPhone('99999-9999')).to.equal(false)
    })
    it('should return false for "+551199999--9999"', () => {
      expect(validator.isValidPhone('+551199999--9999')).to.equal(false)
    })
    it('should return false for "+1199999-9999"', () => {
      expect(validator.isValidPhone('+1199999-9999')).to.equal(false)
    })
    it('should return false for "+99999-9999"', () => {
      expect(validator.isValidPhone('+99999-9999')).to.equal(false)
    })
    it('should return false for "+9999-9999"', () => {
      expect(validator.isValidPhone('+99999-9999')).to.equal(false)
    })
    it('should return false for "++551199999-9999"', () => {
      expect(validator.isValidPhone('++551199999-9999')).to.equal(false)
    })
    it('should return false for "++5511-99999-9999"', () => {
      expect(validator.isValidPhone('++5511-99999-9999')).to.equal(false)
    })
  })

  describe('isValidTargetPhone', () => {
    it('should return true for "Isabelle Maitê <+551199999-9999>"', () => {
      expect(validator.isValidTargetPhone('Isabelle Maitê <+551199999-9999>')).to.equal(true)
    })
    it('should return false for "Isabelle Maitê <+1199999-9999>"', () => {
      expect(validator.isValidPhone('Isabelle Maitê <+1199999-9999>')).to.equal(false)
    })
    it('should return false for "Foo Bar <123>"', () => {
      expect(validator.isValidTargetPhone('Foo Bar <123>')).to.equal(false)
    })
    it('should return false for "Foo Bar <foo@bar.com>"', () => {
      expect(validator.isValidTargetPhone('Foo Bar <foo@bar.com>')).to.equal(false)
    })
    it('should return false for " <>"', () => {
      expect(validator.isValidTargetPhone(' <>')).to.equal(false)
    })
    it('should return false for " <123>"', () => {
      expect(validator.isValidTargetPhone(' <123>')).to.equal(false)
    })
  })

  describe('isValidPhoneE164', () => {
    it('should return true for "+5511999999999 (9 digits)"', () => {
      expect(validator.isValidPhoneE164('+5511999999999')).to.equal(true)
    })
    it('should return true for "+551199999999 (8 digits)"', () => {
      expect(validator.isValidPhoneE164('+551199999999')).to.equal(true)
    })
    it('should return false for "+1199999999 (w/o DDI)"', () => {
      expect(validator.isValidPhoneE164('+1199999999')).to.equal(false)
    })
    it('should return false for "+5599999999 (w/o DDD)"', () => {
      expect(validator.isValidPhoneE164('+5599999999')).to.equal(false)
    })
    it('should return false for "+99999999 (w/o DDI and DDD)"', () => {
      expect(validator.isValidPhoneE164('+99999999')).to.equal(false)
    })
    it('should return false for "99999999 (only phone number)"', () => {
      expect(validator.isValidPhoneE164('99999999')).to.equal(false)
    })
    it('should return false for "5511999999999 (w/o +)"', () => {
      expect(validator.isValidPhoneE164('5511999999999')).to.equal(false)
    })
  })

  describe('isValidDate', () => {
    it('should return false for `2017-21-01`', () => {
      expect(validator.isValidDate({ year: '2017', month: '21', day: '01' })).to.be.false
    })
    it('should return false for `2017-01-40`', () => {
      expect(validator.isValidDate({ year: '2017', month: '01', day: '40' })).to.be.false
    })
    it('should return true for `2017-01-01`', () => {
      expect(validator.isValidDate({ year: '2017', month: '01', day: '01' })).to.be.true
    })
  })
})
