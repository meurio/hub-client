import React from 'react';
import { shallow } from 'enzyme';
import { S3UploadField, InputField } from '@bonde/components';
import { CommunityForm } from "./components";
import Settings from "./Settings";

describe("Community/Settings", () => {
  it('renders without crashing', () => {
    const scene = shallow(<Settings />);
    expect(scene).toBeTruthy();
  });

  it("renders CommunityForm", () => {
    const scene = shallow(<Settings />);
    const form = scene.find(CommunityForm);

    expect(form.length).toBe(1);
  });

  it("renders Fields in ordering", () => {
    const scene = shallow(<Settings />);

    expect(scene.find(S3UploadField).length).toBe(1);
    expect(scene.find(InputField).at(0).prop("name")).toBe("name");
    expect(scene.find(InputField).at(1).prop("name")).toBe("description");
    expect(scene.find(InputField).at(2).prop("name")).toBe("city");
    expect(scene.find(InputField).at(3).prop("name")).toBe("email_template_from");
    expect(scene.find(InputField).at(4).prop("name")).toBe("signature.name");
    expect(scene.find(InputField).at(5).prop("name")).toBe("signature.url");
  });
})