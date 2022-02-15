// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email: any) => regexEmail.test(email);

export const getFieldName = (uid: string) => `input-${uid}`;

export const validate = (fieldsWithValue: any, { t }: any) => {
  const errors = fieldsWithValue.map((field: any) => {
    if (field.required === 'true' && !field.value) {
      return t("Form Blank Validation", { field: field.label });
    } else if (
      field.value !== '' &&
      field.kind === 'email' &&
      !isValidEmail(field.value)
    ) {
      return t("Form Email Validation", { field: field.label });
    }
    return false;
  });

  return errors.filter((error: string | boolean) => !!error);
};

export const fields = (settings: any) => {
  const fields = settings && settings.fields ? settings.fields : [];
  // TODO: this field 'greetings' used to only render in edit mode
  return fields.filter((f: any) => f.kind !== 'greetings');
};

export const addValueToFields = (
  fields: Array<any>,
  values: Record<string, any>
) =>
  fields.map((field: { uid: string }) => ({
    ...field,
    value: values[getFieldName(field.uid)],
  }));
