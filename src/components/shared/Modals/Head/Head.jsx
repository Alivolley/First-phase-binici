import styled from '@emotion/styled';
import Close from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';

export default function Head({ onClose, onUpload, label = null }) {
  return (
    <Container>
      <Typography fontSize="19px" fontWeight="bolder">
        {label}
      </Typography>
      <FlexCenter>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </FlexCenter>
    </Container>
  );
}

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Container = styled.div`
  border-bottom: 1px solid #707070;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
  direction: rtl;
`;
