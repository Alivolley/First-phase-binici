import useDeleteProduct from 'api/productsList/useDeleteProduct/useDeleteProduct';
import useProductsList from 'api/productsList/useProductsList/useProductsList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import ProductsListEditModal from 'components/shared/Modals/productsList/ProductsListEditModal/ProductsListEditModal';
import ProductsListInsertModal from 'components/shared/Modals/productsList/ProductsListInsertModal/ProductsListInsertModal';
import ApiPaginateTable from 'components/shared/Table/ApiPaginateTable';
import useProductListTableColumns from 'hooks/productList/useProductListTableColumns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// count product in each page
const limit = 8;

// last search string
let lastSearch = null;

const ProductList = () => {
  const [page, setPage] = useState(1);

  const [getProductsList, loading, productList, pageRef] = useProductsList();

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});

  const [deleteRequest] = useDeleteProduct();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsList({ page: 1, count: limit });
  }, []);

  const goToGraphPage = useCallback(
    row => () => navigate(`/product-graph/${row.id}`),
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

  const apiRef = useRef(null);
  const [columnsData] = useProductListTableColumns(
    goToInfoPage,
    goToGraphPage,
    deleteItem,
    editItem,
    apiRef,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getProductsList, setIsDeleteModalOpen, setDeleteLoading);
  };

  function getPageData(pageNumber) {
    setPage(pageNumber);
    getProductsList({ page: pageNumber, count: limit, term: lastSearch });
  }

  function handleSearch(text) {
    setPage(1);
    lastSearch = text;
    if (text === '') {
      lastSearch = null;
    }
    getProductsList({ page: 1, count: limit, term: text });
  }

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <ApiPaginateTable
        columns={columnsData}
        rowsData={productList[page]}
        rows={productList[page]}
        isDeletable
        isLoading={loading}
        addLable="ثبت محصول جدید"
        onAddClick={() => setIsInsertModalOpen(true)}
        apiRef={apiRef}
        onPageChange={p => getPageData(p)}
        page={page}
        countPages={
          pageRef?.totalCount ? Math.ceil(pageRef.totalCount / limit) : 1
        }
        handleSearchApi={handleSearch}
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
