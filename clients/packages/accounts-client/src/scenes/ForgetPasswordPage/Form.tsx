import React, { useState } from "react";
import {
  Button,
  ConnectedForm,
  Header,
  Text,
  InputField,
  Validators,
  Link as LinkStyled,
  Stack,
  Flex
} from "bonde-components";
// import { Container } from "react-grid-system";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, gql } from "bonde-core-tools";

const { isEmail } = Validators;
const appDomain =
  process.env.REACT_APP_DOMAIN_ACCOUNTS || "http://bonde.devel:5000";

const forgetPasswordMutation = gql`
  mutation RequestForgetPassword(
    $email: String!
    $callbackUrl: String!
    $locale: String
  ) {
    reset_password_request(
      email: $email
      callback_url: $callbackUrl
      locale: $locale
    )
  }
`;

const Success = () => {
  const { t } = useTranslation("auth");

  return (
    <Stack spacing={4}>
      <Header.H2>{t("forgetPassword.successfully.title")}</Header.H2>
      <Text>{t("forgetPassword.successfully.checkEmail")}</Text>
      <Text>{t("forgetPassword.successfully.checkSpam")}</Text>
      <Text>{t("forgetPassword.successfully.checkExpiry")}</Text>
      <LinkStyled to="/login" component={Link}>
        {t("forgetPassword.goback")}
      </LinkStyled>
    </Stack>
  );
};

const ForgetPasswordForm = () => {
  const [forgetPassword] = useMutation(forgetPasswordMutation);
  const { t, i18n } = useTranslation("auth");
  const [submitted, setSubmitted] = useState(false);

  const callbackUrl: string = new URL("/reset-password?token=", appDomain).href;

  const submit = async (values: any) => {
    try {
      await forgetPassword({ variables: values });
      setSubmitted(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  return submitted ? (
    <Success />
  ) : (
    <Stack spacing={4}>
      <Header.H2>{t("forgetPassword.title")}</Header.H2>
      <Text>{t("forgetPassword.description")}</Text>
      <ConnectedForm
        initialValues={{
          callbackUrl,
          locale: i18n.language === "pt" ? "pt-BR" : i18n.language,
        }}
        onSubmit={submit}
      >
        {({ submitting }: any) => (
          <>
            <InputField
              name="email"
              label={t("forgetPassword.email.label")}
              placeholder={t("forgetPassword.email.placeholder")}
              validate={isEmail(t("forgetPassword.email.isEmail"))}
            />

            <Flex direction="row" alignItems="center" justify="space-between">
              <LinkStyled
                component={Link}
                to="/login"
                title={t("forgetPassword.goback")}
              >
                {t("forgetPassword.goback")}
              </LinkStyled>
              <Button type="submit" disabled={submitting}>
                {t("forgetPassword.submit")}
              </Button>
            </Flex>
          </>
        )}
      </ConnectedForm>
    </Stack>
  );
};

export default ForgetPasswordForm;
