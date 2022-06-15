import React from 'react';
import { chakra } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import SubjectBodyFields from './SubjectBodyFields';
const { Heading, Text, Stack } = chakra;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const UniqueFormExplainCard = () => {
  const { t } = useTranslation('widgetActions');

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading as="h4" size="lg">{t("settings.pressure.explain.title")}</Heading>
        <Text>{t("settings.pressure.explain.description")}</Text>
      </Stack>
      <Stack spacing={2}>
        <Heading as="h4" size="lg">{t("settings.pressure.explain.target_format")}</Heading>
        <Text>{t("settings.pressure.explain.controllers.format")}</Text>
        <Text>{t("settings.pressure.explain.ordering")}</Text>
        <Text>{t("settings.pressure.explain.save_form")}</Text>
      </Stack>
    </Stack>
  );
}

const UniqueForm = () => (
  <SubjectBodyFields prefix='settings' />
);

export default UniqueForm;
