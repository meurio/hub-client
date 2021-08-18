import React from "react";
import {
	Card,
	Header,
	Text,
	toast,
	Success
} from 'bonde-components';
import { gql, useMutation } from 'bonde-core-tools';
import arrayMutators from 'final-form-arrays'
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';
import RadioField, { Radio } from '../../../../components/Radio';
import styled from 'styled-components'
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

const SpyStyled = styled.div`
	display: grid;
	grid-template-columns: 55% 45%;
	grid-column-gap: 20px;
	height: 100%;
`;

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
			{({ form }: any) => (
				<>
					<SpyField field='settings.pressure_type'>
						{({ value }: any) => (
							<>
								<Card padding={{ x: 50, y: 40 }}>
									<SpyStyled>
										<Flex spacing="32px">
											<Targets />
											<div>
												<Header.H3>Alvos</Header.H3>
												<Text style={{ marginBottom: '27px' }}>
													Defina abaixo quem serão os alvos da sua campanha de pressão e o e-mail que será enviado para eles:
												</Text>
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
											</div>
										</Flex>

										<div>
											<UniqueFormExplainCard />
										</div>
									</SpyStyled>


								</Card>
							</>
						)}
					</SpyField>
				</>
			)}
		</SettingsForm>
	);
};

export default ConfigurePressureTargets;