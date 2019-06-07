/* eslint-disable no-unused-vars */
import Pagination from '../pagination';
import defaultProps from '../defaultProps';
import sampleProps from '../../demo/sampleProps';

let container;

describe('Pagination', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="grid"></div>';
    container = document.querySelector('#grid');
  });

  it('create pagination area', () => {
    const props = { ...defaultProps, ...sampleProps };
    const pagination = new Pagination({
      ...props.pagination,
      rowCount: props.data.length,
    });
    expect(typeof pagination.$area).toEqual('object');
  });

  describe('get visible index array', () => {
    let visibleIndices;
    let curIdx;
    let paginationObj;
    beforeEach(() => {
      const props = { ...defaultProps, ...sampleProps };
      const { pagination } = props;
      pagination.perPage = 10;
      const rowCount = props.data.length;
      const visibleCount = 5;
      curIdx = 9;
      paginationObj = new Pagination({ ...props.pagination, rowCount });
      visibleIndices = paginationObj.getVisibleIndex(
        paginationObj.pageCount,
        5,
        curIdx
      );
    });
    it('get less then visibleCount', () => {
      expect(visibleIndices.length).toBeLessThanOrEqual(5);
    });

    it('include current index in visibleIdices', () => {
      const findIndex = visibleIndices.findIndex(i => i === curIdx);
      expect(findIndex).toBeGreaterThan(-1);
    });

    it('fisrt index must greater then 0', () => {
      expect(visibleIndices[0]).toBeGreaterThan(0);
    });

    it('last index must less then or equal page count', () => {
      expect(visibleIndices[visibleIndices.length - 1]).toBeLessThanOrEqual(
        paginationObj.pageCount
      );
    });
  });
});
