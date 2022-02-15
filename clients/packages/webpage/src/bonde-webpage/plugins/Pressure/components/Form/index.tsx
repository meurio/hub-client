/* eslint-disable */
import React from 'react';

import {
  Button,
  Form,
  InputField,
  Validators,
  SelectField
} from "../../../../components/forms";
import { Raise } from '../../../../components';
import { Translate } from '../../../../components/MobilizationClass';
import LGPD from '../../../../components/ux/LGPD';
import { GroupTarget } from '../Targets';
import {
  WrapFields,
  ButtonWrapper,
  WrapInputs,
  Wrapper,
  WrapRaise,
} from './styles';

type Props = {
  onSubmit: any;
  pureTargets: GroupTarget[];
  widget: {
    id: number;
    count?: number;
    settings: {
      main_color: string;
      show_city?: string;
      button_text: string;
      pressure_subject?: string;
      pressure_body?: string;
      call_to_action?: string;
      title_text?: string;
      disable_edit_field?: any;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      targets?: string;
      count_text?: string;
      pressure_type?: string | 'unique' | 'group';
      select_label?: string;
      show_state?: string;
    };
  };
  BeforeStandardFields?: any;
  AfterStandardFields?: any;
  saving: boolean;
  errors: Array<string>;
};

const PressureForm = ({
  widget,
  pureTargets,
  BeforeStandardFields,
  AfterStandardFields,
  onSubmit,
  saving,
  errors,
}: Props): React.ReactElement => {
  const { required } = Validators;
  const {
    settings: {
      show_city: showCity,
      show_state: showState,
      main_color: buttonColor,
      button_text: buttonText,
      pressure_subject: subject = '',
      pressure_body: body = '',
      pressure_type,
      select_label,
    },
  } = widget;

  const options: any[] = pureTargets.map((groupTarget: GroupTarget) => ({
    label: groupTarget.label,
    value: groupTarget.identify,
  }));

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ subject, body }}
      mutators={{
        setValue: (
          [field, value]: any[],
          state: any,
          { changeValue }: any
        ): void => {
          changeValue(state, field, () => value);
        },
      }}
    >
      {({ submitting, form }): React.ReactElement => {
        return (
          <Translate>
            {({ t }: any): React.ReactElement => (
              <Wrapper>
                <WrapFields>
                  {pressure_type === 'group' && options.length > 0 && (
                    <WrapInputs inverted>
                      <SelectField
                        label={select_label || t('Pressure Targets Label')}
                        name="targetsInput"
                        placeholder={t('Pressure Targets Placeholder')}
                        onChange={(e: any): void => {
                          const group = pureTargets.filter(
                            (gt: GroupTarget) => gt.identify === e.target.value
                          )[0];
                          const { setValue }: any = form.mutators;

                          if (!!group && group.email_subject)
                            setValue('subject', group.email_subject);
                          else setValue('subject', subject);
                          if (!!group && group.email_body)
                            setValue('body', group.email_body);
                          else setValue('body', body);
                        }}
                      >
                        {options.map((group) => (
                          <option value={group.value}>{group.label}</option>
                        ))}
                      </SelectField>
                    </WrapInputs>
                  )}
                  {BeforeStandardFields && <BeforeStandardFields />}
                  <WrapInputs>
                    <InputField
                      label={t('Pressure Name Label')}
                      name="name"
                      placeholder={t('Pressure Name Placeholder')}
                      validate={required(t('Pressure Blank Validation'))}
                    />
                  </WrapInputs>
                  <WrapInputs>
                    <InputField
                      label={t('Pressure Lastname Label')}
                      name="lastname"
                      placeholder={t('Pressure Lastname Placeholder')}
                      validate={required(t('Pressure Blank Validation'))}
                    />
                  </WrapInputs>
                  {showState && showState === 's' && (
                    <WrapInputs>
                      <SelectField
                        label={t('Pressure State Label')}
                        name="state"
                        validate={required(t('Pressure Blank Validation'))}
                      >
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                        <option value="EX">Estrangeiro</option>
                      </SelectField>
                    </WrapInputs>
                  )}
                  {showCity && showCity === 'city-true' && (
                    <WrapInputs>
                      <InputField
                        label={t('Pressure City Label')}
                        name="city"
                        placeholder={t('Pressure City Placeholder')}
                        validate={required(t('Pressure Blank Validation'))}
                      />
                    </WrapInputs>
                  )}
                  {AfterStandardFields && <AfterStandardFields />}
                </WrapFields>
                {errors.length >= 1 && (
                  <>
                    {errors.map((error: string, i: number) => (
                      <WrapRaise key={`error-${i}`}>
                        <Raise message={error} />
                      </WrapRaise>
                    ))}
                  </>
                )}
                <ButtonWrapper color={buttonColor}>
                  <Button type="submit" disabled={submitting}>
                    {submitting || saving ? t('Pressure Saving') : buttonText}
                  </Button>
                  <LGPD color="#545454" />
                </ButtonWrapper>
              </Wrapper>
            )}
          </Translate>
        );
      }}
    </Form>
  );
};

export default PressureForm;
