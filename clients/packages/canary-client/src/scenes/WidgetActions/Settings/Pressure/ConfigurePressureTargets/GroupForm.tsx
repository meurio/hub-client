import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Icon,
  IconButton,
  InputField,
  Flex,
  FormLabel,
  Text,
  Stack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader
} from 'bonde-components';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import SubjectBodyFields from './SubjectBodyFields';
import DeleteTargetPopup from './DeleteTargetPopup';

type GroupFieldProps = {
  name: string
  group?: any
  remove: any
}

const GroupField = ({ name, group, remove }: GroupFieldProps) => {
  const [open, setOpen] = useState(!group);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { t } = useTranslation('widgetActions');

  useEffect(() => {
    if (group) setOpen(false);
    // eslint-disable-next-line
  }, [])

  const onClose = () => setOpenDeleteModal(false);

  return !open ? (
    <Box p={2} borderColor="gray.200" borderWidth="1px">
      <Flex direction="row" justify="space-between">
        <Text color='#000' style={{ flexGrow: 1 }}>{group.label || 'Nome do grupo'}</Text>
        <Stack direction="row" spacing={2}>
          <IconButton variant="link" colorScheme="gray" onClick={() => setOpen(true)}>
            <Icon name='Pencil' size='small' />
          </IconButton>
          <IconButton variant="link" colorScheme="gray" onClick={() => setOpenDeleteModal(true)}>
            <Icon name='Trash' size='small' />
          </IconButton>
          <DeleteTargetPopup
            pressureTargetId={group.id}
            open={openDeleteModal}
            remove={remove}
            onClose={onClose}
          />
        </Stack>
      </Flex>
    </Box>
  ) : (
    <Modal size="lg" isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar alvos</ModalHeader>
        <ModalBody>
          <InputField
            name={`${name}.label`}
            label={t('settings.pressure.label.group_label')}
            placeholder={t('settings.pressure.placeholder.group_label')}
          />
          <SubjectBodyFields
            prefix={name}
            emailSubjectName='email_subject'
            emailBodyName='email_body'
          />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            variant="link"
            colorScheme="gray"
            onClick={() => {
              // remove when
              if (!group) remove();
              // close card
              setOpen(false)
            }}
          >
            {t('settings.pressure.button.cancel')}
          </Button>
          <Button type='button' onClick={() => setOpen(false)}>
            {t('settings.pressure.button.add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export type GroupFormProps = {
  form: {
    mutators: {
      push: any
      pop: any
    }
  }
}

const GroupForm = ({ form: { mutators } }: GroupFormProps) => {
  const { t } = useTranslation('widgetActions');

  // Render
  return (
    <>
      <InputField
        name='settings.select_label'
        label={t('settings.pressure.label.select_label')}
        placeholder={t('settings.pressure.placeholder.select_label')}
      />
      <Box mb={4}>
        <FormLabel>Adicionar grupo de alvos</FormLabel>
        <FieldArray name="groups">
          {({ fields }) => (
            <Stack spacing={2} mt={2}>
              {fields.map((name, index) => (
                <GroupField
                  key={name}
                  name={name}
                  group={fields.value[index]}
                  remove={() => fields.remove(index)}
                />
              ))}
            </Stack>
          )}
        </FieldArray>
        <Flex justify="end" mt={2}>
          <Button
            isFullWidth
            borderRadius="none"
            variant="outline"
            colorScheme="gray"
            onClick={() => mutators.push('groups', undefined)}
          >
            {t('settings.pressure.button.addGroup')}
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default GroupForm;
