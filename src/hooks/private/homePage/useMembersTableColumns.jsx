import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import { GridActionsCellItem } from '@mui/x-data-grid';

export const useMembersTableColumns = (showDescriotion, showAdditionals) => {
  const columnsData = [
    { field: 'id', headerName: 'آیدی', flex: 1 },
    {
      field: 'userName',
      headerName: 'نام کاربر',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },
    {
      field: 'joinDate',
      headerName: 'تاریخ عضویت',
      flex: 1,
      minWidth: 90,
      editable: false,
    },
    {
      field: 'isInitiator',
      headerName: 'ادمین',
      flex: 1,
      minWidth: 90,
      editable: false,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'اکشن',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: params => [
        <GridActionsCellItem
          key={1}
          icon={<DescriptionIcon />}
          label="Description"
          onClick={showDescriotion(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<InfoIcon />}
          label="Additionals"
          onClick={showAdditionals(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};
