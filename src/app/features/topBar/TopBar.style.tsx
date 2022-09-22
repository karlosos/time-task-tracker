import styled from "@emotion/styled";

export const TopBarStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 8px;
  border: 1px solid #F5F5F5;
`;

export const ElapsedTime = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
  padding: 4px;
  background-color: #17375B;
  color: #E9F2FF;
  font-family: Poppins;
  border-radius: 4px;
  width: 103px;
  height: 32px;
  user-select: none;
`
