import React from 'react';
import { InputField, TextareaField } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import TagInputField from "./TagInputField";

type SubjectBodyFieldsProps = {
  prefix?: string
  emailSubjectName?: string
  emailBodyName?: string
}

const validate = (targets: string[]) => {
  // eslint-disable-next-line
  const re = new RegExp(/[a-zA-Zá-ú 0-9]+<(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})>/);

  if (targets !== undefined && targets?.length) {
    const invalidTargets = targets.filter((target) => !re.test(target));

    if (invalidTargets.length > 0) return invalidTargets;
    else return undefined

  } else if (targets !== undefined) {
    const invalidTargets = (targets as any)?.targets?.filter((target: string) => !re.test(target)) || [];

    if (invalidTargets.length > 0) return invalidTargets;
    else return undefined
  }
}

const SubjectBodyFields: React.FC<SubjectBodyFieldsProps> = ({ prefix, emailSubjectName, emailBodyName }) => {
  const { t } = useTranslation('widgetActions');

  const emailSubject = emailSubjectName ? emailSubjectName : 'pressure_subject';
  const emailBody = emailBodyName ? emailBodyName : 'pressure_body';

  return (
    <>
      <TagInputField
        label={t('settings.pressure.label.targets')}
        placeholder="Nome do alvo <nome@alvo.org>"
        name={prefix ? prefix + ".targets" : "targets"}
        validate={validate}
      />
      <InputField
        name={prefix ? prefix + `.${emailSubject}` : emailSubject}
        placeholder={t('settings.pressure.placeholder.email_subject')}
        label={t('settings.pressure.label.email_subject')}
      />
      <TextareaField
        name={prefix ? prefix + `.${emailBody}` : emailBody}
        placeholder={t('settings.pressure.placeholder.email_body')}
        label={t('settings.pressure.label.email_body')}
      />
    </>
  );
}

export default SubjectBodyFields;
