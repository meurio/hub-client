import React from "react";
import {
  InputField,
  TextareaField,
  Header,
  Validators
} from "bonde-components";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';
import ButtonStyled from "../../../../components/ButtonStyled";
import Panel from '../../../../components/Panel';
import { Widget } from "../../FetchWidgets";
import { noSpecialCharacters } from "../../../../services/utils";
import SettingsForm from '../SettingsForm';

type Props = {
  widget: Widget;
};

const { required, composeValidators, isEmail } = Validators;

const AutofireForm = ({ widget }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: widget.settings
      }}
    >
      {({ submitting, dirty }: any) => (
        <Container fluid style={{ width: "100%", padding: "0" }}>
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Panel>
                <div style={{ marginBottom: "25px" }}>
                  <Header.H3>
                    {t("settings.autofire.title")}
                  </Header.H3>
                </div>
                <InputField
                  label={t("settings.autofire.label.sendersName")}
                  name="settings.sender_name"
                  placeholder={t("settings.autofire.placeholder.sendersName")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required")),
                    noSpecialCharacters(
                      t("settings.autofire.validators.noSpecialCharacter")
                    )
                  )}
                />
                <InputField
                  label={t("settings.autofire.label.sendersEmail")}
                  name="settings.sender_email"
                  placeholder={t("settings.autofire.placeholder.sendersEmail")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required")),
                    isEmail(t("settings.autofire.validators.isEmail"))
                  )}
                />
                <InputField
                  label={t("settings.autofire.label.emailSubject")}
                  name="settings.email_subject"
                  placeholder={t("settings.autofire.placeholder.emailSubject")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required"))
                  )}
                />
                <TextareaField
                  label={t("settings.autofire.label.emailBody")}
                  name="settings.email_text"
                  placeholder={t("settings.autofire.placeholder.emailBody")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required"))
                  )}
                />
                <Row justify='end'>
                  <ButtonStyled disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</ButtonStyled>
                </Row>
              </Panel>
            </Col>
          </Row>
        </Container>
      )}
    </SettingsForm>
  );
};

export default AutofireForm;