import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { InputField, TextareaField, Validators } from 'bonde-components';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading
} from "bonde-components/chakra";

import Editor from "ckeditor5-custom-build";
// import 'ckeditor5-custom-build/build/translations/pt-br';


import { noSpecialCharacters } from "../../../../services/utils";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';

type Props = {
  widget: Widget;
  updateCache: any;
};

const { required, composeValidators, isEmail } = Validators;

const AutofireForm = ({ widget, updateCache }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  const [editorData, setEditorData] = useState('');


  return (
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
              {/* <TextareaField
                label={t("settings.autofire.label.emailBody")}
                name="settings.email_text"
                placeholder={t("settings.autofire.placeholder.emailBody")}
                validate={composeValidators(
                  required(t("settings.autofire.validators.required"))
                )}
              /> */}
              <Editor
                editor={ClassicEditor}
                config={{
                  plugins: [Underline, ...ClassicEditor.builtinPlugins],
                  toolbar: [
                    'heading', '|',
                    'bold', 'italic', 'underline', 'link', '|',
                    'bulletedList', 'numberedList', '|',
                    'insertTable', 'blockQuote', 'mediaEmbed', '|',
                    'alignment', '|',
                    'fontColor', 'fontBackgroundColor', '|',
                    'imageUpload'
                  ],
                }}
                data={editorData}
                onReady={editor => {
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
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
};

export default AutofireForm;