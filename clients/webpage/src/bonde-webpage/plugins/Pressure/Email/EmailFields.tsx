import React from 'react';
import Fields from '../components/Form/Fields';
import { Validators } from '../../../components/forms';
import { validateUtils } from '../utils';
import { Translate } from '../../../components/MobilizationClass';

const { required, isEmail, composeValidators } = Validators;

const before = (targetList: Array<any>, onBlur: any) => (
  <Translate>
    {({ t }: any) => (
      <Fields
        fields={[
          {
            name: 'email',
            label: t("Pressure Email Label"),
            type: 'email',
            placeholder: t("Pressure Email Placeholder"),
            disabled: false,
            onBlur,
            validate: composeValidators(
              required(t('Pressure Blank Validation')),
              isEmail(t("Pressure Email Validation")),
              validateUtils.checkEmailTargetsList(
                t("Pressure SameEmailTarget Validation"),
                targetList
              )
            ),
          },
        ]}
      />
    )}
  </Translate>
);

type AfterProps = {
  disableSubjectAndBody: boolean;
};

const after = ({ disableSubjectAndBody }: AfterProps) => {
  return (
    <Translate>
      {({ t }: any) => (
        <Fields
          fields={[
            {
              name: 'subject',
              label: t("Pressure Subject Label"),
              type: 'text',
              disabled: disableSubjectAndBody,
              placeholder: '',
              validate: required(t("Pressure Blank Validation")),
            },
            {
              name: 'body',
              label: t("Pressure Body Label"),
              type: 'textarea',
              disabled: disableSubjectAndBody,
              placeholder: '',
              validate: required(t("Pressure Blank Validation")),
            },
          ]}
        />
      )}
    </Translate>
  );
};

export default { before, after };
