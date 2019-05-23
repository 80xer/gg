/* eslint-disable no-unused-vars */
import gg from '../../src/gg';
import defaultProps from '../../src/defaultProps';
import sampleProps from '../../src/sampleProps';

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
    const sortableButton = document.querySelector('#grid .gg-head-area .sort-button:first-child');
    const unsortableButton = document.querySelector('#grid .gg-head-area th:first-child');
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
    const resizer = document.querySelector('#grid .gg-head-area .gg-resizer:first-child');
    rSide.resizeMouseDown(resizer, 50);
    expect(rSide.head.resizeTarget).toEqual(resizer);
  });

  it('resize clear', () => {
    const props = { target: container, ...sampleProps };
    const { rSide } = gg(props);
    const resizer = document.querySelector('#grid .gg-head-area .gg-resizer:first-child');
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
    const resizer = document.querySelector('#grid .gg-head-area .gg-resizer:first-child');
    const startLeft = parseInt(resizer.style.left, 10);
    rSide.resizeMouseDown(resizer, startPointX);
    expect(rSide.head.resizeTarget).toEqual(resizer);
    rSide.resizeColumns(endPointX);
    const endLeft = parseInt(resizer.style.left, 10);
    expect(endLeft - startLeft).toEqual(endPointX - startPointX);
  });
});
