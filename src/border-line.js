/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';

class BorderLine {
  constructor({ type }) {
    this.createBorderLine(type);
  }

  createBorderLine(type) {
    const line = document.createElement('div');
    addClass(line, 'gg-border-line');
    if (type) addClass(line, `gg-border-line-${type}`);
    this.$line = line;
    return line;
  }
}

export default BorderLine;
