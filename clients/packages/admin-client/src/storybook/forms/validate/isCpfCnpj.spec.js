import { expect } from 'chai'
import isCpfCnpj, { message } from './isCpfCnpj'

describe('isCpfCnpj', () => {
  it('should return error cpf length', () => {
    const values = { cpf: '111.111.111-1' }
    expect(isCpfCnpj('cpf')(values, {}))
      .to.deep.equal({
        cpf: message.cpf.length
      })
  })

  it('should return error cpf invalid', () => {
    const values = { cpf: '672.209.252-64' }
    expect(isCpfCnpj('cpf')(values, {}))
      .to.deep.equal({
        cpf: message.cpf.invalid
      })
  })

  it('should return empty error cpf valid', () => {
    const values = { cpf: '672.209.252-63' }
    expect(isCpfCnpj('cpf')(values, {}))
      .to.deep.equal({})
  })

  it('should return error cnpj length', () => {
    const values = { cnpj: '95.875.662/0001-1' }
    expect(isCpfCnpj('cnpj')(values, {}))
      .to.deep.equal({
        cnpj: message.cnpj.length
      })
  })

  it('should return error cnpj invalid', () => {
    const values = { cnpj: '95.875.662/0001-12' }
    expect(isCpfCnpj('cnpj')(values, {}))
      .to.deep.equal({
        cnpj: message.cnpj.invalid
      })
  })

  it('should return empty error cnpj valid', () => {
    const values = { cnpj: '95.875.662/0001-11' }
    expect(isCpfCnpj('cnpj')(values, {}))
      .to.deep.equal({})
  })
})
