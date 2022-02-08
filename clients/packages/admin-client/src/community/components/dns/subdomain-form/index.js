import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  FormRedux,
  FormGroup,
  FormControl,
  ControlLabel,
  FormDropdown
} from 'components/forms'
import { Button } from 'ux/components'

if (require('exenv').canUseDOM) require('./styles.scss')

const recordTypeList = ['A', 'AAAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SPF', 'SRV', 'TXT']

const Form = ({
  dnsHostedZone,
  fields: {
    name, record_type:
    recordType,
    value
  },
  intl,
  ...formProps
}) => (
  <FormRedux nosubmit {...formProps}>
    <div className='form--dns-record'>
      <div className='fields--dns-record'>
        <div className='col col-6'>
          <FormGroup {...name}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.name.label'
                defaultMessage='Nome'
              />
            </ControlLabel>
            <FormControl
              type='text'
              placeholder={intl.formatMessage({
                id: 'community.components--subdomain.name.placeholder',
                defaultMessage: 'subdominio'
              })}
              addonText={`.${dnsHostedZone.domain_name}`}
            />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup {...recordType}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.record-type.label'
                defaultMessage='Tipo'
              />
            </ControlLabel>
            <FormDropdown>
              {recordTypeList.map(record => <option key={record} value={record}>{record}</option>)}
            </FormDropdown>
          </FormGroup>
        </div>
        <div className='col col-4'>
          <FormGroup {...value}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.value.label'
                defaultMessage='Valor'
              />
            </ControlLabel>
            <FormControl
              componentClass='textarea'
              type='text'
              rows='5'
              placeholder={intl.formatMessage({
                id: 'community.components--subdomain.value.placeholder',
                defaultMessage:
`redirecionamento.dominio.com
ou
servidor-01.dominio.com
servidor-02.dominio.com
servidor-03.dominio.com`
              })}
            />
          </FormGroup>
        </div>
        <div className='clearfix' />
      </div>
      <Button type='submit'>
        <FormattedMessage
          id='community.components--subdomain.form.submit-button'
          defaultMessage='Adicionar'
        />
      </Button>
    </div>
  </FormRedux>
)

export default injectIntl(Form)
