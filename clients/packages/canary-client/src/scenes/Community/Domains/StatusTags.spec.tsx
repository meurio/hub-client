import React from 'react';
import { shallow } from 'enzyme';
import { Tag } from 'bonde-components/chakra';
import StatusTags from './StatusTags';

describe("StatusTags", () => {
  const dnsHostedZone: any = {
    status: 'created',
    certificates: []
  }

  it('should be render one Tag pending settings', () => {
    const wrapper = shallow(<StatusTags dnsHostedZone={dnsHostedZone} />)

    expect(wrapper.find(Tag).length).toEqual(1);
    expect(wrapper.find(Tag).props().colorScheme).toEqual('red');
    expect(wrapper.find(Tag).props().children).toEqual('Configuração pendente');
  });

  it('should be render two Tags to propagating and certificate', () => {
    const wrapper = shallow(<StatusTags dnsHostedZone={{...dnsHostedZone, status: 'propagating' }} />)

    expect(wrapper.find(Tag).length).toEqual(2);
    // Propagando
    expect(wrapper.find(Tag).at(0).props().colorScheme).toEqual('yellow');
    expect(wrapper.find(Tag).at(0).props().children).toEqual('Propagando');
    // Certificado pendente
    expect(wrapper.find(Tag).at(1).props().colorScheme).toEqual('yellow');
    expect(wrapper.find(Tag).at(1).props().children).toEqual('Certificado pendente');
  });

  it('should be render two Tags to propagated and certificate pending', () => {
    const wrapper = shallow(<StatusTags dnsHostedZone={{...dnsHostedZone, status: 'propagated', ns_ok: true }} />)

    expect(wrapper.find(Tag).length).toEqual(2);
    // Propagando
    expect(wrapper.find(Tag).at(0).props().colorScheme).toEqual('green');
    expect(wrapper.find(Tag).at(0).props().children).toEqual('Propagado');
    // Certificado pendente
    expect(wrapper.find(Tag).at(1).props().colorScheme).toEqual('yellow');
    expect(wrapper.find(Tag).at(1).props().children).toEqual('Certificado pendente');
  });

  it('should be render two Tags to propagated and certificated', () => {
    const wrapper = shallow(<StatusTags dnsHostedZone={{ ...dnsHostedZone, status: 'propagated', ns_ok: true, certificates: [{ is_active: true }] }} />)

    expect(wrapper.find(Tag).length).toEqual(2);
    // Propagando
    expect(wrapper.find(Tag).at(0).props().colorScheme).toEqual('green');
    expect(wrapper.find(Tag).at(0).props().children).toEqual('Propagado');
    // Certificado pendente
    expect(wrapper.find(Tag).at(1).props().colorScheme).toEqual('green');
    expect(wrapper.find(Tag).at(1).props().children).toEqual('Certificado');
  });
})