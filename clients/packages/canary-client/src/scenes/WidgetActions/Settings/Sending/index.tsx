import React, {useState} from "react";
import { Card, Header, Text, Button, SwitchField } from "bonde-components";
import { Modal } from "bonde-components";
import { useTranslation } from "react-i18next";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';
import SelectField from "../../../../components/SelectField";
import styled from "styled-components";
import { OptimizedPressure } from "../../../Community/Domains/Icons";
import { Flex } from "./Flex";
import SpyField from "../../../../components/SpyField";

type Props = {
	widget: Widget;
};

const SpyStyled = styled.div`
	display: grid;
	grid-template-columns: 55% 45%;
	grid-column-gap: 20px;
	height: 100%;
`;


const ConfirmModal = ({ defaultIsOpen, onCancel }: any) => {
	const [isOpen, setIsOpen] = useState(defaultIsOpen);

	// useEffect serve para determinar que a propriedade 
	// defaultIsOpen tenha um peso maior que a propriedade isOpen
	// isOpen pode ser alterado, sempre que defaultIsOpen for alterado
	// devemos confirmar recalcular a possibilidade de abrir ou não o modal
	React.useEffect(() => {
		setIsOpen(defaultIsOpen)
	}, [defaultIsOpen])

	return (
		<Modal
			width="450px"
			isOpen={isOpen}
			onClose={() => {
				setIsOpen(false)
				onCancel()
			}}
		>
			<Header.H2 mb="18px">Desativar envio otimizado?</Header.H2>
			<Text>Isso pode gerar custos extras caso sua campanha ultrapasse 100.000 envios de e-mails.</Text>
			<div
				style={{ display: "flex", flexDirection: "row" }}
			>
				<Button
					secondary					
					type="button"
					onClick={() => {
						setIsOpen(false)
						onCancel()
					}}
				>Cancelar</Button>
				<Button type="button" onClick={() => setIsOpen(false)}>
					Desativar
				</Button>
			</div>
		</Modal>
	);
}

const Sending = ({ widget }: Props): React.ReactElement => {
	const { t } = useTranslation("widgetActions");

	return (
		<SettingsForm
			widget={widget}
			initialValues={{
				settings: {
					optimization_enabled: true,
					mail_limit: 1000,
					batch_limit: 50,
					...widget.settings
				}
			}}
		>
			{({form}: any) => (
				<Card padding={{ x: 40, y: 30 }}>
					<SpyStyled>
						<Flex spacing="32px">
							<OptimizedPressure />

							<div>
								<Header.H3>
									{t("settings.sending.title")}
								</Header.H3>
								<Text style={{ marginBottom: "15px" }}>
									{t("settings.sending.subtitle")}
								</Text>

								<SwitchField
									defaultValue={widget.settings.optimization_enabled}
									name="settings.optimization_enabled"
									textOn="ATIVADO"
									textOff="DESATIVADO"
								/>

								<SpyField field="settings.optimization_enabled">
									{({ value, meta }) => (
										<ConfirmModal
											defaultIsOpen={!value && meta.modified}
											onCancel={() => {
												form.change("settings.optimization_enabled", true)
											}}
										/>
									)}
								</SpyField>
								
								<SelectField
									name='settings.mail_limit'
									label='Limite de envios únicos'
								>
									<option value={500}>500 pressões</option>
									<option value={1000}>1.000 pressões</option>
									<option value={5000}>5.000 pressões</option>
									<option value={10000}>10.000 pressões</option>
								</SelectField>

								<SelectField
									name='settings.batch_limit'
									label='Intervalo de envio'
								>
									<option value={50}>A cada 50 pressões</option>
									<option value={100}>A cada 100 pressões</option>
									<option value={500}>A cada 500 pressões</option>
									<option value={1000}>A cada 1.000 pressões</option>
								</SelectField>

								<Button type="submit">Salvar Alterações</Button>
							</div>
						</Flex>

						<div>
							<Header.H4
								style={{
									margin: "10px 0",
								}}
							>
								{t("settings.sending.how_it_works.title")}
							</Header.H4>
							<Text
								style={{ marginBottom: "15px" }}
								dangerouslySetInnerHTML={{ __html: t("settings.sending.how_it_works.description") }}
							/>
						</div>
					</SpyStyled>
				</Card>
			)}
		</SettingsForm>
	);
};

export default Sending;