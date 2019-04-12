/* eslint-disable no-unused-vars */
import Head from '../../src/head';
import sampleProps from '../sampleProps';

describe('Head', () => {
  it('create', () => {
    const head = new Head({ columns: sampleProps.columns });
    expect(typeof head.$area).toEqual('object');
  });
});
