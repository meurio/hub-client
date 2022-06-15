import styled from "styled-components";
import Hint from "./Hint";

interface FormFieldProps {
  direction?: "row" | "column";
}

const FormField = styled.div<FormFieldProps>`
  position: relative;
  display: flex;
  padding: 0 0 30px;

  flex-direction: ${(props) => props.direction};
  ${(props) =>
    props.direction === "row" &&
    `
    align-items: flex-end;
  `}

  ${Hint} {
    position: absolute;
    right: 0;
  }
`;

FormField.defaultProps = {
  direction: "column",
};

export default FormField;
