/* eslint-disable camelcase */
export function addClass(el, className) {
  el.classList.add(className);
  return el;
}

export function hasClass(el, className) {
  return el.classList.contains(className);
}

export function getValue(obj, fields) {
  return fields.split('.').reduce((_obj, prop) => _obj && _obj[prop], obj);
}

export const OMDb_API_KEY = '8059120c';
