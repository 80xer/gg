import { addClass, getDistance } from '../js/utils';

describe('util', () => {
  it('addClass from classList', () => {
    const area = document.createElement('div');
    const classFirst = 'gg-class';
    const tmpArr = [];
    addClass(area, classFirst);
    let addedClass = false;
    area.classList.forEach(a => {
      tmpArr.push(a);
      if (a === classFirst) {
        addedClass = true;
      }
    });
    expect(addedClass).toBe(true);
  });

  it('get distance between two points', () => {
    const dist = getDistance(0, 0, 2, 2);
    expect(dist).toEqual(Math.sqrt(8));
  });
});
