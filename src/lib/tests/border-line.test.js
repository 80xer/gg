/* eslint-disable no-unused-vars */
import BorderLine from '../js/border-line';
import { hasClass } from '../js/utils';

describe('BorderLine', () => {
  it('widthout type', () => {
    const borderLine = new BorderLine();
    expect(hasClass(borderLine.$line, 'gg-border-line')).toBe(true);
  });
  it('width type', () => {
    const borderLine = new BorderLine({ type: 'top' });
    expect(hasClass(borderLine.$line, 'gg-border-line-top')).toBe(true);
  });
});
