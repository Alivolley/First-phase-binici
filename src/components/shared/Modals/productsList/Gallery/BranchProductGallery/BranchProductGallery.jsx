import { Box, Button } from '@mui/material';
import useDeleteBranchGallery from 'api/productsList/gallery/branch/useDeleteBranchGallery/useDeleteBranchGallery';
import useGetBranchGallery from 'api/productsList/gallery/branch/useGetBranchGallery/useGetBranchGallery';
import useSetDefaultBranchGallery from 'api/productsList/gallery/branch/useSetDefaultBranchGallery/useSetDefaultBranchGallery';
import { useEffect, useState } from 'react';

import Dialog from '../GalleryDialogs/GalleryDialogs';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import GalleryListImage from '../GalleryListImage/GalleryListImage';
import GalleryUpload from '../GalleryUpload/GalleryUpload';

// ======== Origin product gallery dialog ======== //

const BranchProductGallery = ({ selected, onClose, open }) => {
  const [addImageDialog, setAddImageDialog] = useState(false);

  const {
    getBranchGallery,
    getBranchGalleryData,
    getBranchGalleryLoading,
    getBranchGalleryError,
    setBranchGalleryData,
  } = useGetBranchGallery();

  const { deleteBranchGalleryLoading, deleteBranchGallery } =
    useDeleteBranchGallery();

  const { setDefaultBranchGallery, setDefaultBranchGalleryLoading } =
    useSetDefaultBranchGallery();

  useEffect(() => {
    if (open && selected) {
      getBranchGallery(selected);
    }
  }, [open]);

  function handleChangeDefault(guid) {
    setDefaultBranchGallery(guid, selected, editedId => {
      setBranchGalleryData(prev => ({
        ...prev,
        value: prev.value?.map(i => ({ ...i, isDefault: editedId === i.guid })),
      }));
    });
  }

  function handleDelete(guid) {
    deleteBranchGallery(guid, selected, editedId => {
      setBranchGalleryData(prev => ({
        ...prev,
        value: prev.value?.filter(i => editedId !== i.guid),
      }));
    });
  }

  function handleAdd(newData) {
    getBranchGallery(selected);
    setAddImageDialog(false);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <GalleryHeader
        onClose={onClose}
        onUpload={() => setAddImageDialog(true)}
      />
      <Box sx={{ p: '15px', width: '100%' }}>
        {!getBranchGalleryError ? (
          <GalleryListImage
            loading={getBranchGalleryLoading}
            list={getBranchGalleryData?.value}
            onChangeDefault={handleChangeDefault}
            onDelete={handleDelete}
          />
        ) : (
          <Box sx={{ m: 'auto', py: '50px', width: '100%' }}>
            <Button
              onClick={() => getBranchGallery(selected)}
              variant="contained"
              sx={{ m: 'auto', display: 'block' }}
            >
              تلاش مجدد
            </Button>
          </Box>
        )}
      </Box>

      <GalleryUpload
        open={addImageDialog}
        onClose={() => setAddImageDialog(false)}
        type="branch"
        onSuccess={handleAdd}
        guid={selected}
      />
    </Dialog>
  );
};

export default BranchProductGallery;
