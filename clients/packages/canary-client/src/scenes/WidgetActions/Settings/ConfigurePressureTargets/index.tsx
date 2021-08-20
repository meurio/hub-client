import React from "react";
import {
	Header,
	Text,
	toast,
	Success
} from 'bonde-components';
import { gql, useMutation } from 'bonde-core-tools';
import arrayMutators from 'final-form-arrays'
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-grid-system';

import ButtonStyled from "../../../../components/ButtonStyled";
import Panel from "../../../../components/Panel";
import RadioField, { Radio } from '../../../../components/Radio';
import SpyField from '../../../../components/SpyField';
import { Widget } from '../../FetchWidgets';
import SettingsForm from '../SettingsForm';
import UniqueFormFields, { UniqueFormExplainCard } from "./UniqueForm";
import GroupFormFields from './GroupForm';
import { Targets } from "../../../Community/Domains/Icons";
import { Flex } from "../Sending/Flex";

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
						toast(err.message, { type: toast.TYPE.ERROR });
					}
				} else {
					updateCache({ ...widget, settings });
				}
			}}
		>
			{({ form, submitting, dirty }: any) => (
				<Panel>
					<Container fluid style={{ width: "100%", padding: "0" }}>
						<Row justify="between">
							<Col sm={12} md={12} lg={6}>
								<SpyField field='settings.pressure_type'>
									{({ value }: any) => (
										<Flex spacing="32px">
											<Targets />
											<div>
												<div style={{ marginBottom: "10px" }}>
													<Header.H3>Alvos</Header.H3>
												</div>
												<Text style={{ marginBottom: '27px' }}>
													Defina abaixo quem serão os alvos da sua campanha de pressão e o e-mail que será enviado para eles:
												</Text>
												<RadioField
													name='settings.pressure_type'
													label={t('settings.pressure.label.pressure_type')}
													columns="auto auto"
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
													columns="auto auto 1fr"
												>
													<Radio value='s'>{t('settings.pressure.radio.yes')}</Radio>
													<Radio value='n'>{t('settings.pressure.radio.no')}</Radio>
												</RadioField>
											</div>
										</Flex>
									)}
								</SpyField>
								<Row justify='end'>
									<ButtonStyled disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</ButtonStyled>
								</Row>
							</Col>
							<Col sm={12} md={12} lg={5}>
								<UniqueFormExplainCard />
							</Col>
						</Row>
					</Container>
				</Panel>
			)}
		</SettingsForm>
	);
};

export default ConfigurePressureTargets;