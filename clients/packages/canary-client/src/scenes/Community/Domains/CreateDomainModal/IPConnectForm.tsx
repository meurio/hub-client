import React from 'react';
import styled from 'styled-components';
import {
  Heading,
  Text,
  toast,
  Success,
  Icon,
  Grid,
  GridItem,
  Button
} from 'bonde-components';
import copy from 'clipboard-copy';
import Radio from './Radio';
import { MainTitle } from '../Styles';

const TopicList = styled.ol`
  margin-left: 20px;
  padding: 18px 0;
`;

type Props = {
  status?: string
  changeStatus: any
}

const IPConnectForm: React.FC<Props> = ({ status, changeStatus }) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6} rowGap={2}>
      <GridItem colSpan={6}>
        <Text>Para gerenciar ser domínio externamente, você precisa apontá-lo para o IP do BONDE, assim podemos encontrá-lo e conectá-lo à sua página.</Text>
      </GridItem>
      <GridItem colSpan={6} rowSpan={2}>
        <Heading as="h4" size="xl">Passo a passo</Heading>
        <TopicList>
          <li>
            <Text>{`Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas configurações do domínio.`}</Text>
          </li>
          <li>
            <Text>{`Procure a opção "Manage DNS" e clique nela.`}</Text>
          </li>
          <li>
            <Text>{`Encontre o registro A ("Type A")`}</Text>
          </li>
          <li>
            <Text>{`Em "Points to", preencha com o Endereço de IP ao lado.`}</Text>
          </li>
          <li>
            <Text>Clique em salvar.</Text>
          </li>
        </TopicList>
      </GridItem>
      <GridItem colSpan={6}>
        <MainTitle>
          {`Registros de nome (Name servers)`}
        </MainTitle>
        <Grid templateColumns='1fr auto' p={4}>
          <GridItem>
            <Text>{process.env.REACT_APP_AWS_ROUTE_IP || "not_found_ip"}</Text>
          </GridItem>
          <GridItem>
            <Button
              variant="link"
              colorScheme="gray"
              onClick={() => {
                if (process.env.REACT_APP_AWS_ROUTE_IP) {
                  copy(process.env.REACT_APP_AWS_ROUTE_IP || 'not_found_ip');
                  toast(<Success message='Endereço de IP copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                }
                console.error("Houve um problema, contate o administrador");
              }}
            >
              <Icon size='small' name='Copy' /> Copiar
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={12}>
        <Radio>
          <input
            type='radio'
            value='registered'
            checked={status === 'registered'}
            onChange={changeStatus}
          />
          <Text>Os registros de nome foram atualizados.</Text>
        </Radio>
      </GridItem>
    </Grid>
  )
}

export default IPConnectForm;