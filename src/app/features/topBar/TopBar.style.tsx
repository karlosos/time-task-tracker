import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const TopBarStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ElapsedTime = styled.div`
  &:hover {
    background-color: #eee;
    border-radius: 5px;
    cursor: pointer;
  }
  padding: 4px;
`

export const IconButtonStyled = styled(IconButton)`
  margin-right: 16px;
`

export const NewTimeEntryInputWrapper = styled.div`
  flex-grow: 1;
`

export const NewTimeEntryInput = styled.input`
  width: 300px;
  max-width: 300px;
`