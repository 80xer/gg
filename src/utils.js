/* eslint-disable camelcase */
export function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else el.className += ` ${className}`;
  return el;
}

export const OMDb_API_KEY = '8059120c';
