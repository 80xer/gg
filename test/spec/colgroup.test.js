/* eslint-disable no-unused-vars */
import ColGroup from '../../src/colgroup';
import sampleProps from '../../src/sampleProps';

describe('ColGroup', () => {
  it('throw error when call setWidthOfColumns without target', () => {
    expect(() => {
      const colgroup = new ColGroup({ ...sampleProps });
    }).toThrow();
  });

  it('calculate width', () => {
    const totalWidth = 100;
    const columns = [
      {
        id: 'a',
        name: 'a'
      },
      {
        id: 'b',
        name: 'b'
      },
      {
        id: 'c',
        name: 'c'
      }
    ];
    const result = ColGroup.calculateWidthOfColumns(totalWidth, columns);
    expect(result.length).toEqual(columns.length);
    expect(result[0]).toEqual(33);
    expect(result[columns.length - 1]).toEqual(34 - 1);
  });
});
