/* eslint-disable react/function-component-definition */
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import useInsertBranchGallery from 'api/productsList/gallery/branch/useInsertBranchGallery/useInsertBranchGallery';
import useInsertOriginGallery from 'api/productsList/gallery/origin/useInsertOriginGallery/useInsertOriginGallery';
import FileUploader from 'components/shared/fileUploader/FileUploader';
import { useState } from 'react';

import Dialog from '../GalleryDialogs/GalleryDialogs';
import GalleryHeader from '../GalleryHeader/GalleryHeader';

// =========== || Gallery uploader for both origin and branch || ==========//

export default function GalleryUpload({
  type,
  guid,
  onSuccess,
  open,
  onClose,
}) {
  const [image, setImage] = useState({
    file: [],
    documentGuid: '',
  });

  const { insertOriginGallery, insertOriginGalleryLoading } =
    useInsertOriginGallery();

  const { insertBranchGallery, insertBranchGalleryLoading } =
    useInsertBranchGallery();

  function handlePost() {
    switch (type) {
      case 'origin':
        insertOriginGallery(guid, [image?.documentGuid], onSuccess);
        break;
      case 'branch':
        insertBranchGallery(guid, [image?.documentGuid], onSuccess);
        break;
      default:
    }
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <GalleryHeader onClose={onClose} />

      <Box sx={{ p: 3 }}>
        <UploadArea>
          <FileUploader
            customConfig={{
              allowMultiple: true,
              maxFiles: 1000,
            }}
            files={image.file}
            processFileHandler={(error, file) => {
              setImage(prev => ({ ...prev, documentGuid: file.serverId }));
            }}
            updateFileHandler={fileItems =>
              setImage(prev => ({
                ...prev,
                file: fileItems.map(fileitem => fileitem.file),
              }))
            }
          />
        </UploadArea>

        <ButtonContainer>
          <Button
            sx={{ bgcolor: '#27348B' }}
            onClick={handlePost}
            size="large"
            variant="contained"
            color="primary"
            disabled={insertOriginGalleryLoading || insertBranchGalleryLoading}
          >
            تایید
          </Button>
          <Button
            size="large"
            onClick={onClose}
            variant="contained"
            color="warning"
          >
            انصراف
          </Button>
        </ButtonContainer>
      </Box>
    </Dialog>
  );
}

const UploadArea = styled.div`
  display: block;
  justify-content: center;
  padding: 20px;
  width: 100%;
  border-radius: 16px;
  background-color: #edf0f4;
  & .filepond--credits {
    display: none !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-top: 35px;
`;
