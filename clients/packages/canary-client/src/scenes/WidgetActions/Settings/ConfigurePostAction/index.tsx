import React from "react";
import { useTranslation } from "react-i18next";
import { Widget } from "../../FetchWidgets";
import SpyField from "../../../../components/SpyField";
import RadioField, { Radio } from "../../../../components/Radio";
import Panel from "../../../../components/Panel";
import SettingsForm from '../SettingsForm';
import DefaultPostAction from "./DefaultPostAction";
import RichInputField from "./RichInputField";
import { Header } from "bonde-components"

type Props = {
  widget: Widget;
};

const ConfigurePostAction = ({ widget }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  // Parse older finish messages saved like text
  const finish_message = !!widget.settings.finish_message && typeof widget.settings.finish_message === 'string'
    ? JSON.parse(widget.settings.finish_message)
    : widget.settings.finish_message
    ;
  const finish_message_type = widget.settings.finish_message_type || 'share';

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          ...widget.settings,
          finish_message,
          finish_message_type
        }
      }}
    >
      {() => (
        <Panel>
          <Header.H3>Pós-ação</Header.H3>
          <RadioField name='settings.finish_message_type' label={t("settings.finish.title")}>
            <Radio value='share'>
              {t("settings.finish.radio.share")}
            </Radio>
            <Radio value='custom'>
              {t("settings.finish.radio.custom")}
            </Radio>
          </RadioField>

          <SpyField field='settings.finish_message_type'>
            {({ value }: any) => value === 'share'
              ? <DefaultPostAction />
              : <RichInputField name='settings.finish_message' />
            }
          </SpyField>
        </Panel>
      )}
    </SettingsForm>
  );
};

export default ConfigurePostAction;
