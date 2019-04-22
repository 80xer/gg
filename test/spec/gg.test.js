/* eslint-disable no-unused-vars */
import gg from '../../src/gg';
import sampleProps from '../../src/sampleProps';

let container;

beforeEach(() => {
  document.body.innerHTML = '<div id="grid"></div>';
  container = document.querySelector('#grid');
});

describe('gg init and create', () => {
  it('set target after create gg with empty arguments', () => {
    const gg1 = gg();
    expect(gg1.props).toBe(undefined);
    const props = { target: container };
    gg1.init(props);
    expect(gg1.props).toEqual(props);
  });

  it('set target from arguments', () => {
    const gg2 = gg({ target: container });
    expect(gg2.props.target).toEqual(container);
  });

  it('create body table when create instance with arguments', () => {
    const props = { target: container, ...sampleProps };
    const gg3 = gg(props);
  });
});

describe('gg create', () => {
  let props;
  let gg4;

  beforeEach(() => {
    props = { target: container, ...sampleProps };
    gg4 = gg(props);
  });
});
