import React from "react";
import {
  InputField,
  S3UploadField
} from "@bonde/components";
import { CommunityForm } from "./components";

const Settings = () => {
  return (
    <CommunityForm>
      <S3UploadField
        signingUrl="http://localhost:3000/uploads"
        name="image"
        label="Logo da comunidade"
        helpText="Formato JPEG ou PNG, até 1mb."
      />
      <InputField
        name="name"
        label="Nome"
        placeholder="Insira o nome da sua comunidade"
      />
      <InputField
        name="description"
        label="Descrição"
        placeholder="Insira uma descrição para sua comunidade"
      />
      <InputField
        name="city"
        label="Cidade"
        placeholder="Cidade sede ou foco de atuação"
      />
      <InputField
        name="email_template_from"
        label="E-mail padrão"
        placeholder="Ex: Nome do remetente <remetente@provedor.com>"
      />
      <InputField
        name="signature.name"
        label="Assinatura da comunidade"
        placeholder="Nome da comunidade"
      />
      <InputField
        name="signature.url"
        label="Site da comunidade"
        placeholder="Insira o link do site ou página oficial da comunidade"
      />
    </CommunityForm>
  );
}

export default Settings;