import { css } from '@emotion/react';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { IconButton, Skeleton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function GalleryImageLoader({
  src,
  loading,
  isDefault,
  onChangeDefault,
  onDelete,
}) {
  const [loader, setLoader] = useState(true);
  const isLoading = loader || loading;
  return (
    <Card elevation={2} dir="rtl">
      <ImageContainer elevation={1}>
        <Image src={src} loading={isLoading} onLoad={() => setLoader(false)} />
        {isLoading ? (
          <Skeleton width="100%" variant="rectangular" height="100%" />
        ) : null}
      </ImageContainer>
      <BtnContainer>
        <IconButton
          sx={{ color: 'text.primary' }}
          disabled={isLoading}
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          sx={{ color: 'text.primary' }}
          disabled={isLoading || isDefault}
          onClick={onChangeDefault}
        >
          {isDefault ? (
            <TaskAltOutlinedIcon />
          ) : (
            <RadioButtonUncheckedOutlinedIcon />
          )}
        </IconButton>
      </BtnContainer>
    </Card>
  );
}

const Image = styled.img`
  ${({ loading }) =>
    loading
      ? css`
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          left: -999999px;
        `
      : css`
          visibility: visible;
          opacity: 1;
          pointer-events: all;
          position: relative;
          left: unset;
          object-fit: cover;
          transition: 0.25s opacity;
          width: 100%;
        `}
`;

const Card = styled(Paper)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  width: 240px;
  border-radius: 12px;
`;

const ImageContainer = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  min-width: 137px;
  max-width: 137px;
  height: 137px;
  border-radius: 8px;
  overflow: hidden;
`;

const BtnContainer = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;
