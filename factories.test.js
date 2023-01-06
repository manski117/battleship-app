const {sum4, subtract4, Ship} = require('./factories');
// import {sum, subtract, compileAndroidCode} from './main';
// import sum from './main';
// import subtract from './main';

test('adds 1 + 2 to equal 3', () => {
  expect(sum4(1, 2)).toBe(3);
});

test('adds 10 - 6 to equal 4', () => {
    expect(subtract4(10, 6)).toBe(4);
});


let testShip = Ship('destroyer');
test('length property', () => {
    
    expect(testShip.length).toBe(2);
});