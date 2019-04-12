/* eslint-disable no-unused-vars */
import GG from '../../src/gg';
import sampleProps from '../sampleProps';

let container;

beforeEach(() => {
  document.body.innerHTML = '<div id="grid"></div>';
  container = document.querySelector('#grid');
});

describe('GG init and create', () => {
  it('set target after create GG with empty arguments', () => {
    const gg1 = new GG();
    expect(gg1.props).toBe(undefined);
    const props = { target: container };
    gg1.init(props);
    expect(gg1.props).toEqual(props);
  });

  it('set target from arguments', () => {
    const gg = new GG({ target: container });
    expect(gg.props.target).toEqual(container);
  });

  it('create body table when create instance with arguments', () => {
    const props = { target: container, ...sampleProps };
    const gg = new GG(props);
  });
});

describe('GG create', () => {
  let props;
  let gg;

  beforeEach(() => {
    props = { target: container, ...sampleProps };
    gg = new GG(props);
  });

  it('should set width of columns', () => {
    gg.setWidthOfColumns();
  });
});
