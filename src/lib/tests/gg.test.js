/* eslint-disable no-unused-vars */
import gg from '../gg';
import defaultProps from '../defaultProps';
import sampleProps from './sampleProps';

let container;

beforeEach(() => {
  document.body.innerHTML = '<div id="grid"></div>';
  container = document.querySelector('#grid');
});

describe('gg init and create', () => {
  it('set target after create gg with empty arguments', () => {
    const gg1 = gg();
    expect(gg1.props).toEqual(defaultProps);
    const props = { ...defaultProps, target: container };
    gg1.init(props);
    expect(gg1.props).toEqual(props);
  });

  it('set target from arguments', () => {
    const gg2 = gg({ target: container });
    expect(gg2.props.target).toEqual(container);
  });

  it('create body table when create instance with arguments', () => {
    const props = { target: container, ...sampleProps };
    const grid = gg(props);
  });

  it('sortBody', () => {
    const props = { target: container, ...sampleProps };
    const { rSide } = gg(props);
    let direction = rSide.body.sortBody('id');
    expect(direction).toEqual('ascending');
    direction = rSide.body.sortBody('id', direction);
    expect(direction).toEqual('descending');
    direction = rSide.body.sortBody('id', direction);
    expect(direction).toEqual(undefined);
  });

  it('click sort button', () => {
    const props = { target: container, ...sampleProps };
    const grid = gg(props);
    const sortableButton = document.querySelector(
      '#grid .gg-rside .gg-head-area .sort-button:first-child'
    );
    const unsortableButton = document.querySelector(
      '#grid .gg-rside .gg-head-area th:first-child'
    );
    expect(sortableButton.dataset.sortdirection).toEqual(undefined);
    sortableButton.click();
    expect(sortableButton.dataset.sortdirection).toEqual('ascending');
    sortableButton.click();
    expect(sortableButton.dataset.sortdirection).toEqual('descending');
    sortableButton.click();
    expect(sortableButton.dataset.sortdirection).toEqual(undefined);
    unsortableButton.click();
  });

  it('resize MouseDown', () => {
    const props = { target: container, ...sampleProps };
    const { rSide } = gg(props);
    const resizer = document.querySelector(
      '#grid .gg-head-area .gg-resizer:first-child'
    );
    rSide.resizeMouseDown(resizer, 50);
    expect(rSide.head.resizeTarget).toEqual(resizer);
  });

  it('resize clear', () => {
    const props = { target: container, ...sampleProps };
    const { rSide } = gg(props);
    const resizer = document.querySelector(
      '#grid .gg-head-area .gg-resizer:first-child'
    );
    rSide.resizeMouseDown(resizer, 50);
    expect(rSide.head.resizeTarget).toEqual(resizer);
    rSide.resizeClear(resizer);
    expect(rSide.head.resizeTarget).toEqual(null);
  });

  it('resize columns', () => {
    const props = { target: container, ...sampleProps };
    const { rSide } = gg(props);
    const startPointX = 50;
    const endPointX = 100;
    const resizer = document.querySelector(
      '#grid .gg-head-area .gg-resizer:first-child'
    );
    const startLeft = parseInt(resizer.style.left, 10);
    rSide.resizeMouseDown(resizer, startPointX);
    expect(rSide.head.resizeTarget).toEqual(resizer);
    rSide.resizeColumns(endPointX);
    const endLeft = parseInt(resizer.style.left, 10);
    expect(endLeft - startLeft).toEqual(endPointX - startPointX);
  });

  it('get lside and rside without fixed columns', () => {
    const props = { target: container, ...sampleProps };
    const grid = gg(props);
    const { lSideColumns, rSideColumns } = grid.splitColumns();
    expect(lSideColumns.length).toEqual(0);
    expect(rSideColumns.length).toEqual(sampleProps.columns.length);
  });
  it('get lside and rside with fixed columns', () => {
    const props = { target: container, ...sampleProps };
    props.columns[2].fixed = true;
    const grid = gg(props);
    const { lSideColumns, rSideColumns } = grid.splitColumns();
    expect(lSideColumns.length).toEqual(3);
    expect(rSideColumns.length).toEqual(props.columns.length - 3);
  });
});
