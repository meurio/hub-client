import React from "react";
import {
  FormSpy,
  FormSpyRenderProps,
  Grid,
  GridItem,
  Heading,
  InputField,
  UnorderedList,
  ListItem,
  SelectInputField,
  Stack,
  Text
} from "@bonde/components";
import { CommunityForm } from "./components";
import { banks } from "./data";

const Recipient = () => {
  return (
    <CommunityForm columns={1}>
      <Grid templateColumns={["repeat(3, 1fr)", null, null, "repeat(6, 1fr)"]} gap={6}>
        <GridItem colSpan={3}>
          <SelectInputField
            name="recipient.back_account.bank_code"
            label="Banco"
            placeholder="Selecione o banco"
          >
            {banks.map((bank) => (
              <option key={`bank-code-${bank.code}`} value={bank.code}>
                {`${bank.code} - ${bank.name}`}
              </option>
            ))}
          </SelectInputField>
        </GridItem>
        <GridItem colSpan={3}>
          <SelectInputField
            name="recipient.back_account.type"
            label="Tipo de conta"
            placeholder="Selecione o tipo de conta"
          >
            <option value="conta_corrente">Corrente</option>
            <option value="conta_poupanca">Poupança</option>
          </SelectInputField>
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            name="recipient.bank_account.agencia"
            type="number"
            label="Agência"
            placeholder="Digite apenas números"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            name="recipient.bank_account.agencia_dv"
            type="number"
            label="Dígito"
            placeholder="Ex: 0"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            name="recipient.bank_account.conta"
            type="number"
            label="Conta"
            placeholder="Digite apenas números"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            name="recipient.bank_account.conta_dv"
            type="number"
            label="Dígito"
            placeholder="Ex: 0"
          />
        </GridItem>
        <GridItem colSpan={3}>
          <InputField
            name="recipient.bank_account.legal_name"
            label="Nome / Razão Social"
            placeholder="Ex: Minha Sampa"
          />
        </GridItem>
        <GridItem colSpan={3}>
          <InputField
            name="recipient.bank_account.document_number"
            label="CPF / CNPJ"
            placeholder="Digite apenas números"
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Stack spacing={2} mb={2}>
            <Heading as="h3" size="md">Data de transferência</Heading>
            <Text>Defina o dia em que o valor arrecadado pela sua comunidade será automaticamente transferido para a conta cadastrada aqui.</Text>
          </Stack>
          <Grid templateColumns={["repeat(1, 1fr)", null, null, "repeat(2, 1fr)"]} gap={6}>
            <GridItem colSpan={1}>
              <SelectInputField
                name="recipient.transfer_interval"
                label="Recorrência"
                placeholder="Selecione a recorrência"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </SelectInputField>
            </GridItem>
            <GridItem colSpan={1}>
              <FormSpy>
                {({ values }: FormSpyRenderProps) => {
                  return (
                    <SelectInputField
                      name="recipient.transfer_day"
                      label="Dia da transferência"
                      placeholder="Selecione o dia"
                    >
                      {values?.recipient?.transfer_interval === 'monthly' ? (
                        <>
                          <option value='1'>1</option>
                          <option value='6'>6</option>
                          <option value='11'>11</option>
                          <option value='16'>16</option>
                          <option value='21'>21</option>
                          <option value='26'>26</option>
                        </>
                      ) : (
                        <>
                          <option value='1'>Segunda</option>
                          <option value='2'>Terça</option>
                          <option value='3'>Quarta</option>
                          <option value='4'>Quinta</option>
                          <option value='5'>Sexta</option>
                        </>
                      )}
                    </SelectInputField>
                  );
                }}
              </FormSpy>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={3}>
          <Stack spacing={2} mb={2}>
            <Heading as="h3" size="md">Observações</Heading>
            <UnorderedList pl={6}>
              <ListItem>As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário.</ListItem>
              <ListItem>Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será assim: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.</ListItem>
            </UnorderedList>
          </Stack>
        </GridItem>
      </Grid>
    </CommunityForm>
  );
}

export default Recipient;