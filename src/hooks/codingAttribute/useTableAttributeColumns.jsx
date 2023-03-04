import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useTableAttributeColumns = (deleteItem, editItem) => {
  const columnsData = [
    {
      field: 'title',
      headerName: 'عنوان',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },

    {
      field: 'value',
      headerName: 'مقدار',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },

    {
      field: 'actions',
      headerName: 'عملیات',
      type: 'actions',
      flex: 1,
      minWidth: 100,

      getActions: params => [
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

export default useTableAttributeColumns;
