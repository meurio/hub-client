import React from 'react';
import { shallow } from "enzyme";
import { S3UploadField, S3UploadFileField } from '../src';

const dummyUseField = {
  input: { onChange: jest.fn(), value: "" },
  meta: { error: undefined, touched: false }
}

jest.mock('react-final-form', () => ({  
  useField: (_name: string, _config: any) => ({
    input: { ...dummyUseField.input, value: _config?.defaultValue || "" },
    meta: dummyUseField.meta
  })
}));

describe('S3UploadField', () => {
  it('renders without crashing', () => {
    const component = shallow(<S3UploadField name="image" signingUrl="http://localhost:3000/uploads" />);
    expect(component).toBeTruthy();
  });

  it('renders S3UploadFileField', () => {
    const signingUrl = "http://localhost:3000/uploads";
    const component = shallow(
      <S3UploadField
        name="image"
        signingUrl={signingUrl}
      />
    );

    expect(component.find(S3UploadFileField).length).toBe(1);
    expect(component.find(S3UploadFileField).prop("signingUrl")).toBe(signingUrl);
  });

  it('renders FormLabel and FormHelperText', () => {
    const label = "Upload image";
    const helpText = "max size is 5mb";
    const signingUrl = "http://localhost:3000/uploads";
    const component = shallow(
      <S3UploadField
        name="image"
        signingUrl={signingUrl}
        label={label}
        helpText={helpText}
      />
    );
    
    expect(component.find("FormLabel").prop("children")).toBe(label);
    expect(component.find("FormHelperText").prop("children")).toBe(helpText);
  });
});
