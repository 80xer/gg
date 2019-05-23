/* eslint-disable no-unused-vars */
import Pagination from '../../src/pagination';
import defaultProps from '../../src/defaultProps';
import sampleProps from '../../src/sampleProps';

let container;

describe('Pagination', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="grid"></div>';
    container = document.querySelector('#grid');
  });

  it('create pagination area', () => {
    const props = { ...defaultProps, ...sampleProps };
    const pagination = new Pagination({ ...props.pagination, rowCount: props.data.length });
    expect(typeof pagination.$area).toEqual('object');
  });

  it('create page buttons', () => {
    const props = { ...defaultProps, ...sampleProps };
    const { pagination } = props;
    pagination.perPage = 10;
    const rowCount = props.data.length;
    const paginationObj = new Pagination({ ...props.pagination, rowCount });
    const pageCount =
      rowCount % pagination.perPage === 0
        ? rowCount / pagination.perPage
        : rowCount / pagination.perPage + 1;
    const buttons = paginationObj.$area.querySelectorAll('.gg-pagination-btn');
    expect(buttons.length).toEqual(pageCount);
  });
});
