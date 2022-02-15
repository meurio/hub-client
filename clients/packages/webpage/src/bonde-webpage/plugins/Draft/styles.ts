import styled from '@emotion/styled';

export const StyledButton = styled.button`
  border: 1px solid #222;
  color: #999;
  border-radius: 2px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  height: 100px;
  transition: 0.3s;
  width: 100%;
  font-family: inherit;
  cursor: pointer;
  line-height: 1.125rem;
  margin: 0;
  background-color: transparent;

  &:hover {
    text-decoration: none;
    background-color: hsla(0, 0%, 100%, 0.02);
  }
`;

export const Content = styled.span`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i.fa {
    font-size: 2rem;
    position: relative;
    margin-bottom: 5px;
  }
`;

export const DraftWidget = styled.div`
  background-color: rgba(0, 0, 0, 0.89);
  padding: 2.8rem;
  color: #999;
  text-align: center;
  border-radius: 3px;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-gap: 0.5rem;

  & .title {
    color: #999999;
    margin-bottom: 1.5rem;
  }
`;

export const DraftWidgetPublic = styled.div`
  min-height: 320px;
`;
