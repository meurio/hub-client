import React from 'react';
import { shallow } from 'enzyme';
import { Button, Heading, Text } from 'bonde-components/chakra';
import LoadingIcon from '../../../icons/LoadingIcon';
import { CertificateStatus } from './CertificateStatus';

const authenticateSpy = jest.fn((values: any) => ({ data: {} }));

jest.mock('bonde-core-tools', () => ({
  useMutation: () => [authenticateSpy],
  gql: jest.fn()
}));

describe("CertificateStatus tests", () => {
  const defaultMessage = 'Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.';
  const activeMessage = ["O endereço ", <b>www.nossas.link</b>, " está ativo e com certificado de segurança."];
  const activeMessage2 = ["O endereço ", <b>www.nova-pagina.nossas.link</b>, " está ativo e com certificado de segurança."];
  const inactiveMessage = 'Inativo';
  const failedMessage = 'Ops, falta configurar o ip'

  it('should renders is ok', () => {
    const wrapper = shallow(<CertificateStatus />);
    expect(wrapper).toBeTruthy();

  });

  it('should render default/inactive status message', () => {
    const wrapper = shallow(<CertificateStatus />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual(inactiveMessage);
    expect(wrapper.find(Text).at(1).props().children).toEqual(defaultMessage);

  });

  it('should render message when certificate is in progress', () => {
    const hostedZones = [
      { id: 2, status: '', domain_name: 'teste.org', certificates: [], is_external_domain: false }
    ]
    const customDomain = 'teste.org';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(LoadingIcon).at(0));
    expect(wrapper.find(Text).at(0));
  });

  it('should render active status', () => {
    const hostedZones = [
      {
        id: 2,
        status: '',
        domain_name: 'nossas.link',
        is_external_domain: false,
        certificates: [{ id: 5, domain: 'nossas.link', is_active: true, dns_hosted_zone_id: 2 }]
      }
    ]
    const customDomain = 'www.nossas.link';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual('Ativo');
    expect(wrapper.find(Text).at(1).props().children).toEqual(activeMessage);
  });

  it('should render active status when subdomain', () => {
    const hostedZones = [
      {
        id: 2,
        status: '',
        domain_name: 'nossas.link',
        is_external_domain: false,
        certificates: [{ id: 5, domain: 'nossas.link', is_active: true, dns_hosted_zone_id: 2 }]
      }
    ]
    const customDomain = 'www.nova-pagina.nossas.link';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(Heading).props().children).toEqual('Status');
    expect(wrapper.find(Text).at(0).props().children).toEqual('Ativo');
    expect(wrapper.find(Text).at(1).props().children).toEqual(activeMessage2);

  });

  it('should render when ip is failed', () => {
    const hostedZones = [
      { id: 2, status: '', domain_name: 'teste.org', certificates: [], ns_ok: false, is_external_domain: true }
    ]
    const customDomain = 'www.teste.org';

    const wrapper = shallow(<CertificateStatus customDomain={customDomain} hostedZones={hostedZones} />);

    expect(wrapper.find(LoadingIcon).at(0));
    expect(wrapper.find(Text).at(0).props().children).toEqual(failedMessage);
    expect(wrapper.find(Button));

    const button = wrapper.find(Button);
    button.simulate('click');
  })
});
