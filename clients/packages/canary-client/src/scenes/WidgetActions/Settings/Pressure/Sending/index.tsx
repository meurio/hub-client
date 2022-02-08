import React, { useState } from "react";
import {
  Heading,
  Text,
  Button,
  SwitchField,
  SelectField,
  Grid,
  GridItem,
  Stack,
  Flex,
  Box,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay
} from "bonde-components";
import { useTranslation } from "react-i18next";

import SpyField from "../../../../../components/SpyField";
import { OptimizedPressure } from "../../../../Community/Domains/Icons";
import { Widget } from "../../../FetchWidgets";
import SettingsForm from '../../SettingsForm';

type Props = {
  widget: Widget;
  updateCache: any;
};

const ConfirmModal = ({ defaultIsOpen, onCancel }: any) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  // useEffect serve para determinar que a propriedade
  // defaultIsOpen tenha um peso maior que a propriedade isOpen
  // isOpen pode ser alterado, sempre que defaultIsOpen for alterado
  // devemos recalcular a possibilidade de abrir ou não o modal
  React.useEffect(() => {
    setIsOpen(defaultIsOpen)
  }, [defaultIsOpen]);

  const onClose = () => {
    setIsOpen(false)
    onCancel()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Desativar envio otimizado?</ModalHeader>
        <ModalBody>
          <Text>Isso pode gerar custos extras caso sua campanha ultrapasse 100.000 envios de e-mails.</Text>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button variant="link" colorScheme="gray" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Desativar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const Sending = ({ widget, updateCache }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={async (_: any, result: any) => {
        updateCache(result.data.update_widgets.returning[0]);
      }}
      initialValues={{
        settings: {
          optimization_enabled: true,
          mail_limit: 1000,
          batch_limit: 50,
          ...widget.settings
        }
      }}
    >
      {({ form, submitting, dirty }: any) => (
        <Box bg="white" p={8} boxShadow="sm">
          <Grid templateColumns="repeat(12, 1fr)" gap={16}>
            <GridItem colSpan={[12, 12, 1]}>
              <OptimizedPressure />
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              <Stack spacing={2}>
                <Heading as="h3" size="xl">{t("settings.sending.title")}</Heading>
                <Text>{t("settings.sending.subtitle")}</Text>
                <SwitchField
                  defaultValue={widget.settings.optimization_enabled}
                  name="settings.optimization_enabled"
                  textOn="ATIVADO"
                  textOff="DESATIVADO"
                />
                <SpyField field="settings.optimization_enabled">
                  {({ value, meta }) => (
                    <ConfirmModal
                      defaultIsOpen={!value && meta.modified && dirty}
                      onCancel={() => {
                        form.change("settings.optimization_enabled", true)
                      }}
                    />
                  )}
                </SpyField>
              </Stack>
              <SelectField name='settings.mail_limit' label='Limite de envios únicos'>
                <option value={500}>500 pressões</option>
                <option value={1000}>1.000 pressões</option>
                <option value={5000}>5.000 pressões</option>
                <option value={10000}>10.000 pressões</option>
              </SelectField>
              <SelectField name='settings.batch_limit' label='Intervalo de envio'>
                <option value={50}>A cada 50 pressões</option>
                <option value={100}>A cada 100 pressões</option>
                <option value={500}>A cada 500 pressões</option>
                <option value={1000}>A cada 1.000 pressões</option>
              </SelectField>
              <Flex justify="flex-end">
                <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
              </Flex>
            </GridItem>
            <GridItem colSpan={[12, 12, 5]}>
              <Stack spacing={4}>
                <Heading as="h4" size="lg">
                  {t("settings.sending.how_it_works.title")}
                </Heading>
                <Text>
                  {t("settings.sending.how_it_works.description1")}
                </Text>
                <Text>
                  {t("settings.sending.how_it_works.description2")}
                </Text>
                <Text>
                  {t("settings.sending.how_it_works.description3")}
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
      )}
    </SettingsForm>
  );
};

export default Sending;
