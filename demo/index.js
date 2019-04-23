import gg from '../src/gg.js';
import props from '../src/sampleProps';

const container = document.querySelector('#grid');
const sGrid = gg({ target: container, ...props });
console.log('sGrid :', sGrid);
