import React from "react";
import {
  InputField,
  TextareaField,
  Card,
  Header,
  Validators,
} from "bonde-components";
import { useTranslation } from "react-i18next";
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
      {() => (
        <>


          <Card padding={{ x: 40, y: 30 }}>
            <Header.H3>
              {t("settings.autofire.title")}
            </Header.H3>
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
          </Card>
        </>
      )}
    </SettingsForm>
  );
};

export default AutofireForm;