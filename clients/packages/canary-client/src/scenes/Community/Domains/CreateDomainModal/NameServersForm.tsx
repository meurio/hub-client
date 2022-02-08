import React from 'react';
import styled from 'styled-components';
import {
  Heading,
  Text,
  Button,
  Stack,
  Icon,
  Grid,
  GridItem
} from 'bonde-components';
import NameServers from '../NameServers';
import Radio from './Radio';

const TopicList = styled.ol`
  margin-left: 20px;
  padding: 18px 0;
`;

type DNSHostedZone = {
  id: number
  name_servers: string[]
}

type Props = {
  status?: string
  changeStatus: any
  connectByIP: any
  dnsHostedZone: DNSHostedZone
}

const NameServersForm: React.FC<Props> = ({
  status,
  changeStatus,
  connectByIP,
  dnsHostedZone
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={20} rowGap={6}>
      <GridItem colSpan={1}>
        <Heading as="h4" size="xl">Passo a passo</Heading>
        <TopicList>
          <li>
            <Text>Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas <b>configurações do domínio</b>.</Text>
          </li>
          <li>
            <Text>Procure a opção <b>{`"Gerenciar DNS"`}</b> e clique nela.</Text>
          </li>
          <li>
            <Text>Em <b>{`"Servidores de Nome"`}</b>, selecione <b>{`"alterar"`}</b>. Depois, clique em <b>{`"Inserir meus próprios servidores de nome"`}</b>.</Text>
          </li>
          <li>
            <Text><b>Copie os 4 códigos abaixo e cole</b> nos campos que apareceram, um em cada campo. (Se necessário, pode adicionar mais campos até colar todos os quatro.)</Text>
          </li>
          <li>
            <Text>Clique em salvar.</Text>
          </li>
        </TopicList>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack direction="column" spacing={4}>
          <NameServers dnsHostedZone={dnsHostedZone} />
          <Radio>
            <input
              type='radio'
              value='registered'
              checked={status === 'registered'}
              onChange={changeStatus}
              />
            <Text>Os registros de nome foram atualizados.</Text>
          </Radio>
        </Stack>
      </GridItem>
      <GridItem colSpan={2}>
        <Button
          isFullWidth
          justifyContent="space-between"
          variant="link"
          colorScheme="gray"
          type='button'
          onClick={connectByIP}
        >
          Prefiro conectar por IP (Avançado)
          <Icon name='ArrowRight' size='small' />
        </Button>
      </GridItem>
    </Grid>
  )
}

export default NameServersForm;