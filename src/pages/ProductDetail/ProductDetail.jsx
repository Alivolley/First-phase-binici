import styled from '@emotion/styled';
import useProductDetail from 'api/productDetail/useProductDetail/useProductDetail';
import ProductAccordion from 'components/shared/productDetail/ProductAccordion/ProductAccordion';
import ProductDetailHeader from 'components/shared/productDetail/ProductDetailHeader/ProductDetailHeader';
import SpinnerLoader from 'components/shared/SpinnerLoader/SpinnerLoader';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { guid } = useParams();
  const [getProductDetail, loading, productDetailObj] = useProductDetail(guid);

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <ProductDetailHeader detail={productDetailObj} />
          <AccotdionsContainer>
            {productDetailObj.branchList.map(branch => (
              <ProductAccordion detail={branch} key={branch.guid} />
            ))}
          </AccotdionsContainer>
        </>
      )}
    </>
  );
};

export default ProductDetail;

const AccotdionsContainer = styled.div`
  margin-top: 50px;
`;
