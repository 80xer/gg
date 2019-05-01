// import { getValue } from './utils';

function sortAscending(data, field) {
  data.sort((a, b) => {
    const aValue = a[field]; // getValue(a, field);
    const bValue = b[field]; // getValue(b, field);
    if (!aValue) return 1;
    if (!bValue) return -1;

    if (aValue > bValue) return 1;
    return -1;
  });
  return data;
}

function sortDescending(data, field) {
  data.sort((a, b) => {
    const aValue = a[field]; // getValue(a, field);
    const bValue = b[field]; // getValue(b, field);
    if (!aValue) return 1;
    if (!bValue) return -1;

    if (aValue > bValue) return -1;
    return 1;
  });
  return data;
}

function sortInit(data) {
  data.sort((a, b) => {
    if (a['gg-origin-index'] > b['gg-origin-index']) return 1;
    return -1;
  });
  return data;
}

function sort(data, field, direction) {
  if (direction === 'ascending') {
    return sortAscending(data, field);
  }

  if (direction === 'descending') {
    return sortDescending(data, field);
  }

  return sortInit(data, field);
}
export default sort;
