import React from "react";
import {
  Button,
  ConnectedForm,
  Header,
  InputField,
  Link as LinkStyled,
  Flex,
  Text,
  Validators,
} from "bonde-components";
import { useMutation, gql } from "bonde-core-tools";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const { composeValidators, required, min } = Validators;

const resetPasswordMutation = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    reset_password_change(password: $password, token: $token) {
      first_name
      token
    }
  }
`;

const ResetPasswordForm = ({ token }: any) => {
  const { t } = useTranslation("auth");
  const [resetPassword] = useMutation(resetPasswordMutation);
  const history = useHistory();

  const submit = async (values: any) => {
    try {
      await resetPassword({ variables: values });
      history.push("/login");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Header.H2>{t("resetPassword.form.title")}</Header.H2>
      <Text marginBottom={1}>{t("resetPassword.form.subtitle")}</Text>
      <ConnectedForm initialValues={{ token }} onSubmit={submit}>
        {({ submitting }: any) => (
          <>
            <InputField
              name="password"
              type="password"
              label={t("resetPassword.fields.password.label")}
              hint={t("resetPassword.fields.password.hint")}
              validate={composeValidators(
                required(t("resetPassword.fields.password.required")),
                min(6, t("resetPassword.fields.password.min6"))
              )}
            />

            <Flex direction="row" alignItems="center" justify="space-between">
              <LinkStyled component={Link} to="/login">
                {t("resetPassword.form.cancel")}
              </LinkStyled>

              <Button type="submit" disabled={submitting}>
                {t("resetPassword.form.submit")}
              </Button>
            </Flex>

          </>
        )}
      </ConnectedForm>
    </>
  );
};

export default ResetPasswordForm;
