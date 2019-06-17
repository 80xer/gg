/* eslint-disable no-unused-vars */
import Body from '../body';
import defaultProps from '../defaultProps';
import sampleProps from './sampleProps';

describe('Body', () => {
  it('create', () => {
    document.body.innerHTML = '<div id="grid"></div>';
    const container = document.querySelector('#grid');
    const body = new Body({
      target: container,
      ...sampleProps,
      ...defaultProps,
    });
    const cellDiv = body.getCell({ value: 1 });
    expect(cellDiv).toEqual('<div>1</div>');
  });
});
