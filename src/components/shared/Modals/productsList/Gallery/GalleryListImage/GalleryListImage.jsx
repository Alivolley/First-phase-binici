import { Box } from '@mui/material';

import GalleryImageLoader from '../GalleryImageLoader/GalleryImageLoader';

export default function GalleryListImage({
  list,
  loading,
  onChangeDefault,
  onDelete,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '15px',
        flexWrap: 'wrap',
      }}
    >
      {(loading ? new Array(4).fill(' ') : list)?.map((i, index) => (
        <GalleryImageLoader
          src={i?.downloadUrl}
          guid={i?.guid}
          isDefault={i?.isDefault}
          key={index}
          loading={loading}
          onDelete={() => onDelete(i?.guid)}
          onChangeDefault={() => onChangeDefault(i?.guid)}
        />
      ))}
    </Box>
  );
}
