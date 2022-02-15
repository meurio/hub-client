import React, { useState } from 'react';
import { Form, Field } from 'react-final-form'
import PlipDetails from '../components/PlipDetails';
import styles from './PlipForm.module.css';
import LGPD from '../../../components/ux/LGPD';

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFillWidget: any;
  widget: any;
  children: any;
};

export interface PlipFormState {
  data: any[];
  submited: boolean;
}

const required = (field) => {
  return !!field ? undefined : "não pode ficar em branco"
};

const mustBeNumber = (whatsapp) => (isNaN(whatsapp) && whatsapp != null ? "Digite apenas números" : undefined);

const minValue = (min) => (whatsapp) =>
  isNaN(whatsapp) || whatsapp.length >= min ? undefined : `Digite o número com o DDD`;

const composeValidators = (...validators) => (field) =>
  validators.reduce((error, validator) => error || validator(field), undefined);

const PlipForm = ({ asyncFillWidget, widget }: Props): JSX.Element => {
  const [pdf, setPdf] = useState<PlipFormState>({ data: [], submited: false });

  let bgcolor = 'rgba(0,0,0,0.25)'
  if (widget.settings && widget.settings.main_color) {
    bgcolor = widget.settings.main_color
  };

  let title = 'Clique para configurar seu formulário...'
  if (widget.settings && widget.settings.call_to_action){
    title = widget.settings.call_to_action
  };

  return (
    <div className={styles.PlipForm} style={{ backgroundColor: bgcolor }}>
      {pdf.submited ? <PlipDetails pdf={pdf} /> : <Form
        onSubmit={(values) => {
          asyncFillWidget({ ...values, widget_id: widget.id })
            .then(({ create_plip }: any) => {
              // setPdf(true);
              setPdf({ data: create_plip, submited: true });
            })
            .catch((err: any) => {
              console.error('PlipPlugin: ', err);
            });
        }}

        render={(renderProps) => {
          const {
            handleSubmit,
          } = renderProps;

          return (
            <form onSubmit={handleSubmit} target="target_iframe" method="POST">
              <h2>{title}</h2>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Nome completo*</label>
                    <input {...input} type="text" placeholder="Insira seu nome" />
                    {meta.error && meta.touched && <span>Nome completo {meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field name="email" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Email* </label>
                    <input {...input} type="text" placeholder="Insira seu e-mail" />
                    {meta.error && meta.touched && <span>Email {meta.error}</span>}
                  </div>
            )}
              </Field>

              <Field name="state" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Estado* </label>
                    <select {...input}>
                      <option>Selecione o Estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="AP">Amapá</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                      <option value="EX">Estrangeiro</option>
                    </select>
                    {meta.error && meta.touched && <span>Estado {meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="whatsapp"
                validate={composeValidators(mustBeNumber, minValue(11))}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Whatsapp </label>
                    <input {...input} type="text" placeholder="não se esqueça do DDD!" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="signature_quantity" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Quantidade de Assinaturas* </label>
                    <select {...input}>
                      <option>selecione a quantidade de assinaturas</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    {meta.error && meta.touched && <span>Quantidade de assinaturas {meta.error}</span>}
                  </div>
                )}
              </Field>
              <button type="submit" value="submit">{(widget.settings && widget.settings.button_text) || 'Enviar'}</button>

              <LGPD />
            </form>
          )
        }}
      >
      </Form>
      }
    </div>
  )
};

export default PlipForm;
