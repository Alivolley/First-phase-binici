import styled from '@emotion/styled';
import Close from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';

export default function GalleryHeader({ onClose, onUpload, label=null }) {
  return (
    <Container>
      <Typography fontSize="19px" fontWeight="bolder">
        {label || 'گالری تصاویر'}
      </Typography>
      <FlexCenter>
        {onUpload ? (
          <Button
            size="large"
            sx={{ bgcolor: '#27348B' }}
            variant="contained"
            onClick={onUpload}
          >
            آپلود
          </Button>
        ) : null}
        <IconButton onClick={onClose}>
          <Close fontSize="large" />
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
