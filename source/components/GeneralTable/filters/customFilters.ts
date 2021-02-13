export const filterEquals = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id] || '';
    return rowValue === filterValue;
  });
};

export const filterIncludesCaseInsensitive = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = String(row.values[id] || '').toLowerCase();
    return rowValue.includes(filterValue.toLowerCase());
  });
};
