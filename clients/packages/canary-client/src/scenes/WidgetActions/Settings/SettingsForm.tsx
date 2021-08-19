import React from 'react';
import { Button, ConnectedForm, toast, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Widget } from '../FetchWidgets';

const UpdateWidgetGQL = gql`
  mutation (
    $primaryKey: Int!
    $settings: jsonb!
  ) {
    update_widgets(
      where: { id: { _eq: $primaryKey } }
      _append: { settings: $settings }
    ) {
      affected_rows
    }
  }
`;

type SubmitProps = {
  primaryKey: number
  settings: any
}

type Props = {
  widget: Widget
  initialValues?: any
  children: any
  afterSubmit?: (values: any, result: any) => Promise<any>
  // ReactFinalForm Props
  mutators?: any
}

const Box = styled.div`
  position: relative;

  .floating {
    position: absolute;
    top: -170px;
    right: 0;
    width: 150px;
  }
`

const SettingsForm = ({ children, widget, initialValues, afterSubmit, ...connectedFormProps }: Props) => {
  const [save] = useMutation(UpdateWidgetGQL);
  const { t } = useTranslation('widgetActions');

  const onSubmit = async ({ primaryKey, settings, ...values }: SubmitProps) => {
    try {
      const result = await save({ variables: { primaryKey, settings } });

      if (!(result.data.update_widgets.affected_rows === 1)) {
        throw new Error(t('settings.defaultForm.error'));
      }

      toast(<Success message={t('settings.defaultForm.success')} />, {
        type: toast.TYPE.SUCCESS,
      });

      if (afterSubmit) await afterSubmit({ primaryKey, settings, ...values }, result);

    } catch (e) {
      console.log(e);
      return toast(t('settings.defaultForm.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  }

  return (
    <ConnectedForm
      onSubmit={onSubmit}
      initialValues={{ primaryKey: widget.id, ...initialValues }}
      {...connectedFormProps}
    >
      {({ submitting, dirty, ...formProps }: any) => (
        <Box>
          {children({ submitting, dirty, ...formProps })}
        </Box>
      )}
    </ConnectedForm>
  )
}

SettingsForm.defaultValues = {
  initialValues: {}
}

export default SettingsForm;