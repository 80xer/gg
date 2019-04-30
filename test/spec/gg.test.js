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
    const grid = gg(props);
    let direction = grid.sortBody('id');
    expect(direction).toEqual('ascending');
    direction = grid.sortBody('id', direction);
    expect(direction).toEqual('descending');
    direction = grid.sortBody('id', direction);
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
});
