import React from 'react';
import { InputField, Tooltip, Success, Validators, Text, Header } from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';
import UploadField, { Image } from "../../../components/UploadFile";
import CommunityForm from '../BaseForm';
import ButtonStyled from '../../../components/ButtonStyled';
import Panel from '../../../components/Panel';

const { isEmail } = Validators;

export const isValidFromEmail = (value: any): string | undefined => {
  const regex = /^[a-zà-úA-ZÀ-Ú0-9 ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isEmail('E-mail inválido')(email);
  } else {
    return 'Padrão inválido. Ex: Nome do remente <email@host.com>';
  }
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation('community');
  const { user } = useSession();

  return (
    <CommunityForm
      formName={user.isAdmin ? 'SettingsIsAdmin' : 'Settings'}
      success={<Success message='UHU! Informações da comunidade atualizadas.' />}
    >
      {({ submitting, dirty, values }: any) => (
        <Container fluid style={{ width: "100%", padding: "0" }}>
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Panel>
                {user.isAdmin ? (
                  <>
                    <UploadField
                      label={t('info.form.fields.image.label')}
                      name='community.image'
                      disabled={!user.isAdmin}
                    />
                    <InputField
                      name='community.name'
                      label={t('info.form.fields.name.label')}
                      placeholder={t('info.form.fields.name.placeholder')}
                    />
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', alignItems: 'flex-end' }}>
                    <Image scale={0.7}>
                      <img
                        src={values.community.image || `https://via.placeholder.com/100?text=${values.community.name.charAt(0)}`}
                        alt={values.community.name}
                      />
                    </Image>
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
                  label={(
                    <Tooltip
                      label={t('info.form.fields.email_template_from.label')}
                      info={(
                        <>
                          <p>{`Escolha um email ao qual tenha fácil acesso. Ele só será usado pelo BONDE quando não for definido um email específico em uma ferramenta da sua comunidade.`}</p>
                          <p>{`Preencha com `}<b>{`Nome do Remetente <nome@mail.com>`}</b></p>
                        </>
                      )}
                    />
                  )}
                  placeholder={t('info.form.fields.email_template_from.placeholder')}
                  validate={isValidFromEmail}
                />
                <InputField
                  disabled={!user.isAdmin}
                  name='community.signature.name'
                  label='Assinatura da comunidade'
                  placeholder='Nome da comunidade'
                />
                <InputField
                  disabled={!user.isAdmin}
                  name='community.signature.url'
                  label='Site da comunidade'
                  placeholder='Insira o link do site ou página oficial da sua comunidade'
                />
                <Row justify='end'>
                  <ButtonStyled disabled={submitting || !dirty} type='submit'>{t('buttons.submit')}</ButtonStyled>
                </Row>
              </Panel>
            </Col>
          </Row>
        </Container>
      )}
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
