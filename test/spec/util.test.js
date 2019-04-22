import { addClass } from '../../src/utils';

describe('util', () => {
  it('addClass from classList', () => {
    const area = document.createElement('div');
    const classFirst = 'gg-class';
    const tmpArr = [];
    addClass(area, classFirst);
    let addedClass = false;
    area.classList.forEach((a) => {
      tmpArr.push(a);
      if (a === classFirst) {
        addedClass = true;
      }
    });
    expect(addedClass).toBe(true);
  });
});
