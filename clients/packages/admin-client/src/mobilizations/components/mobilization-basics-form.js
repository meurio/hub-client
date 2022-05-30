import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { FormattedMessage, intlShape } from 'react-intl';
import { useQuery, gql } from 'bonde-core-tools';

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
// TODO: Remove this
import Select from 'react-select';

const FETCH_SUBTHEMES_QUERY = gql`
  query {
    subthemes {
      id
      label
      theme {
        id
        label
      }
    }
  }
`;

class ThemeField extends React.Component {
  render() {
    const {
      subthemesField,
      subthemes,
      value,
      onChange
    } = this.props;

    if (subthemesField.value && subthemesField.value.length === 3) {
      // Seleciona temas relacionados
      const themes = subthemesField.value.map((id) => {
        return subthemes.filter((subtheme) => subtheme.id === id)[0].theme;
      });
      // Remove duplicados
      const filtered = themes.filter(
        (este, i) => themes.findIndex(({ id }) => id === este.id) === i);

      return (
        <Select
          getValue={() => filtered.filter(({ id }) => value === id)[0]}
          onChange={(item) => onChange(item.value)}
          options={filtered.map(({ id, label }) => ({ value: id, label }))}
        />
      );
    }

    return null;
  }
}

export const MobilizationBasicsForm = ({
  fields: { name, slug, goal, favicon, language, subthemes, theme_id },
  floatSubmit,
  intl,
  ...formProps
}) => {
  const { data, loading, error } = useQuery(FETCH_SUBTHEMES_QUERY);

  if (error) return <p>Houve um problema ao tentar carregar temas</p>;
  if (loading) return <p>Carregando temas</p>;

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
        <ControlLabel>Temas</ControlLabel>
        <FormSelect
          maxLength={3}
          options={data.subthemes.map((subtheme) => ({ value: subtheme.id, label: subtheme.label }))}
        />
        <ThemeField
          {...theme_id}
          subthemesField={subthemes}
          subthemes={data.subthemes}
        />
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
  'subthemes',
  'theme_id'
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
