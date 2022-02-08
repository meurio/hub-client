import React from 'react';
import Fields from '../components/Form/Fields';
import { Validators } from '../../../components/forms';
import { validateUtils } from '../utils';

const { required, composeValidators } = Validators;

const PhoneFields = (targetList: Array<any>, onBlur: any) => (
  <Fields
    fields={[
      {
        name: 'phone',
        label: 'Telefone',
        type: 'text',
        placeholder: 'Insira seu telefone. Ex: +5511987654321',
        disabled: false,
        onBlur,
        validate: composeValidators(
          required('Preenchimento obrigatório'),
          validateUtils.isValidPhoneE164({
            code:
              'Informe o código do país e o DDD com dois dígitos. Ex: +5511',
            invalid: 'Telefone inválido',
          }),
          validateUtils.checkPhoneTargetsList(
            'O telefone que você está tentando usar é de um dos alvos da mobilização.',
            targetList
          )
        ),
      },
    ]}
  />
);

export default PhoneFields;
