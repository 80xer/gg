/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable camelcase */
export function addClass(el, className) {
  el.classList.add(className);
  return el;
}

export function hasClass(el, className) {
  if (!el.classList) return false;
  return el.classList.contains(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}

export function getValue(obj, fields) {
  return fields.split('.').reduce((_obj, prop) => _obj && _obj[prop], obj);
}

export const OMDb_API_KEY = '8059120c';
