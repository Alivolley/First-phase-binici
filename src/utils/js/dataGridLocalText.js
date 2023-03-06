const dataGridLocalText = {
  toolbarDensity: 'سایز',
  toolbarDensityCompact: 'کوچک',
  toolbarDensityStandard: 'معمولی',
  toolbarDensityComfortable: 'بزرگ',
  toolbarFilters: 'فیلتر',
  toolbarColumns: 'ستون ها',
  filterPanelInputPlaceholder: 'جست و جو',
  filterPanelInputLabel: 'نام',
  filterPanelOperators: 'تشابه',
  filterOperatorContains: 'شامل شدن',
  filterOperatorEquals: 'برابر بودن',
  filterOperatorStartsWith: 'شروع با',
  filterOperatorEndsWith: 'اتمام با',
  filterOperatorIsEmpty: 'خالی بودن',
  filterOperatorIsNotEmpty: 'خالی نبودن',
  filterOperatorIsAnyOf: 'هرکدام',
  filterPanelColumns: 'ستون ها',
  checkboxSelectionHeaderName: 'چک باکس ها',
  columnsPanelShowAllButton: 'نمایش همه',
  columnsPanelHideAllButton: 'پنهان کردن همه',
  columnsPanelTextFieldLabel: 'پیدا کردن ستون',
  columnsPanelTextFieldPlaceholder: 'اسم ستون',

  // Root
  noRowsLabel: 'بدون سطر',
  noResultsOverlayLabel: 'نتیجه ای پیدا نشد.',
  errorOverlayDefaultLabel: 'خطایی روی داد.',

  // Density selector toolbar button text
  toolbarDensityLabel: 'تراکم',

  // Columns selector toolbar button text
  toolbarColumnsLabel: 'ستون‌ها را انتخاب کنید',

  // Filters toolbar button text
  toolbarFiltersLabel: 'نمایش فیلترها',
  toolbarFiltersTooltipHide: 'مخفی کردن فیلترها',
  toolbarFiltersTooltipShow: 'نمایش فیلترها',
  toolbarFiltersTooltipActive: count =>
    count !== 1 ? `${count} فیلترهای فعال` : `${count} فیلتر فعال`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'جستجو...',
  toolbarQuickFilterLabel: 'جستجو',
  toolbarQuickFilterDeleteIconLabel: 'حذف',

  // Export selector toolbar button text
  toolbarExport: 'خروجی',
  toolbarExportLabel: 'خروجی',
  toolbarExportCSV: 'دانلود به صورت CSV',
  toolbarExportPrint: 'چاپ',
  toolbarExportExcel: 'دانلود به صورت اکسل',

  // Columns panel text
  columnsPanelDragIconLabel: 'جا‌به‌جایی ستون',

  // Filter panel text
  filterPanelAddFilter: 'افزودن فیلتر',
  filterPanelDeleteIconLabel: 'حذف',
  filterPanelLinkOperator: 'عملگر منطقی',

  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'و',
  filterPanelOperatorOr: 'یا',

  // Filter operators text
  filterOperatorIs: 'هست',
  filterOperatorNot: 'نیست',
  filterOperatorAfter: 'بعد از',
  filterOperatorOnOrAfter: 'معادل یا بعدش',
  filterOperatorBefore: 'قبلش',
  filterOperatorOnOrBefore: 'معادل یا قبلش',

  // Filter values text
  filterValueAny: 'هرچیزی',
  filterValueTrue: 'صحیح',
  filterValueFalse: 'غلط',

  // Column menu text
  columnMenuLabel: 'فهرست',
  columnMenuShowColumns: 'نمایش ستون‌ها',
  columnMenuFilter: 'فیلتر',
  columnMenuHideColumn: 'مخفی',
  columnMenuUnsort: 'نامرتب‌کردن',
  columnMenuSortAsc: 'مرتب‌کردن صعودی',
  columnMenuSortDesc: 'مرتب‌کردن نزولی',

  // Column header text
  columnHeaderFiltersTooltipActive: count =>
    count !== 1 ? `${count} فیلتر‌های فعال` : `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: 'نمایش فیلترها',
  columnHeaderSortIconLabel: 'مرتب‌کردن',

  // Rows selected footer text
  footerRowSelected: count =>
    count !== 1
      ? `${count.toLocaleString()} سطرهای انتخاب شده`
      : `${count.toLocaleString()} سطر انتخاب شده`,

  // Total row amount footer text
  footerTotalRows: 'مجموع سطرها:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionSelectAllRows: 'انتخاب همه‌ی ردیف‌ها',
  checkboxSelectionUnselectAllRows: 'لغو انتخاب همه‌ی ردیف‌ها',
  checkboxSelectionSelectRow: 'انتخاب ردیف',
  checkboxSelectionUnselectRow: 'لغو انتخاب ردیف',

  // Boolean cell text
  booleanCellTrueLabel: 'صحیح',
  booleanCellFalseLabel: 'غلط',

  // Actions cell more text
  actionsCellMore: 'بیشتر',

  // Column pinning text
  pinToLeft: 'سنجاق کردن به چپ',
  pinToRight: 'سنجاق کردن به راست',
  unpin: 'برداشتن سنجاق',

  // Tree Data
  treeDataGroupingHeaderName: 'گروه‌بندی',
  treeDataExpand: 'نمایش فرزندان',
  treeDataCollapse: 'پنهان‌سازی فرزندان',

  // Grouping columns
  groupingColumnHeaderName: 'گروه‌بندی',
  groupColumn: name => `گروه‌بندی براساس ${name}`,
  unGroupColumn: name => `لغو گروه‌بندی براساس ${name}`,

  // Master/detail
  detailPanelToggle: 'پنل جزئیات',
  expandDetailPanel: 'بازکردن پنل جزئیات',
  collapseDetailPanel: 'بستن پنل جزئیات',

  // Row reordering text
  rowReorderingHeaderName: 'ترتیب مجدد سطر',

  // Aggregation
  aggregationMenuItemHeader: 'تجمیع',
  aggregationFunctionLabelSum: 'جمع',
  aggregationFunctionLabelAvg: 'میانگین',
  aggregationFunctionLabelMin: 'حداقل',
  aggregationFunctionLabelMax: 'حداکثر',
  aggregationFunctionLabelSize: 'اندازه',
};

export default dataGridLocalText;
