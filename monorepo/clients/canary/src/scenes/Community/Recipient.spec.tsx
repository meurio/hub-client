import React from 'react';
import { shallow } from 'enzyme';
import { FormSpy, InputField, SelectInputField } from '@bonde/components';
import { CommunityForm } from "./components";
import Recipient from "./Recipient";

describe("Community/Recipient", () => {
  it('renders without crashing', () => {
    const scene = shallow(<Recipient />);
    expect(scene).toBeTruthy();
  });

  it("renders CommunityForm", () => {
    const scene = shallow(<Recipient />);
    const form = scene.find(CommunityForm);

    expect(form.length).toBe(1);
  });

  it("renders Fields in ordering", () => {
    const scene = shallow(<Recipient />);

    // SelectInputField
    expect(scene.find(SelectInputField).at(0).prop("name")).toBe("recipient.back_account.bank_code");
    expect(scene.find(SelectInputField).at(1).prop("name")).toBe("recipient.back_account.type");
    expect(scene.find(SelectInputField).at(2).prop("name")).toBe("recipient.transfer_interval");
    // InputField
    expect(scene.find(InputField).at(0).prop("name")).toBe("recipient.bank_account.agencia");
    expect(scene.find(InputField).at(1).prop("name")).toBe("recipient.bank_account.agencia_dv");
    expect(scene.find(InputField).at(2).prop("name")).toBe("recipient.bank_account.conta");
    expect(scene.find(InputField).at(3).prop("name")).toBe("recipient.bank_account.conta_dv");
    expect(scene.find(InputField).at(4).prop("name")).toBe("recipient.bank_account.legal_name");
    expect(scene.find(InputField).at(5).prop("name")).toBe("recipient.bank_account.document_number");
  });

  it("renders SelectInputField for monthly values", () => {
    const values = { recipient: { transfer_interval: "monthly" } };
    const scene = shallow(<Recipient />);
    const formSpy = scene.find(FormSpy).renderProp("children")({ values } as any);

    const expected = (
      <React.Fragment>
        <option value="1">1</option>
        <option value="6">6</option>
        <option value="11">11</option>
        <option value="16">16</option>
        <option value="21">21</option>
        <option value="26">26</option>
      </React.Fragment>
    );

    expect(formSpy.find(SelectInputField).prop("children")).toMatchObject(expected);
  });

  it("renders SelectInputField for weekly values", () => {
    const values = { recipient: { transfer_interval: "weekly" } };
    const scene = shallow(<Recipient />);
    const formSpy = scene.find(FormSpy).renderProp("children")({ values } as any);

    const expected = (
      <React.Fragment>
        <option value='1'>Segunda</option>
        <option value='2'>Terça</option>
        <option value='3'>Quarta</option>
        <option value='4'>Quinta</option>
        <option value='5'>Sexta</option>
      </React.Fragment>
    );

    expect(formSpy.find(SelectInputField).prop("children")).toMatchObject(expected);
  });
});