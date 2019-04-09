/* eslint-disable no-unused-vars */
import Head from '../../src/head';
import basicProps from '../basicProps';

describe('Head', () => {
  it('create', () => {
    const head = new Head({ columns: basicProps.columns });
    expect(typeof head.$area).toEqual('object');
  });
});
