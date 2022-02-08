import styled from '@emotion/styled';
import { Form as FinalForm } from 'react-final-form';
import type { FormProps as FormFinalProps, FormRenderProps } from 'react-final-form';

export interface FormStyledProperties {
  direction?: 'row' | 'column';
}

const FormStyled = styled.form<FormStyledProperties>`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
`;

export interface FormProps extends FormFinalProps, FormStyledProperties {
  children(formProps: FormRenderProps): any;
  onSubmit(values: any): void;
  initialValues: any;
  mutators: any;
}

const Form: React.FC<FormProps> = ({
  children,
  initialValues,
  mutators,
  onSubmit
}) => (
  <FinalForm onSubmit={onSubmit} initialValues={initialValues} mutators={mutators}>
    {({ handleSubmit, ...formProps }: any) => (
      <FormStyled onSubmit={handleSubmit}>
        {children(formProps)}
      </FormStyled>
    )}
  </FinalForm>
);

export default Form;