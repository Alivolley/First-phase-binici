import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useProductCoddingListTableColumns = (deleteItem, editItem) => {
  const columnsData = [
    {
      field: 'title',
      headerName: 'نام',
      flex: 1,
      minWidth: 120,
    },

    {
      field: 'codding',
      headerName: 'کدینگ',
      flex: 1,
      minWidth: 120,
    },

    {
      field: 'actions',
      headerName: 'عملیات',
      type: 'actions',
      flex: 1,
      minWidth: 100,

      getActions: params =>
        params.row.isReadOnly
          ? [
              <GridActionsCellItem
                key={1}
                icon={<ModeEditOutlineIcon />}
                label="ویرایش"
                onClick={editItem(params.row)}
                showInMenu
              />,
            ]
          : [
              <GridActionsCellItem
                key={1}
                icon={<DeleteIcon />}
                label="حذف"
                onClick={deleteItem(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={2}
                icon={<ModeEditOutlineIcon />}
                label="ویرایش"
                onClick={editItem(params.row)}
                showInMenu
              />,
            ],
    },
  ];

  return [columnsData];
};

export default useProductCoddingListTableColumns;

const ColImage = styled.img`
  object-fit: fill;
  max-width: 60px;
  max-height: 90%;
`;
