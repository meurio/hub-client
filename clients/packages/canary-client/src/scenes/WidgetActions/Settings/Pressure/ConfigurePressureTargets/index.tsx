import React from "react";
import {
  Heading,
  Text,
  toast,
  Box,
  Grid,
  GridItem,
  Flex,
  Success,
  Button,
  RadioField,
  Stack,
  Radio
} from 'bonde-components';
import { gql, useMutation } from 'bonde-core-tools';
import arrayMutators from 'final-form-arrays'
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';

// import RadioField, { Radio } from '../../../../components/Radio';
import SpyField from '../../../../../components/SpyField';
import { Widget } from '../../../FetchWidgets';
import SettingsForm from '../../SettingsForm';
import UniqueFormFields, { UniqueFormExplainCard } from "./UniqueForm";
import GroupFormFields from './GroupForm';
import { Targets } from "../../../../Community/Domains/Icons";

const upsertPressureTargets = gql`
  mutation ($input: [pressure_targets_insert_input!]!) {
    insert_pressure_targets(
      objects: $input,
      on_conflict: {
        constraint: unique_identify_widget_id,
        update_columns: [email_subject, email_body, label, targets]
      }
    ) {
      returning {
        targets
        identify
        label
        email_subject
        email_body
      }
    }
  }
`;

type GroupTarget = {
  identify: string
}

const diff = (arr1: GroupTarget[], arr2: GroupTarget[]): GroupTarget[] => {
  const ret: GroupTarget[] = [];
  arr1.forEach((g1: any) => {
    const g2 = arr2.find((g: any) => g.identify === g1.identify);

    if (!!g2 && !Object.is(g2, g1)) {
      ret.push(g1);
    } else if (!g2) {
      ret.push(g1);
    }
  })

  return ret;
}

type Props = {
  widget: Widget
  updateCache: (widget: Widget) => any
}

const ConfigurePressureTargets = ({ widget, updateCache }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPressureTargets);
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          ...widget.settings,
          pressure_type: widget.settings.pressure_type || 'unique'
        },
        groups: widget.groups
      }}
      mutators={{ ...arrayMutators }}
      afterSubmit={async ({ groups, settings }: any) => {
        if (groups && JSON.stringify(groups) !== JSON.stringify(widget.groups)) {
          try {
            const variables = {
              input: diff(groups, widget.groups as any).map((g: any) => ({
                email_subject: g.email_subject,
                email_body: g.email_body,
                targets: g.targets,
                label: g.label,
                identify: !g.identify ? slugify(g.label, { lower: true }) : g.identify,
                widget_id: widget.id
              }))
            }
            await upsert({ variables });
            updateCache({ ...widget, settings, groups });
            toast(<Success message={t('settings.pressure.targets.success')} />, { type: toast.TYPE.SUCCESS });
          } catch (err) {
            console.error('err', { err });
            toast((err as any).message, { type: toast.TYPE.ERROR });
          }
        } else {
          updateCache({ ...widget, settings });
        }
      }}
    >
      {({ form, submitting, dirty, invalid }: any) => (
        <Box bg="white" p={6} boxShadow="sm">
          <Grid templateColumns="repeat(12, 1fr)" gap={16}>
            <GridItem colSpan={[12, 12, 1]}>
              <Targets />
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              <SpyField field='settings.pressure_type'>
                {({ value }: any) => (
                  <>
                    <Stack spacing={2} mb={4}>
                      <Heading as="h3" size="xl">Alvos</Heading>
                      <Text fontSize="18px" color="gray.400">
                        Defina abaixo quem serão os alvos da sua campanha de pressão e o e-mail que será enviado para eles:
                      </Text>
                    </Stack>
                    <RadioField
                      name='settings.pressure_type'
                      label={t('settings.pressure.label.pressure_type')}
                    >
                      <Radio value='unique'>{t('settings.pressure.radio.unique')}</Radio>
                      <Radio value='group'>{t('settings.pressure.radio.group')}</Radio>
                    </RadioField>

                    {value === 'unique'
                      ? <UniqueFormFields />
                      : <GroupFormFields form={form} />
                    }

                    <RadioField
                      name='settings.disable_edit_field'
                      label={t('settings.pressure.label.disable_edit_field')}
                    >
                      <Radio value='s'>{t('settings.pressure.radio.yes')}</Radio>
                      <Radio value='n'>{t('settings.pressure.radio.no')}</Radio>
                    </RadioField>
                  </>
                )}
              </SpyField>
              <Flex justify='end'>
                <Button disabled={submitting || !dirty || invalid} type='submit'>{t('settings.defaultForm.submit')}</Button>
              </Flex>
            </GridItem>
            <GridItem colSpan={[12, 12, 5]}>
              <UniqueFormExplainCard />
            </GridItem>
          </Grid>
        </Box>
      )}
    </SettingsForm>
  );
};

export default ConfigurePressureTargets;
