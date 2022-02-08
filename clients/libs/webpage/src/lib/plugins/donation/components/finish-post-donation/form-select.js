import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

const FormSelect = (props) => {
  const {
    widget: { settings },
    mobilization: { header_font },
    onChange,
    value,
    onSubmit
  } = props

  const mainColor = (settings && settings.main_color) || '#54d0f6'

  const { donation_value1, donation_value2, donation_value3, donation_value4, donation_value5 } = settings

  return (
    <div className='donation center clearfix'>
      <h2
        className='p2 m0 white rounded-top'
        style={{ fontFamily: header_font, backgroundColor: mainColor, fontWeight: 'bold' }}
      >
        <FormattedMessage
          id='widgets.components--donation.finish-post-donation.title-component'
          defaultMessage='OBA! Doação Realizada :)'
        />
      </h2>
      <div
        className="p3"
        style={{ paddingTop: 0 }}
      >
        <div className='center clearfix p2'>
          <b>
            <FormattedMessage
              id='widgets.components--donation.finish-post-donation.improve-impact-question'
              defaultMessage='Quer aumentar seu impacto?'
            />
          </b><br />
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-solution'
            defaultMessage='Torne essa doação recorrente!'
          />
        </div>
        <div
          className='center clearfix mb2'
          style={{
            fontSize: 14,
            color: 'gray'
          }}
        >
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-explanation'
            defaultMessage='Sua contribuição será efetivada automaticamente uma vez ao mês, iniciando daqui há 31 dias.'
          />
        </div>
        <div className='center clearfix'>
          <select
            className='select mb2'
            onChange={onChange}
            value={value}
          >
            {donation_value1 && <FormattedMessage
                id='widgets.components--donation.finish-post-donation.value-list'
                defaultMessage='R$ {value} / mês'
                values={{
                  value: donation_value1
                }}
              >
                {(message) => <option value={1}>{message}</option>}
              </FormattedMessage>}
            {donation_value2 && <FormattedMessage
                id='widgets.components--donation.finish-post-donation.value-list'
                defaultMessage='R$ {value} / mês'
                values={{
                  value: donation_value2
                }}
              >
                {(message) => <option value={2}>{message}</option>}
              </FormattedMessage>}
            {donation_value3 && <FormattedMessage
                id='widgets.components--donation.finish-post-donation.value-list'
                defaultMessage='R$ {value} / mês'
                values={{
                  value: donation_value3
                }}
              >
                {(message) => <option value={3}>{message}</option>}
              </FormattedMessage>}
            {donation_value4 && <FormattedMessage
                id='widgets.components--donation.finish-post-donation.value-list'
                defaultMessage='R$ {value} / mês'
                values={{
                  value: donation_value4
                }}
              >
                {(message) => <option value={4}>{message}</option>}
              </FormattedMessage>}
            {donation_value5 && <FormattedMessage
                id='widgets.components--donation.finish-post-donation.value-list'
                defaultMessage='R$ {value} / mês'
                values={{
                  value: donation_value5
                }}
              >
                {(message) => <option value={5}>{message}</option>}
              </FormattedMessage>}
          </select>
          <button
            id="donate-btn"
            onClick={() => onSubmit(value)}
            className="btn col-12 p2 mb2"
            style={{
              backgroundColor: mainColor,
              color: 'white'
            }}
          >
            <FormattedMessage
              id='widgets.components--donation.finish-post-donation.support-every-month'
              defaultMessage='APOIAR TODO MÊS'
            />
          </button>
          <button
            id="not-now-btn"
            onClick={() => onSubmit()}
            className="btn col-12 p2"
          >
            <FormattedMessage
              id='widgets.components--donation.finish-post-donation.not-now'
              defaultMessage='AGORA NÃO'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

FormSelect.propTypes = {
  mobilization: PropTypes.shape({
    header_font: PropTypes.string
  }),
  widget: PropTypes.shape({
    settings: PropTypes.any
  }),
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default FormSelect