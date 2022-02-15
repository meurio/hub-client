import styled from '@emotion/styled';

export const Wrapper = styled.div`
  && {
    .editor--content > div {
      min-height: 370px;
    }
  }

  & .editor--toolbar {
    background-color: rgba(0, 0, 0, 0.5);
  }
  & .editor--toolbar > * {
    display: inline-block;
  }
  & .editor--toolbar .btn,
  .editor--toolbar .select,
  .editor--toolbar .input {
    min-height: 50px;
    background: none;
    border: none;
  }
  & .editor--toolbar .select,
  .editor--toolbar .input {
    border: 1px solid #c7c7c7 !important;
  }
  & .editor--toolbar .select {
    max-width: 200px;
  }
  & .editor--toolbar .input {
    max-width: 100px;
  }

  & .editor--content.editable table {
    border: 1px solid black;
    border-collapse: collapse;
  }

  & .editor--content.editable table > tbody > tr {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  & .editor--content.editable table > tbody > tr > td {
    border-right: 1px solid black;
  }

  & .editor--content iframe {
    max-width: 100%;
    max-height: 100%;
  }
`;
