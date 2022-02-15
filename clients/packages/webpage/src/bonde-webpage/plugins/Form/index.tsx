import React, { useState } from 'react';

// import { intlShape } from 'react-intl'
import styled from '@emotion/styled';

import { Count } from '../../components';
import { Translate } from '../../components/MobilizationClass';
import LGPD from '../../components/ux/LGPD';
import { Button, Input, Raise, ShareButtons } from './components';
import { getFieldName, validate, fields, addValueToFields } from './utils';

type Props = {
  mobilization:
    | {
        body_font: string;
        header_font: string;
        main_color?: string;
        id: number;
      }
    | Record<any, any>;
  widget: {
    settings: {
      finish_message_type?: string;
      fields: Array<any>;
      count_text?: string;
      button_text: string;
    };
    id: number;
    form_entries_count: any;
  };
  analyticsEvents: {
    formIsFilled: () => void;
  };
  overrides?: {
    FinishCustomMessage?: {
      component?: React.ReactNode;
      props: any;
    };
    FinishDefaultMessage?: {
      component?: React.ReactNode;
      props: any;
    };
  };
  asyncFormEntryCreate: (params: any) => Promise<any>;
};

const WrapForm = styled.div<{ backgroundColor: string }>`
  padding: 2rem;
  border-radius: 3px;
  position: relative;
  background-color: ${(props) => props.backgroundColor};
`;

const Header = styled.h2`
  color: #ffffff;
  text-align: center;
  margin: 0 0 2rem 0;
  font-weight: normal;
`;

const WrapInputs = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`;

const renderCallToAction = ({ settings }: any) => {
  const callToAction = (
    settings.call_to_action
      ? settings.call_to_action
      : 'Clique para configurar seu formulário...'
  ).replace('\n', '<br/><br/>');

  return <Header>{callToAction}</Header>;
};

const renderFields = (
  {
    analyticsEvents,
    widget: { settings },
  }: Pick<Props, 'analyticsEvents' | 'widget'>,
  handleChange: any
) => {
  return (
    <WrapInputs>
      {fields(settings).map((field: any, index: any) => {
        return (
          <Input
            key={field.uid}
            name={getFieldName(field.uid)}
            onChange={handleChange}
            onBlur={
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              Number(index) === 0 ? analyticsEvents.formIsFilled() : () => {}
            }
            field={field}
          />
        );
      })}
    </WrapInputs>
  );
};

const renderButton = (
  { widget }: Pick<Props, 'widget'>,
  success: boolean,
  loading: boolean
) => (
  <>
    <Button
      buttonText={(widget.settings && widget.settings.button_text) || 'Enviar'}
      loading={loading}
      success={success}
    />
    <LGPD color="#fff" />
  </>
);

const renderErrors = (errors: Array<any>) => {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      {errors.map((error: any, i: number) => (
        <Raise key={`error-${i}`} message={error} />
      ))}
    </div>
  );
};

const FormPlugin = (props: Props) => {
  const { asyncFormEntryCreate, mobilization, widget } = props;
  const [status, setStatus] = useState<string>('idle');
  const [errors, setErrors] = useState<Array<string>>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [count, setCount] = useState<number>(widget.form_entries_count || 0);

  const handleSubmit = (t: any) => async (e: any) => {
    e.preventDefault();
    setErrors([]);

    const fieldsWithValue = addValueToFields(widget.settings.fields, values);

    const errors = validate(fieldsWithValue, { t });

    if (errors.length > 0) {
      return setErrors(errors);
    }
    setStatus('pending');

    try {
      await asyncFormEntryCreate({
        widget_id: widget.id,
        fields: JSON.stringify(fieldsWithValue),
      });
      setStatus('fulfilled');
      setCount(count + 1);
      setValues({});
    } catch (e) {
      console.error(e);
      setStatus('rejected');
      setErrors([t('Network Failed')]);
    }
  };

  const handleChange = (e: any) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const renderForm = ({ widget }: any, errors: Array<any>) => {
    const bgcolor =
      widget.settings && widget.settings.main_color
        ? widget.settings.main_color
        : 'rgba(0,0,0,0.25)';

    return (
      <Translate>
        {({ t }: any) => (
          <WrapForm backgroundColor={bgcolor}>
            <form onSubmit={handleSubmit(t)} noValidate={true}>
              {renderCallToAction(widget)}
              {renderFields(props, handleChange)}
              {errors.length > 0 && renderErrors(errors)}
              {widget.settings.fields &&
                widget.settings.fields.length > 0 &&
                renderButton(
                  props,
                  status === 'fulfilled',
                  status === 'pending'
                )}
            </form>
          </WrapForm>
        )}
      </Translate>
    );
  };

  const { header_font: headerFont } = mobilization;

  return (
    <div id={`widget-${widget.id}`} className={`widget ${headerFont}-header`}>
      {status === 'fulfilled' ? (
        <ShareButtons {...props} />
      ) : (
        renderForm(props, errors)
      )}
      {widget.settings && widget.settings.count_text && (
        <Count
          startCounting={typeof window !== 'undefined'}
          value={count}
          text={widget.settings.count_text || 'formulários preenchidos'}
          fontFamily={mobilization.body_font}
          color={mobilization.main_color || '#000'}
        />
      )}
    </div>
  );
};

FormPlugin.defaultProps = {
  mobilization: {
    body_font: 'inherit',
    header_font: 'inherit',
  },
};

export default FormPlugin;

export { default as FormAnalytics } from './Analytics';
export { default as FormTellAFriend } from './TellAFriend';
