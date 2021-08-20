import React from "react";
import { Header, TextareaField } from "bonde-components"
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';

import { Widget } from "../../FetchWidgets";
import ButtonStyled from "../../../../components/ButtonStyled";
import SpyField from "../../../../components/SpyField";
import RadioField, { Radio } from "../../../../components/Radio";
import Panel from "../../../../components/Panel";
import SettingsForm from '../SettingsForm';
import DefaultPostAction from "./DefaultPostAction";
import RichInputField from "./RichInputField";

type Props = {
	widget: Widget;
};

const ConfigurePostAction = ({ widget }: Props): React.ReactElement => {
	const { t } = useTranslation("widgetActions");

	// Parse older finish messages saved like text
	const finish_message = !!widget.settings.finish_message && typeof widget.settings.finish_message === 'string'
		? JSON.parse(widget.settings.finish_message)
		: widget.settings.finish_message
		;
	const finish_message_type = widget.settings.finish_message_type || 'share';

	return (
		<SettingsForm
			widget={widget}
			initialValues={{
				settings: {
					...widget.settings,
					finish_message,
					finish_message_type
				}
			}}
		>
			{({ submitting, dirty }: any) => (
				<Panel>
					<Container fluid style={{ width: "100%", padding: "0" }}>
						<SpyField field='settings.finish_message_type'>
							{({ value }) => (
								<Row justify="between">
									<Col sm={12} md={12} lg={6}>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<div style={{ marginBottom: "25px" }}>
												<Header.H3>Pós-ação</Header.H3>
											</div>
											<RadioField
												name='settings.finish_message_type'
												label={t("settings.finish.title")}
												columns="auto auto 1fr">
												<Radio value='share'>
													{t("settings.finish.radio.share")}
												</Radio>
												<Radio value='custom'>
													{t("settings.finish.radio.custom")}
												</Radio>
											</RadioField>
											{value === 'share' ? (
												<TextareaField
													label={t("settings.finish.default.whatsapp.label")}
													name="settings.whatsapp_text"
													placeholder={t("settings.finish.default.whatsapp.placeholder")}
												/>
											) : (
												<RichInputField name='settings.finish_message' />
											)}
											<Row justify='end'>
												<ButtonStyled disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</ButtonStyled>
											</Row>
										</div>
									</Col>
									<Col sm={12} md={12} lg={5}>
										{value === 'share' && <DefaultPostAction />}
									</Col>
								</Row>
							)}
						</SpyField>
					</Container>
				</Panel>
			)}
		</SettingsForm>
	);
};

export default ConfigurePostAction;
