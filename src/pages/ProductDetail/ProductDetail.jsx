import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import useProductDetail from 'api/productDetail/useProductDetail/useProductDetail';
import BranchCreateDialog from 'components/shared/BranchSystemCreate/Dialog';
import BranchProductGallery from 'components/shared/Modals/productsList/Gallery/BranchProductGallery/BranchProductGallery';
import OriginProductGallery from 'components/shared/Modals/productsList/Gallery/OriginProductGallery/OriginProductGallery';
import ProductAccordion from 'components/shared/productDetail/ProductAccordion/ProductAccordion';
import ProductDetailHeader from 'components/shared/productDetail/ProductDetailHeader/ProductDetailHeader';
import SpinnerLoader from 'components/shared/SpinnerLoader/SpinnerLoader';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { guid } = useParams();
  const [getProductDetail, loading, productDetailObj] = useProductDetail(guid);

  const [productGallery, setProductGallery] = React.useState(false);

  const [branchGallery, setBranchGallery] = React.useState(false);

  const [branchSystemEdit, setBranchSystemEdit] = React.useState(null);

  const [expand, setExpand] = React.useState(null);

  useEffect(() => {
    getProductDetail();
  }, []);

  function handleConfirmBranchEdit() {
    setBranchSystemEdit(null);
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <ProductDetailHeader
            detail={productDetailObj}
            setProductGallery={() => setProductGallery(true)}
            guid={guid}
          />

          <div>
            <Paper
              square
              elevation={2}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                bgcolor: 'rgba(15, 30, 50, .05)',
                p: 2,
              }}
            >
              <Typography
                sx={{ width: '400px', mr: '70px' }}
                color="text.secondary"
              >
                نام
              </Typography>
              <Typography color="text.secondary">کدینگ</Typography>
            </Paper>
            {productDetailObj?.branchList?.map((branch, index) => (
              <ProductAccordion
                detail={branch}
                keyIndex={index}
                key={branch.guid}
                getProductDetail={getProductDetail}
                setBranchGallery={() => setBranchGallery(branch.guid)}
                setSystemEdit={setBranchSystemEdit}
                expanded={expand}
                setExpand={() =>
                  setExpand(prev => (branch.guid === prev ? null : branch.guid))
                }
              />
            ))}
          </div>
        </>
      )}

      <OriginProductGallery
        open={productGallery}
        onClose={() => setProductGallery(false)}
        selected={guid}
      />

      <BranchProductGallery
        open={Boolean(branchGallery)}
        onClose={() => setBranchGallery(null)}
        selected={branchGallery}
      />

      <BranchCreateDialog
        open={!!branchSystemEdit}
        onClose={() => setBranchSystemEdit(null)}
        handleConfirm={handleConfirmBranchEdit}
        selected={branchSystemEdit}
      />
    </>
  );
};

export default ProductDetail;

const AccotdionsContainer = styled.div``;
