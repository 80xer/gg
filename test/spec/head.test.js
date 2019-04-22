/* eslint-disable no-unused-vars */
import Head from '../../src/head';
import sampleProps from '../../src/sampleProps';

describe('Head', () => {
  it('create', () => {
    document.body.innerHTML = '<div id="grid"></div>';
    const container = document.querySelector('#grid');
    const head = new Head({ target: container, columns: sampleProps.columns });
    expect(typeof head.$area).toEqual('object');
  });
});
