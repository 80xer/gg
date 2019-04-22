/* eslint-disable no-unused-vars */
import ColGroup from '../../src/colgroup';

describe('ColGroup', () => {
  it('calculate width', () => {
    const totalWidth = 100;
    const count = 3;
    const result = ColGroup.calculateWidthOfColumns(totalWidth, count);
    expect(result.length).toEqual(count);
    expect(result[0]).toEqual(33);
    expect(result[count - 1]).toEqual(34);
  });
});
