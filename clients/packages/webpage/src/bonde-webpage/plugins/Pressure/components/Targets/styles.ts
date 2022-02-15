import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: #eeeeee;
  padding: 15px 26px;
  font-family: inherit;
`;

export const Label = styled.div`
  color: #4c4c4c;
  font-size: 0.8em;
  margin: 0 0 12px 0;
  font-weight: 700;
`;

export const Container = styled.div`
  overflow-x: auto;
`;

export const ListWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Item = styled.label`
  background-color: #fff;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 3px;

  input[type='checkbox'] {
    margin: 0.25rem 0.8rem;
    margin-left: 0;
  }

  & > p {
    font-size: 0.8rem;
    font-weight: 600;
    color: #222;
    margin: 0;
    display: grid;
    grid-template-rows: auto;
  }
`;

export const Span = styled.span`
  white-space: nowrap;
  font-weight: 700;
`;
