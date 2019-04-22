import { props as validateProps } from '../../src/validate';
import sampleProps from '../../src/sampleProps';

let container;

beforeEach(() => {
  document.body.innerHTML = '<div class=".container"></div>';
  container = document.querySelectorAll('.container');
});

describe('validate props', () => {
  it('return true without options', () => {
    expect(validateProps()).toBe(false);
  });

  it('target must be object type', () => {
    expect(validateProps({ target: '.something' })).toBe(false);
  });

  it('data must be required and array of object type.', () => {
    expect(validateProps({ target: container })).toBe(false);
    expect(validateProps({ target: container, data: {} })).toBe(false);
    expect(validateProps({ target: container, data: [{}] })).toBe(false);
    expect(validateProps({ target: container, ...sampleProps })).toBe(true);
  });
});
