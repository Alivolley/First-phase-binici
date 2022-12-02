import styled from '@emotion/styled';
import { SnackbarProvider } from 'notistack';

export const ToasterProvider = props => {
  return (
    <StyledSnackbarProvider maxSnack={3} autoHideDuration={4000}>
      {props.children}
    </StyledSnackbarProvider>
  );
};

const StyledSnackbarProvider = styled(SnackbarProvider)`
  direction: rtl;
`;
