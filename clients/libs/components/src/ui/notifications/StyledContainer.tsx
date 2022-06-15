import styled from "styled-components";
import { ToastContainer } from "react-toastify";

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    font-family: Nunito Sans;
    font-size: 16px;
    color: #fff;

    padding: 15px 18px;
  }
  .Toastify__toast--success {
    background-color: #50e3c2;
  }
`;

export default StyledContainer;
