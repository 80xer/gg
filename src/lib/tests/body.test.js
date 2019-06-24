/* eslint-disable no-unused-vars */
import Body from '../js/body';
import defaultProps from '../js/defaultProps';
import sampleProps from '../../demo/sampleProps';

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
