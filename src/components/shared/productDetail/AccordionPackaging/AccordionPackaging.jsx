import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import useProductPackagingDelete from 'api/productDetail/useProductPackagingDelete/useProductPackagingDelete';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import useProductPackgingListTableColumns from 'hooks/productDetail/useProductPackgingListTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

import AccordionTable from '../../AccordionTable/AccordionTable';
import ProductPackagingEditModal from '../../Modals/productsList/ProductPackagingEditModal/ProductPackagingEditModal';
import ProductPackagingInsertModal from '../../Modals/productsList/ProductPackagingInsertModal/ProductPackagingInsertModal';
import ProductPackagingPrintModal from '../../Modals/productsList/ProductPackagingPrintModal/ProductPackagingPrintModal';

const AccordionPackaging = ({
  packagingList,
  getProductDetail,
  branchGuid,
}) => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [chosenPrintProduct, setChosenPrintProduct] = useState({});

  const [deleteRequest] = useProductPackagingDelete();

  const print = useCallback(
    row => () => {
      setChosenPrintProduct(row);
      setIsPrintModalOpen(true);
    },
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

  const [columnsData] = useProductPackgingListTableColumns(
    print,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getProductDetail, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <Wrapper>
      <Header>
        <Title>لیست پکیج ها</Title>
        <AddButton
          variant="contained"
          size="small"
          onClick={() => setIsInsertModalOpen(true)}
        >
          <AddIcon />
        </AddButton>
      </Header>

      <AccordionTable columns={columnsData} rows={packagingList || []} />

      <ProductPackagingInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getProductDetail={getProductDetail}
        branchGuid={branchGuid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ProductPackagingEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenProduct={editChosenProduct}
        getProductDetail={getProductDetail}
      />

      <ProductPackagingPrintModal
        open={isPrintModalOpen}
        handleClose={() => setIsPrintModalOpen(false)}
        chosenPrintProduct={chosenPrintProduct}
      />
    </Wrapper>
  );
};

export default AccordionPackaging;

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h4``;

const AddButton = styled(Button)`
  background-color: #27348b;
`;

const TableContainer = styled.div``;
