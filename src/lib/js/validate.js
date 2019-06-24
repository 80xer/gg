const props = function props(options = {}) {
  const { target, data, columns } = options;

  function validTarget(tgt) {
    return tgt && typeof tgt === 'object';
  }

  function validData(dt) {
    return dt && Array.isArray(dt) && dt.length > 0 && typeof dt[0] === 'object';
  }

  function validColumns(cols) {
    return cols && Array.isArray(cols) && cols.length > 0 && typeof cols[0] === 'object';
  }
  // target
  if (!validTarget(target)) {
    console.error('target must be dom object');
    return false;
  }
  // data
  if (!validData(data)) {
    console.error('data must be array of object type');
    return false;
  }
  // columns
  if (!validColumns(columns)) {
    console.error('columns must be array of object type');
    return false;
  }

  return true;
};

export { props };
