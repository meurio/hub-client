import React from 'react';
import { InputField, Tooltip, Header } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import Panel from '../../../../components/Panel';
import ColorField from '../../../../components/ColorField';
import SettingsForm from '../SettingsForm';
import RadioField, { Radio } from '../../../../components/Radio';

const AdjustsFields = ({ widget }: any) => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          show_state: "n",
          ...widget.settings
        }
      }}
    >
      {() => (
        <Panel>
          <Header.H3>
            {t("settings.adjusts.title")}
          </Header.H3>
          <InputField
            name='settings.call_to_action'
            label={t('settings.adjusts.fields.call_to_action.label')}
            placeholder={t('settings.adjusts.fields.call_to_action.placeholder')}
          />
          <InputField
            name='settings.button_text'
            label={t('settings.adjusts.fields.button_text.label')}
            placeholder={t('settings.adjusts.fields.button_text.placeholder')}
          />
          <InputField
            name='settings.count_text'
            label={
              <Tooltip
                label={t('settings.adjusts.fields.count_text.label')}
                info={t('settings.adjusts.fields.count_text.tooltip')}
              />
            }
            placeholder={t('settings.adjusts.fields.count_text.placeholder')}
          />

          {widget.kind === "pressure" && (
            <RadioField
              name='settings.show_state'
              label={t('settings.adjusts.fields.state.title')}
            >
              <Radio value='s'>{t('settings.adjusts.fields.state.radio.yes')}</Radio>
              <Radio value='n'>{t('settings.adjusts.fields.state.radio.no')}</Radio>
            </RadioField>
          )}

          <ColorField
            name='settings.main_color'
            label={
              <Tooltip
                label={t('settings.adjusts.fields.main_color.label')}
                info={t('settings.adjusts.fields.main_color.tooltip')}
              />
            }
          />
        </Panel>
      )}
    </SettingsForm>
  );
}

export default AdjustsFields;