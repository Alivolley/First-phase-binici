import { Box, Button } from '@mui/material';
import useDeleteOriginGallery from 'api/productsList/gallery/origin/useDeleteOriginGallery/useDeleteOriginGallery';
import useGetOriginGallery from 'api/productsList/gallery/origin/useGetOriginGallery/useGetOriginGallery';
import useSetDefaultOriginGallery from 'api/productsList/gallery/origin/useSetDefaultOriginGallery/useSetDefaultOriginGallery';
import { useEffect, useState } from 'react';

import Dialog from '../GalleryDialogs/GalleryDialogs';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import GalleryListImage from '../GalleryListImage/GalleryListImage';
import GalleryUpload from '../GalleryUpload/GalleryUpload';

// ======== Origin product gallery dialog ======== //

const OriginProductGallery = ({ selected, onClose, open }) => {
  const [addImageDialog, setAddImageDialog] = useState(false);

  const {
    getOriginGallery,
    getOriginGalleryData,
    getOriginGalleryLoading,
    getOriginGalleryError,
    setOriginGalleryData,
  } = useGetOriginGallery();

  const { deleteOriginGalleryLoading, deleteOriginGallery } =
    useDeleteOriginGallery();

  const { setDefaultOriginGallery, setDefaultOriginGalleryLoading } =
    useSetDefaultOriginGallery();

  useEffect(() => {
    if (open && selected) {
      getOriginGallery(selected);
    }
  }, [open]);

  function handleChangeDefault(guid) {
    setDefaultOriginGallery(guid, selected, editedId => {
      setOriginGalleryData(prev => ({
        ...prev,
        value: prev.value?.map(i => ({ ...i, isDefault: editedId === i.guid })),
      }));
    });
  }

  function handleDelete(guid) {
    deleteOriginGallery(guid, selected, editedId => {
      setOriginGalleryData(prev => ({
        ...prev,
        value: prev.value?.filter(i => editedId !== i.guid),
      }));
    });
  }

  function handleAdd(newData) {
    getOriginGallery(selected);
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
        {!getOriginGalleryError ? (
          <GalleryListImage
            loading={getOriginGalleryLoading}
            list={getOriginGalleryData?.value}
            onChangeDefault={handleChangeDefault}
            onDelete={handleDelete}
          />
        ) : (
          <Box sx={{ m: 'auto', py: '50px', width: '100%' }}>
            <Button
              onClick={() => getOriginGallery(selected)}
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
        type="origin"
        onSuccess={handleAdd}
        guid={selected}
      />
    </Dialog>
  );
};

export default OriginProductGallery;
