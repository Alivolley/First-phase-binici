import { GridActionsCellItem } from '@mui/x-data-grid';

const useLocationsTableColumns = (showDescriotion, showAdditionals) => {
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
      field: 'actions',
      headerName: 'عملیات',
      type: 'actions',
      flex: 1,
      minWidth: 100,

      getActions: params => [
        <GridActionsCellItem
          key={1}
          //   icon={<DescriptionIcon />}
          label="Description"
          onClick={showDescriotion(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          //   icon={<InfoIcon />}
          label="Additionals"
          onClick={showAdditionals(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};

export default useLocationsTableColumns;
