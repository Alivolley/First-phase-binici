import useDeleteProduct from 'api/productsList/useDeleteProduct/useDeleteProduct';
import useProductsList from 'api/productsList/useProductsList/useProductsList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import ProductsListEditModal from 'components/shared/Modals/productsList/ProductsListEditModal/ProductsListEditModal';
import ProductsListInsertModal from 'components/shared/Modals/productsList/ProductsListInsertModal/ProductsListInsertModal';
import { Table } from 'components/shared/Table/Table';
import useProductListTableColumns from 'hooks/productList/useProductListTableColumns';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [getProductsList, loading, productList, pageRef] = useProductsList();

  const [rows, setRows] = useState(productList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});

  const [deleteRequest] = useDeleteProduct();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    setRows(productList);
  }, [productList]);

  const goToGraphPage = useCallback(
    row => () =>
      // eslint-disable-next-line no-alert
      alert('صفحه گراف که با حاجی محمده :)))))'),
    [],
  );

  const goToInfoPage = useCallback(
    row => () => navigate(`/productDetail/${row.id}`),
    [],
  );

  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      setEditChosenProduct(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useProductListTableColumns(
    goToInfoPage,
    goToGraphPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getProductsList, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={productList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت محصول جدید"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ProductsListEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        getProsuctList={getProductsList}
        mainInfo={editChosenProduct}
      />

      <ProductsListInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getProsuctList={getProductsList}
      />
    </>
  );
};

export default ProductList;
