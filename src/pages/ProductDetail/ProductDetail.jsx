import useProductDetail from 'api/productDetail/useProductDetail/useProductDetail';
import ProductDetailHeader from 'components/shared/ProductDetailHeader/ProductDetailHeader';
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
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <ProductDetailHeader detail={productDetailObj} />
      )}
    </>
  );
};

export default ProductDetail;
