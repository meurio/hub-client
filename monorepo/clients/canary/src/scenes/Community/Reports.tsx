import React from "react";
import {
  Card,
  Gadget,
  GadgetHeader,
  Stack,
  RefreshIcon,
  NetworkIcon,
  TicketIcon,
  TicketRecurringIcon,
  BoltIcon,
  Text
} from "@bonde/components";

const Reports = () => {
  return (
    <Stack spacing={6}>
      <Gadget>
        <GadgetHeader title="Baixar relatórios" />
        <Stack direction="row" spacing={4}>
          <Card>
            <TicketIcon boxSize={8} />
            <Text color="black" fontWeight="bold">Relatório de doações</Text>
          </Card>
          <Card>
            <TicketRecurringIcon boxSize={8} />
            <Text color="black" fontWeight="bold">Doadores recorrentes</Text>
          </Card>
          <Card>
            <BoltIcon boxSize={8} />
            <Text color="black" fontWeight="bold">Relatório de ações</Text>
          </Card>
          <Card>
            <NetworkIcon boxSize={8} />
            <Text color="black" fontWeight="bold">Relatório de ativistas</Text>
          </Card>
        </Stack>
      </Gadget>
      <Stack direction="row" spacing={4}>
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={4}>
            <Gadget>
              <GadgetHeader
                title="Ativistas"
                helpText="Total de pessoas que já agiram em alguma página publicada pela sua comunidade."
              />
              <Card>
                <Text variant="number">246</Text>
              </Card>
            </Gadget>
            <Gadget>
              <GadgetHeader
                title="Ativistas recentes"
                helpText="Total de pessoas que agiram na sua comunidade nos últimos 90 dias."
              />
              <Card>
                <Text variant="number">162</Text>
              </Card>
            </Gadget>
          </Stack>
          <Stack direction="row" spacing={4}>
            <Gadget>
              <GadgetHeader
                title="Pressões recentes"
                helpText="Total de ações de pressão feitas em páginas da sua comunidade nos últimos 90 dias."
              />
              <Card>
              <Text variant="number">84</Text>
              </Card>
            </Gadget>
            <Gadget>
              <GadgetHeader
                title="Inscrições recentes"
                helpText="Total de ações de formulários publicados pela sua comunidade nos últimos 90 dias."
              />
              <Card>
                <Text variant="number">60</Text>
              </Card>
            </Gadget>
          </Stack>
        </Stack>
        <Gadget>
          <GadgetHeader
            title="Doações únicas (R$)"
            helpText="Valor total das doações únicas confirmadas na comunidade nos últimos 30 dias."
          />
          <Card fullSize direction="column">
            <Text variant="number">1.120,00</Text>
            <Text>Nos últimos 30 dias</Text>
          </Card>
        </Gadget>
        <Gadget>
          <GadgetHeader
            title="Doações recorrentes (R$)"
            helpText="Valor total das doações recorrentes confirmadas na comunidade nos últimos 30 dias."
          />
          <Card fullSize direction="column">
            <Text variant="number">2.980,00</Text>
            <Text>Nos últimos 30 dias</Text>
          </Card>
        </Gadget>
        <Gadget>
          <GadgetHeader
            title="Total arrecadado (R$)"
            helpText="Valor total de doações únicas e recorrentes arrecadadas pela comunidade até agora."
          />
          <Card fullSize direction="column">
            <Text variant="number">10.590,00</Text>
            <Stack direction="row" spacing={2} align="center">
              <RefreshIcon color="gray.200" boxSize={4} />
              <Text color="gray.200" fontWeight="bold" fontSize="xl">140,00</Text>
            </Stack>
            <Text>Nos últimos 30 dias</Text>
          </Card>
        </Gadget>
      </Stack>
    </Stack>
  );
}

export default Reports;