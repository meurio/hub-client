import React from 'react';
import { shallow } from 'enzyme';
import { Box, Button, Flex, Form, SimpleGrid } from "@bonde/components";
import { CommunityForm } from '.';

describe("components/CommunityForm", () => {
  it("renders without crashing", () => {
    const scene = shallow(<CommunityForm />);
    expect(scene).toBeTruthy();
  });

  it("renders SimpleGrid", () => {
    const columns = 1;
    const scene = shallow(<CommunityForm columns={columns} />);
    const form = scene.find(Form).renderProp("children")({} as any);

    expect(form.find(SimpleGrid).length).toBe(1);
    expect(form.find(SimpleGrid).prop("columns")).toBe(columns);
  });

  it("renders Box like a form", () => {
    const handleSubmit = jest.fn()
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({ handleSubmit } as any);

    expect(form.find(Box).length).toBe(1);
    expect(form.find(Box).prop("as")).toBe("form");
    expect(form.find(Box).prop("p")).toBe(6);
    expect(form.find(Box).prop("bg")).toBe("white");
    expect(form.find(Box).prop("onSubmit")).toBe(handleSubmit);
  });

  it("renders submit Button", () => {
    const handleSubmit = jest.fn()
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({ handleSubmit } as any);

    expect(form.find(Button).length).toBe(1);
    expect(form.find(Button).prop("disabled")).toBe(true);
  });

  it("renders Button disabled when submiting", () => {
    const submitting = true;
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({ submitting } as any);

    expect(form.find(Button).length).toBe(1);
    expect(form.find(Button).prop("disabled")).toBe(true);
  });

  it("renders Button enabled when dirty is true", () => {
    const dirty = true;
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({ dirty } as any);

    expect(form.find(Button).length).toBe(1);
    expect(form.find(Button).prop("disabled")).toBe(undefined);
  });

  it("renders Button disabled when invalid", () => {
    const invalid = true;
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({ invalid } as any);

    expect(form.find(Button).length).toBe(1);
    expect(form.find(Button).prop("disabled")).toBe(true);
  });

  it("renders Button to right", () => {
    const scene = shallow(<CommunityForm />);
    const form = scene.find(Form).renderProp("children")({} as any);

    expect(form.find(Flex).prop("justify")).toBe("flex-end");
  });
});