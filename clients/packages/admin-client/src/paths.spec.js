import { expect } from 'chai'

import * as paths from 'paths'

describe('client/paths', () => {
  describe('#login', () => {
    it('should return the path', () => {
      expect(paths.login()).to.equal('/login')
    })
  })

  describe('#logout', () => {
    it('should return the path', () => {
      expect(paths.logout()).to.equal('/logout')
    })
  })

  describe('#mobilizations', () => {
    it('should return the path', () => {
      expect(paths.mobilizations()).to.equal('/mobilizations')
    })
  })

  describe('#mobilization', () => {
    it('should return the custom domain when it is set', () => {
      expect(paths.mobilization({custom_domain: 'meurio.org.br'}, 'reboo.org'))
        .to.equal('http://meurio.org.br')
    })

    it('should return the subdomain address when custom domain is not set', () => {
      expect(paths.mobilization({slug: 'meurio'}, 'reboo.org'))
        .to.equal('http://meurio.reboo.org')
    })

    it('should return the slug address when custom domain is set and app domain is staging', () => {
      expect(paths.mobilization({slug: 'meurio'}, 'reboo-staging.org'))
        .to.equal('http://meurio.reboo-staging.org')
    })
  })

  describe('#newMobilization', () => {
    it('should return the path', () => {
      expect(paths.newMobilization()).to.equal('/mobilizations/new')
    })
  })

  describe('#editMobilization', () => {
    it('should return the path', () => {
      expect(paths.editMobilization(1)).to.equal('/mobilizations/1/edit')
    })
  })

  describe('#createBlock', () => {
    it('should return the path', () => {
      const mobilization = { id: 1 }
      expect(paths.createBlock(mobilization)).to.equal('/mobilizations/1/blocks/create')
    })
  })
})
