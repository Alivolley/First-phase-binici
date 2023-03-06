import MuiDialog from '@mui/material/Dialog';
import { forwardRef } from 'react';

// ========= || GALLERY DIALOGS || ========= //

const Dialog = forwardRef((props, ref) => (
  <MuiDialog
    {...props}
    ref={ref}
    PaperProps={{
      sx: {
        borderRadius: '20px',
      },
    }}
  />
));

Dialog.displayName = 'GalleryDialog';

export default Dialog;
