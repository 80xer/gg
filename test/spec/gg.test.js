/* eslint-disable no-unused-vars */
import GG from '../../src/gg';
import Body from '../../src/body';
import basicProps from '../basicProps';

let container;

beforeEach(() => {
  document.body.innerHTML = '<div id="grid"></div>';
  container = document.querySelector('#grid');
});

describe('GG init', () => {
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
});

describe('GG create', () => {
  it('create body table when create instance with arguments', () => {
    const props = { target: container, ...basicProps };
    const gg = new GG(props);
  });
});
