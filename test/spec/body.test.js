/* eslint-disable no-unused-vars */
import Body from '../../src/body';
import sampleProps from '../../src/sampleProps';

describe('Body', () => {
  it('create', () => {
    document.body.innerHTML = '<div id="grid"></div>';
    const container = document.querySelector('#grid');
    const body = new Body({ target: container, ...sampleProps });
    expect(typeof body.$area).toEqual('object');
  });
});
