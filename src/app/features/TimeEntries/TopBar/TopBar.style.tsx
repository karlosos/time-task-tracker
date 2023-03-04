import styled from "@emotion/styled";

export const TopBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
`;

export const ElapsedTime = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
  padding: 4px;
  background-color: #17375b;
  color: #e9f2ff;
  font-family: Poppins;
  border-radius: 4px;
  width: 103px;
  height: 32px;
  user-select: none;
`;
