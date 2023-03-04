import styled from '@emotion/styled';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useGetPrintProductPackaging from 'api/productDetail/useGetPrintProductPackaging/useGetPrintProductPackaging';
import SpinnerLoader from 'components/shared/SpinnerLoader/SpinnerLoader';
import React, { useEffect } from 'react';

const ProductPackagingPrintModal = ({
  open,
  handleClose,
  chosenPrintProduct,
}) => {
  const [getProductItem, loading, productItem] = useGetPrintProductPackaging(
    chosenPrintProduct.id,
  );

  useEffect(() => {
    chosenPrintProduct.id && getProductItem();
  }, [chosenPrintProduct]);

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DialogTitle sx={{ textAlign: 'center' }}>
            {productItem.package}
          </DialogTitle>

          <DialogContent>
            <ImageQr src={productItem.qr} alt={productItem.package} />
          </DialogContent>

          <DialogActions sx={{ gap: 1, padding: 3 }}>
            <Button onClick={handleClose} variant="contained">
              انصراف
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => window.print()}
            >
              پرینت
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ProductPackagingPrintModal;

const ImageQr = styled.img`
  width: 100%;
`;
