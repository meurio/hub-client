import React, { useContext } from 'react';
import {
  InputField,
  Success,
  Validators,
  Text,
  Header,
  Box,
  Flex,
  S3UploadField,
  Image
} from 'bonde-components';
import { Context as SessionContext } from 'bonde-core-tools';
import { useTranslation } from "react-i18next";
import CommunityForm from '../BaseForm';
import ButtonStyled from '../../../components/ButtonStyled';
const { isEmail } = Validators;

export const isValidFromEmail = (value: string): string | undefined => {
  const regex = /^[a-zà-úA-ZÀ-Ú0-9 ]+<(.*)>$/
  if (regex.test(value)) {
    const email = (value.match(regex) || [])[1]
    return isEmail('E-mail inválido')(email);
  } else {
    return 'Padrão inválido. Ex: Nome do remente <email@host.com>';
  }
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation(['community', 'app']);
  const { currentUser: user } = useContext(SessionContext);
  const hasPerm: boolean = user.hasAdminPermission();

  return (
    <CommunityForm
      formName={hasPerm ? 'SettingsIsAdmin' : 'Settings'}
      success={<Success message='UHU! Informações da comunidade atualizadas.' />}
    >
      {({ submitting, dirty, values }: any) => (
        <Box bg="white" p={6} w="50%">
          {hasPerm ? (
            <>
              <S3UploadField
                label={t('info.form.fields.image.label')}
                helpText={t('app:upload.information')}
                name='community.image'
                disabled={!hasPerm}
                signingUrl={process.env.REACT_APP_UPLOADS_URL}
              />
              <InputField
                name='community.name'
                label={t('info.form.fields.name.label')}
                placeholder={t('info.form.fields.name.placeholder')}
              />
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', alignItems: 'flex-end' }}>
              <Image
                boxSize={20}
                borderRadius="50%"
                src={values.community.image || `https://via.placeholder.com/100?text=${values.community.name.charAt(0)}`}
                alt={values.community.name}
              />
              <div style={{ marginLeft: '30px' }}>
                <Header.H3 style={{ marginBottom: '5px' }}>{values.community.name}</Header.H3>
                <Text>Para alterar logo, nome ou assinatura da sua comunidade, entre em contato com o suporte.</Text>
              </div>
            </div>
          )}
          <InputField
            name='community.description'
            label={t('info.form.fields.description.label')}
            placeholder={t('info.form.fields.description.placeholder')}
          />
          <InputField
            name='community.city'
            label={t('info.form.fields.city.label')}
            placeholder={t('info.form.fields.city.placeholder')}
          />
          <InputField
            name='community.email_template_from'
            label={t('info.form.fields.email_template_from.label')}
            helpText={`
              Escolha um email ao qual tenha fácil acesso. Ele só será usado pelo BONDE quando não for definido um email específico em uma ferramenta da sua comunidade.
              Preencha com: Nome do Remetente <nome@mail.com>
            `}
            placeholder={t('info.form.fields.email_template_from.placeholder')}
            validate={isValidFromEmail}
          />
          <InputField
            disabled={!hasPerm}
            name='community.signature.name'
            label='Assinatura da comunidade'
            placeholder='Nome da comunidade'
          />
          <InputField
            disabled={!hasPerm}
            name='community.signature.url'
            label='Site da comunidade'
            placeholder='Insira o link do site ou página oficial da sua comunidade'
          />
          <Flex direction="row" justify="flex-end">
            <ButtonStyled disabled={submitting || !dirty} type='submit'>{t('buttons.submit')}</ButtonStyled>
          </Flex>
        </Box>
      )}
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
