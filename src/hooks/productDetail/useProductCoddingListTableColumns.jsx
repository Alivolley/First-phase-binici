import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useProductCoddingListTableColumns = (deleteItem, editItem, apiRef) => {
  const columnsData = [
    {
      field: 'title',
      headerName: 'نام',
      flex: 1,
      minWidth: 120,
      renderCell: val => {
        apiRef.current = val.api;
        return <div>{val.row.title}</div>;
      },
    },

    {
      field: 'codding',
      headerName: 'کدینگ',
      flex: 1,
      minWidth: 120,
      renderCell: val => {
        apiRef.current = val.api;
        return <div>{val.row.codding}</div>;
      },
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
