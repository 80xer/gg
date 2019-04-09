import GG from '../src/gg.js';
import props from '../test/basicProps';

const container = document.querySelector('#grid');
const gg = new GG({ target: container, ...props });
console.log('gg :', gg);
