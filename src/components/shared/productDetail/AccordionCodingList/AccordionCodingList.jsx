import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import useProductCoddingDelete from 'api/productDetail/useProductCoddingDelete/useProductCoddingDelete';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import useProductCoddingListTableColumns from 'hooks/productDetail/useProductCoddingListTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

import AccordionTable from '../../AccordionTable/AccordionTable';
import ProductCoddingEditModal from '../../Modals/productsList/ProductCoddingEditModal/ProductCoddingEditModal';

const AccordionCodingList = ({ coddingList, getProductDetail }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});

  const [deleteRequest] = useProductCoddingDelete();

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

  const [columnsData] = useProductCoddingListTableColumns(deleteItem, editItem);

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getProductDetail, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <Wrapper>
      <Header>
        <Title>لیست کدینگ</Title>
        <AddButton variant="contained" size="small">
          <AddIcon />
        </AddButton>
      </Header>

      <AccordionTable columns={columnsData} rows={coddingList || []} />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ProductCoddingEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenProduct={editChosenProduct}
        getProductDetail={getProductDetail}
      />
    </Wrapper>
  );
};

export default AccordionCodingList;

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
