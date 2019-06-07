/* eslint-disable no-unused-vars */
import Head from '../head';
import sampleProps from '../../demo/sampleProps';

describe('Head', () => {
  it('create', () => {
    document.body.innerHTML = '<div id="grid"></div>';
    const container = document.querySelector('#grid');
    const head = new Head({ target: container, ...sampleProps });
    expect(typeof head.$area).toEqual('object');
  });
});
