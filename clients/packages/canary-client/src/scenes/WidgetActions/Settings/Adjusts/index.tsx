import React from 'react';
import {
  Button,
  Box,
  ColorField,
  InputField,
  Flex,
  RadioField,
  Radio,
  Heading,
  Grid,
  GridItem
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import SettingsForm from '../SettingsForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AdjustsFields = ({ widget, updateCache }: any) => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={async (values:any, result:any) => {
        updateCache(result.data.update_widgets.returning[0])
      }}
      initialValues={{
        settings: {
          show_city: "city-false",
          show_state: "n",
          ...widget.settings
        }
      }}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, 12, 6]}>
            <Box bg="white" p={6} boxShadow="sm">
              <Heading as="h3" size="xl" mb={4}>{t("settings.adjusts.title")}</Heading>
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
                label={t('settings.adjusts.fields.count_text.label')}
                helpText={t('settings.adjusts.fields.count_text.tooltip')}
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
                label={t('settings.adjusts.fields.main_color.label')}
                helpText={t('settings.adjusts.fields.main_color.tooltip')}
              />
              <Flex justify='end'>
                <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </SettingsForm>
  );
}

export default AdjustsFields;