import UploadImageIcon from "../../../components/UploadFile/UploadImageIcon";

// Validate email_template_from pattern
const emailTemplateFromPattern = "^[a-zà-úA-ZÀ-Ú0-9 ]+<(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))>$";

const emailTemplateFromIsInvalid = "Padrão inválido. Ex: Nome do remente <email@host.com>";

export const transformErrors = (errors: any) => {
  return errors.map((error: any) => {
    if (error.name === "pattern") {
      error.message = emailTemplateFromIsInvalid
    }
    return error;
  });
}

// Define JSON Schema Form
export const schema: any = {
  type: "object",
  required: ["name", "email_template_from"],
  properties: {
    image: {
      type: "string",
      title: "Logo da comunidade"
    },
    name: {
      type: "string",
      title: "Nome",
    },
    description: {
      type: "string",
      title: "Descrição"
    },
    city: {
      type: "string",
      title: "Cidade"
    },
    email_template_from: {
      type: "string",
      title: "E-mail padrão",
      pattern: emailTemplateFromPattern
    },
    signature: {
      type: "object",
      properties: {
        name: {
          type: "string",
          title: "Assinatura da comunidade"
        },
        url: {
          type: "string",
          title: "Site da comunidade"
        }
      }
    }
  }
};

export const uiSchema = {
  image: {
    "ui:field": "s3",
    "ui:help": "Formato JPEG ou PNG, até 1mb.",
    "ui:options": {
      alt: "Upload de image da comunidade",
      signingUrl: process.env.REACT_APP_UPLOADS_URL,
      uploadImageIcon: UploadImageIcon
    }
  },
  name: {
    "ui:placeholder": "Insira o nome da sua comunidade"
  },
  description: {
    "ui:placeholder": "Insira uma descrição para sua comunidade"
  },
  city: {
    "ui:placeholder": "Cidade sede ou foco da atuação"
  },
  email_template_from: {
    "ui:help": "Escolha um email ao qual tenha fácil acesso. Ele só sera usado pelo BONDE quando não for definido um email especifico em uma ferramenta da sua comunidade",
    "ui:placeholder": "Ex: Nome do remetente <remetente@provedor.com>",
    "ui:options": {
      inputType: "email"
    }
  },
  signature: {
    name: {
      "ui:placeholder": "Nome da comunidade"
    },
    url: {
      "ui:placeholder": "Insira o link do site ou página oficial da sua comunidade"
    },
    "ui:options": {
      onlyProperties: true
    }
  }
}