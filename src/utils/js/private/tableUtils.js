export const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const rowDataSearchFilter = (data, regex) =>
  data.filter(row => {
    return Object.keys(row).some(field => {
      return regex.test(row[field]?.toString());
    });
  });

export const rowDataDateFilter = (data, start, end) => {
  const startDate = start ? new Date(start).getFullYear() : null;
  const endDate = end ? new Date(end).getFullYear() : null;
  if (startDate && endDate) {
    return data.filter(row => row.start === startDate && row.end === endDate);
  } else {
    return data;
  }
};
