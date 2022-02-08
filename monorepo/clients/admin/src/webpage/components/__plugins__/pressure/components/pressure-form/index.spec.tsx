/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
// import { shallowWithIntl } from 'intl/helpers'
import { shallow } from "enzyme";
import { PRESSURE_TYPE_EMAIL } from "../utils";
import PressureForm from '.'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-form', () => {
  const targets = ['Foo Bar <foo@bar.com>', 'Bar Foo <bar@foo.com>', 'Foo Baz <foo@baz.com>']
  const widget = { settings: {} }

  it('should render ok by default', () => {
    const wrapper = shallow(<PressureForm widget={widget} targetList={targets} />)
    expect(wrapper).to.be.ok
    // check if errors not render without submit
    expect(wrapper.find('span.red').length).to.equal(0)
  })

  it('should render buttonColor according passed in props', () => {
    const wrapper = shallow(<PressureForm widget={widget} targetList={targets} buttonColor="#fff" />)
    const node: any = wrapper.find('button[type="submit"]');
    expect(node.props().style.backgroundColor).to.equal('#fff')
  })

  it.skip('should return onSubmit values of state when clicked button', () => {
    let returned
    const state = {
      email: 'igor@local.cc',
      phone: '',
      name: 'igor',
      lastname: 'santos',
      city: '',
      subject: 'subject',
      body: 'body',
      pressureType: PRESSURE_TYPE_EMAIL
    }
    const onSubmit = data => { delete data.callManagement; returned = data };
    const wrapper = shallow(<PressureForm widget={widget} targetList={targets} onSubmit={onSubmit} />);
    wrapper.setState(state)

    wrapper.find('form').simulate('submit')
    expect(returned).to.deep.equal(state)
  })

  it('should render children', () => {
    const wrapper = shallow(
      <PressureForm widget={widget} targetList={targets}>
        <div className='foo-bar-children' />
      </PressureForm>
    );
    expect(wrapper.find('.foo-bar-children').length).to.equal(1)
  })

  it.skip('should set default subject and body by props', () => {
    const wrapper: any = shallow(
      <PressureForm
        widget={widget}
        subject='subject default'
        body='body default'
      />
    )
    expect(wrapper.instance().state.subject).to.equal('subject default')
    expect(wrapper.instance().state.body).to.equal('body default')
  })

  it('should change text of button when buttonText passed', () => {
    const wrapper = shallow(<PressureForm widget={widget} targetList={targets} buttonText='Enviar e-mail para o alvo' />)
    expect(wrapper.find('button[type="submit"]').text()).to.equal('Enviar e-mail para o alvo')
  })

  describe('phone pressure', () => {
    const targetsPhone = [
      'Isabelle Maitê <+551199999-9999>',
      'Betina Natália <+551199999-9999>',
      'Evelyn Pereira <+551199999-9999>',
      'Agatha Stefany Costa <+551199999-9999>'
    ]

    it('should render phone field when targets have phone number', () => {
      const wrapper = shallow(
        <PressureForm
          widget={widget}
          targetList={targetsPhone}
        />
      )
      expect(wrapper.find('#pressure-sender-phone-id').length).to.equal(1)
    })

    it('should not render email field when targets have phone number', () => {
      const wrapper = shallow(
        <PressureForm
          widget={widget}
          targetList={targetsPhone}
        />
      )
      expect(wrapper.find('#pressure-sender-email-id').length).to.equal(0)
    })
  })
})
