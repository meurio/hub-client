import React, { useState } from "react";
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

import ClassicEditor from "ckeditor5-custom-build";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { noSpecialCharacters } from "../../../../services/utils";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';

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

  const [editorData, setEditorData] = useState(t("settings.autofire.placeholder.emailBody"));

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
                <Flex className="emailBody" direction="column">
                    <FormLabel className="emailBody--label" htmlFor="editor">
                      {t("settings.autofire.label.emailBody")}
                    </FormLabel>
                    <CKEditor
                      data={editorData}
                      editor={ClassicEditor}
                      config={{
                        simpleUpload: {
                          uploadUrl: process.env.REACT_APP_UPLOADS_URL,
                          withCredentials: true,
                          headers: {
                            "X-CSRF-TOKEN": "CSRF-Token",
                            Authorization: "Bearer <JSON Web Token>"
                          }
                        }
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                      }}
                      validate={composeValidators(
                        required(t("settings.autofire.validators.required"))
                      )}
                    />
                </Flex>
                <Flex justify='end'>
                  <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        )}
      </SettingsForm>
    </Styles>
  );
};

export default AutofireForm;