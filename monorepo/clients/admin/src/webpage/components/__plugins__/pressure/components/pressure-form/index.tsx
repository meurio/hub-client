import classnames from 'classnames'
import './index.scss';
import { getType } from "../utils";

const controlClassname = 'px3 py1';

const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem',
  outline: 'none'
}

const PressureForm = (properties: any): React.ReactElement => {
  const {
    subject,
    body,
    targetList,
    buttonColor,
    buttonText,
    children,
    widget,
    disabled,
    intl = {
      formatMessage: ({ defaultMessage }) => defaultMessage
    }
  } = properties
  const pressureType = getType(targetList) || undefined;

  // return <p>Pressure</p>;

  return (
    <form
      className='pressure-form'
    >
      <div
        className={classnames(
          'activist-form bg-white',
          !children ? 'rounded-bottom' : null
        )}
      >
        <div className='form bg-white rounded-bottom'>
          {pressureType === 'email' && (
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-email-id'>
                E-mail
              </label>
              <input
                id='pressure-sender-email-id'
                className='col-12'
                style={inputReset}
                type='email'
                placeholder={intl.formatMessage({
                  id: 'pressure-widget.components--pressure-form.email.placeholder',
                  defaultMessage: 'Insira seu e-mail'
                })}
              />
            </div>
          )}
          {pressureType === 'phone' && (
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-phone-id'>
                Telefone
              </label>
              <input
                id='pressure-sender-phone-id'
                className='col-12'
                style={inputReset}
                type='text'
                placeholder={intl.formatMessage({
                  id: 'pressure-widget.components--pressure-form.phone.placeholder',
                  defaultMessage: 'Insira seu telefone. Ex: +5511987654321'
                })}
              />
            </div>
          )}
          <div className={classnames('form-group', controlClassname)}>
            <label className='py1 gray' htmlFor='pressure-sender-firstname-id'>
              Nome
            </label>
            <input
              id='pressure-sender-firstname-id'
              className='col-12'
              style={inputReset}
              type='text'
              placeholder={intl.formatMessage({
                id: 'pressure-widget.components--pressure-form.name.placeholder',
                defaultMessage: 'Insira seu nome'
              })}
            />
          </div>
          <div className={classnames('form-group', controlClassname)}>
            <label className='py1 gray' htmlFor='pressure-sender-lastname-id'>
              Sobrenome
            </label>
            <input
              id='pressure-sender-lastname-id'
              className='col-12'
              style={inputReset}
              type='text'
              placeholder={intl.formatMessage({
                id: 'pressure-widget.components--pressure-form.lastname.placeholder',
                defaultMessage: 'Insira seu sobrenome'
              })}
            />
          </div>
          {
            !widget.settings.show_city || widget.settings.show_city !== 'city-true' ? null : (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-sender-city-id'>
                  Cidade
                </label>
                <input
                  className='col-12'
                  style={inputReset}
                  type='text'
                  placeholder={intl.formatMessage({
                    id: 'pressure-widget.components--pressure-form.city.placeholder',
                    defaultMessage: 'Insira sua cidade'
                  })}
                />
              </div>
            )
          }
          {pressureType === 'email' && (
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-subject-id'>
                Assunto
              </label>
              <input
                id='pressure-subject-id'
                className='col-12'
                style={inputReset}
                type='text'
                value={subject}
                disabled={disabled}
              />
            </div>
          )}
          {pressureType === 'email' && (
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-body-id'>
                Corpo do e-mail
              </label>
              <textarea
                id='pressure-body-id'
                className='col-12 mt1'
                style={{ ...inputReset, height: '7rem' }}
                value={body}
                disabled={disabled}
              />
            </div>
          )}
        </div>
        <div className='pt1 pb3 px3'>
          <button
            type='submit'
            className='btn caps white col-12 py2 rounded'
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {pressureType === 'phone' && (
        <div className='phone-calls'>
          <div className='how-it-works'>
            Como funciona?
            <ol>
              <li>
                Estamos ligando para o seu alvo
              </li>
              <li>
                Assim que alguém atender do lado de lá, vamos te ligar
              </li>
              <li>
                Quando você atender, conectamos as ligações
              </li>
              <li>
                Agora é com você!
              </li>
            </ol>
          </div>

          <div style={{ margin: '1rem 0', padding: '0 1rem' }}>
            <button
              type='button'
              className='btn-call full-width'
              style={{ backgroundColor: buttonColor }}
            >
              Encerrar e Compartilhar
            </button>
          </div>
        </div>
      )}
      {children}
    </form>
  )
}

export default PressureForm;
