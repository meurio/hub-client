import React, { useContext } from 'react';
import { Form } from 'bonde-components/form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Context as SessionContext } from 'bonde-core-tools';
import {
  InputControl,
  TextareaControl,
  Control,
  FormLabel,
  Radio,
  Submit
} from '../../../form';
import { HelpBlock } from '../../../components/forms';
import { asyncAddMobilization } from '../../../mobrender/redux/action-creators';
import { useHistory } from 'react-router-dom';
import { useUpdateCache } from '../../sidebar/Provider';

const validate = ({ intl }) => (values) => {
  const errors: any = {};
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

const CreateForm: React.FC<any> = ({ intl, create }) => {
  const history = useHistory();
  const { community }: any = useContext(SessionContext)
  const updateCache = useUpdateCache();

  const submit = async (values) => {
    try {
      const mobilization = await create(values);
      updateCache(mobilization);
      history.push(`/mobilizations/${mobilization.id}/templates/choose`);
    } catch(err) {
      console.log("err", err);
      throw Error("Invalid submit!");
    }
  }

  return (
    <Form
      onSubmit={submit}
      validate={validate({ intl })}
      initialValues={{
        language: 'pt-BR',
        community_id: community.id
      }}
    >
      {({ handleSubmit, submitting }) => (
        <form className="bg-white form-redux form" onSubmit={handleSubmit}>
          <InputControl
            name="name"
            maxLength={100}
            label={
              <FormattedMessage
                id="mobilizations.components--basics-form.name.label"
                defaultMessage="Nome"
              />
            }
            placeholder={intl?.formatMessage({
              id: 'mobilizations.components--basics-form.name.placeholder',
              defaultMessage:
                'Ex: Pela criação de uma delegacia de desaparecidos',
            })}
          />
          <TextareaControl
            name="goal"
            rows={4}
            maxLength={500}
            label={
              <FormattedMessage
                id="mobilizations.components--basics-form.goal.label"
                defaultMessage="Objetivo"
              />
            }
            placeholder={intl.formatMessage({
              id: 'mobilizations.components--basics-form.goal.placeholder',
              defaultMessage:
                'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
            })}
          />
          <Control>
            <FormLabel name='language'>
              <FormattedMessage
                id="mobilizations.components--basics-form.language.label"
                defaultMessage="Idioma padrão da página"
              />
            </FormLabel>
            <HelpBlock>
              <FormattedMessage
                id="mobilizations.components--basics-form.language.helper"
                defaultMessage="Defina o idioma padrão que os textos do BONDE aparecem na sua página."
              />
            </HelpBlock>
            <div className='mt1'>
              <Radio name="language" value='pt-BR'>
                <FormattedMessage
                  id="mobilizations.components--basics-form.language.ptBR"
                  defaultMessage="Português"
                />
              </Radio>
              <Radio name="language" value='es'>
                <FormattedMessage
                  id="mobilizations.components--basics-form.language.es"
                  defaultMessage="Espanhol"
                />
              </Radio>
            </div>
          </Control>
          <Submit>
            {submitting
              ? intl.formatMessage({
                id: 'components--control-buttons.input.value.saving',
                defaultMessage: 'Salvando...'
              })
              : intl.formatMessage({
                id: 'components--control-buttons.input.value.default',
                defaultMessage: 'Continuar'
              })}
          </Submit>
        </form>
      )}
    </Form>
  );
}

export default injectIntl(connect(undefined, {
  create: asyncAddMobilization
})(CreateForm));