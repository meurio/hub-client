import React from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

import { InputField, Validators } from 'bonde-components';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  FormLabel
} from "bonde-components/chakra";


import { noSpecialCharacters } from "../../../../services/utils";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';
import EmailMetrics from './EmailMetrics';

import CKEditor5Field from "./CKEditor5Field";

const Styles = styled.div`
  .emailBody {
    padding-bottom: 30px;
  }

  .emailBody--label {
    padding-bottom: 4px;
  }
`

type Props = {
  widget: Widget;
  updateCache: any;
};

const { required, composeValidators, isEmail } = Validators;

const AutofireForm = ({ widget, updateCache }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  console.log("settings", { settings: widget.settings });

  return (
    <Styles>
      <SettingsForm
        widget={widget}
        afterSubmit={async (values:any, result:any) => {
          updateCache(result.data.update_widgets.returning[0])
        }}
        initialValues={{
          settings: widget.settings
        }}
      >
        {({ submitting, dirty }: any) => (
          <Grid templateColumns="repeat(12, 1fr)" gap={16}>
            <GridItem colSpan={[12, 12, 6]}>
              <Box bg="white" p={6} boxShadow="sm">
                <Heading as="h3" size="xl" mb={4}>{t("settings.autofire.title")}</Heading>
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
                <CKEditor5Field
                  name="settings.email_text"
                  label={t("settings.autofire.label.emailBody")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required"))
                  )}
                />
                <Flex justify='end'>
                  <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
                </Flex>
              </Box>
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              <EmailMetrics widgetId={widget.id} />
            </GridItem>
          </Grid>
        )}
      </SettingsForm>
    </Styles>
  );
};

export default AutofireForm;
