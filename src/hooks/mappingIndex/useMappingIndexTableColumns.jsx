const useMappingIndexTableColumns = () => {
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
      field: 'code',
      headerName: 'کد',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },

    {
      field: 'mapped',
      headerName: 'مپ شده',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },
  ];

  return [columnsData];
};

export default useMappingIndexTableColumns;
