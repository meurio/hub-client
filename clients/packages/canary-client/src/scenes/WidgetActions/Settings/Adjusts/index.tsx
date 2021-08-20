import React from 'react';
import { InputField, Tooltip, Header } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-grid-system';
import ButtonStyled from '../../../../components/ButtonStyled';
import Panel from '../../../../components/Panel';
import ColorField from '../../../../components/ColorField';
import SettingsForm from '../SettingsForm';
import RadioField, { Radio } from '../../../../components/Radio';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AdjustsFields = ({ widget }: any) => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          show_city: "city-false",
          show_state: "n",
          ...widget.settings
        }
      }}
    >
      {({ submitting, dirty }: any) => (
        <Container fluid style={{ width: "100%", padding: "0" }}>
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Panel>
                <div style={{ marginBottom: "25px" }}>
                  <Header.H3>
                    {t("settings.adjusts.title")}
                  </Header.H3>
                </div>
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
                  <>
                    <RadioField
                      name='settings.show_state'
                      label={t('settings.adjusts.fields.state.title')}
                      columns="auto auto 1fr"
                    >
                      <Radio value='s'>{t('settings.adjusts.fields.state.radio.yes')}</Radio>
                      <Radio value='n'>{t('settings.adjusts.fields.state.radio.no')}</Radio>
                    </RadioField>

                    <RadioField
                      name='settings.show_city'
                      label={t('settings.adjusts.fields.city.title')}
                      columns="auto auto 1fr"
                    >
                      <Radio value='city-true'>{t('settings.adjusts.fields.city.radio.yes')}</Radio>
                      <Radio value='city-false'>{t('settings.adjusts.fields.city.radio.no')}</Radio>
                    </RadioField>
                  </>
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
}

export default AdjustsFields;