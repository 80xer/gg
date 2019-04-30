import { getValue } from './utils';

function sort(data, field, direction) {
  data.sort((a, b) => {
    const aValue = getValue(a, field);
    const bValue = getValue(b, field);
    if (!aValue) return 1;
    if (!bValue) return -1;
    if (direction === 'ascending') {
      if (aValue > bValue) return 1;
      return -1;
    }
    if (direction === 'descending') {
      if (aValue > bValue) return -1;
      return 1;
    }
    if (a['gg-origin-index'] > b['gg-origin-index']) return 1;
    return -1;
  });
  return data;
}

export default sort;
