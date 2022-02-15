import React from 'react';
import styled from '@emotion/styled';

type StylesProps = {
  headerFont: string;
  mainColor?: string;
};

const Styles = styled.div<StylesProps>`
  background-color: #fff;
  text-align: center;

  h2 {
    font-family: ${props => props.headerFont};
    font-weight: bold;
    background-color: ${props => props.mainColor};
    margin: 0;
    padding: 1rem;
    border-radius: 3px 3px 0 0;
  }

  .content {
    padding: 0 2rem 2rem;
    color: #000 !important;

    .description {
      padding: 1rem;
    }
    .text {
      font-size: 14px;
      margin-bottom: 1rem;
      color: gray !important;
    }
  }

  select {
    box-sizing: border-box;
    height: auto;
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  &:after,
  &:before {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
`;

const FormSelect = (props: any) => {
  const {
    widget: { settings },
    mobilization: { header_font },
    onChange,
    value,
    onSubmit,
  } = props;

  const mainColor = (settings && settings.main_color) || '#54d0f6';

  const {
    donation_value1,
    donation_value2,
    donation_value3,
    donation_value4,
    donation_value5,
  } = settings;

  return (
    <Styles mainColor={mainColor} headerFont={header_font}>
      <h2>
        OBA! Doação Realizada :)
        {/* <FormattedMessage
          id='widgets.components--donation.finish-post-donation.title-component'
          defaultMessage='OBA! Doação Realizada :)'
        /> */}
      </h2>
      <div className="content">
        <div className="description">
          <b>
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.improve-impact-question'
              defaultMessage='Quer aumentar seu impacto?'
            /> */}
            <p>Quer aumentar seu impacto?</p>
          </b>
          <p>Torne essa doação recorrente!</p>
          {/* <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-solution'
            defaultMessage='Torne essa doação recorrente!'
          /> */}
        </div>
        <p className="text">
          Sua contribuição será efetivada automaticamente uma vez ao mês,
          iniciando daqui há 31 dias.
          {/* <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-explanation'
            defaultMessage='Sua contribuição será efetivada automaticamente uma vez ao mês, iniciando daqui há 31 dias.'
          /> */}
        </p>
        <select onChange={onChange} value={value}>
          {donation_value1 && (
            <option value={1}>{`R$ ${donation_value1} /mês`}</option>
          )}
          {donation_value2 && (
            <option value={2}>{`R$ ${donation_value2} /mês`}</option>
          )}
          {donation_value3 && (
            <option value={3}>{`R$ ${donation_value3} /mês`}</option>
          )}
          {donation_value4 && (
            <option value={4}>{`R$ ${donation_value4} /mês`}</option>
          )}
          {donation_value5 && (
            <option value={5}>{`R$ ${donation_value5} /mês`}</option>
          )}
        </select>
        <div className="btn-group">
          <button
            id="donate-btn"
            onClick={() => onSubmit(value)}
            className="btn col-12 p2 mb2"
            style={{
              backgroundColor: mainColor,
              color: 'white',
            }}
          >
            APOIAR TODO MÊS
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.support-every-month'
              defaultMessage='APOIAR TODO MÊS'
            /> */}
          </button>
          <button
            id="not-now-btn"
            onClick={() => onSubmit()}
            className="btn col-12 p2"
          >
            AGORA NÃO
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.not-now'
              defaultMessage='AGORA NÃO'
            /> */}
          </button>
        </div>
      </div>
    </Styles>
  );
};

export default FormSelect;
