import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { FormattedMessage, intlShape } from 'react-intl';

import { slugUpdatedMessage } from '../../utils/notifications';
import { slugify } from '../../utils/string-helper';
import { SettingsForm } from '../../ux/components';
import { Code } from '../../components/markdown';
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  FormSelect,
  RadioGroup,
  Radio,
  HelpBlock,
  UploadImageField,
} from '../../components/forms';
import * as paths from '../../paths';

export const MobilizationBasicsForm = ({
  fields: { name, slug, goal, favicon, language, subthemes },
  floatSubmit,
  intl,
  ...formProps
}) => {
  const ComponentForm = floatSubmit ? SettingsForm : FormRedux;
  const {
    location: { pathname },
  } = formProps;
  const isNewMobilizationPath = pathname === paths.newMobilization();

  return (
    <ComponentForm {...formProps}>
      <FormGroup
        {...name}
        controlId="name"
        onBlur={(event) => {
          if (!slug.value) slug.onChange(slugify(name.value));
          name.onBlur(event);
        }}
      >
        <ControlLabel maxLength={100}>
          <FormattedMessage
            id="mobilizations.components--basics-form.name.label"
            defaultMessage="Nome"
          />
        </ControlLabel>
        <FormControl
          type="text"
          placeholder={intl.formatMessage({
            id: 'mobilizations.components--basics-form.name.placeholder',
            defaultMessage:
              'Ex: Pela criação de uma delegacia de desaparecidos',
          })}
          maxLength={100}
        />
      </FormGroup>
      <FormGroup controlId="goal" {...goal}>
        <ControlLabel maxLength={500}>
          <FormattedMessage
            id="mobilizations.components--basics-form.goal.label"
            defaultMessage="Objetivo"
          />
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder={intl.formatMessage({
            id: 'mobilizations.components--basics-form.goal.placeholder',
            defaultMessage:
              'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
          })}
          maxLength={500}
          rows="4"
        />
      </FormGroup>
      <FormGroup controlId="subthemes" {...subthemes}>
        <ControlLabel>
          {/* <FormattedMessage
            id="mobilizations.components--basics-form.goal.label"
            defaultMessage="Temas"
          /> */}
          Temas
        </ControlLabel>
        <FormSelect
          maxLength={3}
          options={[
            {
              "value": 1,
              "label": "Criança e Adolescente"
            },
            {
              "value": 2,
              "label": "Gênero"
            },
            {
              "value": 3,
              "label": "Indígenas"
            },
            {
              "value": 4,
              "label": "Quilombolas e Povos Tradicionais"
            },
            {
              "value": 5,
              "label": "Imigrantes e Refugiados"
            },
            {
              "value": 6,
              "label": "Justiça racial"
            },
            {
              "value": 7,
              "label": "LGBTQIA+"
            },
            {
              "value": 8,
              "label": "Terceira Idade"
            },
            {
              "value": 9,
              "label": "Prevenção à violência policial"
            },
            {
              "value": 10,
              "label": "Maternidade e Famílias"
            },
            {
              "value": 11,
              "label": "Corrupção e Transparência"
            },
            {
              "value": 12,
              "label": "Mal Uso dos Recursos Públicos"
            },
            {
              "value": 13,
              "label": "Eleições"
            },
            {
              "value": 14,
              "label": "Cultura e Artes"
            },
            {
              "value": 15,
              "label": "Infraestrutura e Patrimônio"
            },
            {
              "value": 16,
              "label": "Parques e Praças"
            },
            {
              "value": 17,
              "label": "Transportes"
            },
            {
              "value": 18,
              "label": "Moradia e Habitação"
            },
            {
              "value": 19,
              "label": "Bikes, skates e afins"
            },
            {
              "value": 20,
              "label": "Educação"
            },
            {
              "value": 21,
              "label": "Saúde"
            },
            {
              "value": 22,
              "label": "Segurança Pública"
            },
            {
              "value": 23,
              "label": "Trabalho e Renda"
            },
            {
              "value": 24,
              "label": "Combate à Desigualdade"
            },
            {
              "value": 25,
              "label": "Covid"
            },
            {
              "value": 26,
              "label": "Direito do Consumidor"
            },
            {
              "value": 27,
              "label": "Água e Saneamento"
            },
            {
              "value": 28,
              "label": "Meio Ambiente e Clima"
            }
          ]}
        />
        {/* <FormControl
          componentClass="textarea"
          placeholder={intl.formatMessage({
            id: 'mobilizations.components--basics-form.goal.placeholder',
            defaultMessage:
              'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
          })}
          maxLength={500}
          rows="4"
        /> */}
      </FormGroup>
      <FormGroup {...language} controlId="language">
        <ControlLabel>
          <FormattedMessage
            id="mobilizations.components--basics-form.language.label"
            defaultMessage="Idioma padrão da página"
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id="mobilizations.components--basics-form.language.helper"
            defaultMessage="Defina o idioma padrão que os textos do BONDE aparecem na sua página."
          />
        </HelpBlock>
        <RadioGroup>
          <Radio value="pt-BR">
            <FormattedMessage
              id="mobilizations.components--basics-form.language.ptBR"
              defaultMessage="Português"
            />
          </Radio>
          <Radio value="es">
            <FormattedMessage
              id="mobilizations.components--basics-form.language.es"
              defaultMessage="Espanhol"
            />
          </Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup
        {...slug}
        controlId="slug"
        className={classnames({ hide: isNewMobilizationPath })}
      >
        <ControlLabel maxLength={63}>
          <FormattedMessage
            id="mobilizations.components--basics-form.slug.label"
            defaultMessage="Identificador Único"
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id="mobilizations.components--basics-form.slug.helper-text"
            defaultMessage={
              'O valor desse campo é utilizado para referenciar a mobilização no domínio do BONDE, ' +
              'por exemplo: {example}'
            }
            values={{
              example: <Code bordered>www.123-nome-da-mob.bonde.org</Code>,
            }}
          />
        </HelpBlock>
        <FormControl
          type={isNewMobilizationPath ? 'hidden' : 'text'}
          maxLength={63}
          placeholder={intl.formatMessage({
            id: 'mobilizations.components--basics-form.slug.helper-example',
            defaultMessage: 'Ex: 123-nome-da-mob',
          })}
        />
      </FormGroup>
      <FormGroup
        {...favicon}
        controlId="favicon"
        className={classnames({ hide: isNewMobilizationPath })}
      >
        <ControlLabel>Favicon</ControlLabel>
        <UploadImageField
          signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`}
          type={isNewMobilizationPath ? 'hidden' : 'text'}
        />
      </FormGroup>
    </ComponentForm>
  );
};

export const fields = [
  'name',
  'slug',
  'goal',
  'favicon',
  'community_id',
  'language',
  'subthemes'
];

export const validate = (values, { intl }) => {
  const errors = {};
  if (!values.name) {
    errors.name = intl.formatMessage({
      id: 'mobilizations.components--basics-form.name.validation.required',
      defaultMessage: 'Insira o nome da mobilização',
    });
  } else if (values.name.length > 100) {
    errors.name = intl.formatMessage({
      id: 'mobilizations.components--basics-form.name.validation.max-length',
      defaultMessage: 'Seu título está muito longo!',
    });
  }

  if (!values.goal) {
    errors.goal = intl.formatMessage({
      id: 'mobilizations.components--basics-form.goal.validation.required',
      defaultMessage: 'Insira o objetivo da mobilização',
    });
  } else if (values.goal.length > 500) {
    errors.goal = intl.formatMessage({
      id: 'mobilizations.components--basics-form.goal.validation.max-length',
      defaultMessage: 'O limite de caracteres foi atingido.',
    });
  }

  if (values.slug && values.slug.length > 63) {
    errors.slug = intl.formatMessage({
      id: 'mobilizations.components--basics-form.slug.validation.max-length',
      defaultMessage: 'Seu identificador único está muito longo!',
    });
  }

  return errors;
};

const mapActionsCreators = (dispatch, props) => ({
  ...props,
  submit: (values) => {
    props
      .submit(values)
      .then((mobilization) => {
        const {
          mobilization: { slug: slugInitial },
          onFinishSubmit
        } = props;
        const { slug: slugResult } = mobilization;
        const hasSlugUpdated = slugInitial && slugInitial !== slugResult;
        hasSlugUpdated &&
          toast.sucess(slugUpdatedMessage(props.intl).message, {
            autoClose: 5000,
            hideProgressBar: true,
          });
        onFinishSubmit && onFinishSubmit(mobilization);
      })
      .catch((errors) => {
        dispatch({
          errors,
          type: 'redux-form/STOP_SUBMIT',
          form: props.formName,
        });
      });
  },
});

MobilizationBasicsForm.propTypes = {
  intl: intlShape.isRequired,
};

export default connect(undefined, mapActionsCreators)(MobilizationBasicsForm);
