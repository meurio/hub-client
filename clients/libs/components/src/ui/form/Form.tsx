import styled from "styled-components";

interface FormProps {
  direction?: "row" | "column";
}

const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
`;

Form.defaultProps = {
  direction: "column",
};

export default Form;
