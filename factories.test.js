// const { default: test } = require('node:test');
// const { default: test } = require('node:test');
const {sum4, subtract4, Ship, Gameboard} = require('./factories');
// import {sum, subtract, compileAndroidCode} from './main';
// import sum from './main';
// import subtract from './main';

test('adds 1 + 2 to equal 3', () => {
  expect(sum4(1, 2)).toBe(3);
});

test('adds 10 - 6 to equal 4', () => {
    expect(subtract4(10, 6)).toBe(4);
});




describe.skip('Ship factory function tests', () => {


    describe('Ship factory properties', () => {
        let testShip = Ship('destroyer');

        test('length property', () => {
            expect(testShip.length).toBe(2);
        });

        test('type property', () => {
            expect(testShip.shipType).toBe('destroyer');
        });

        test('direction property', () => {
            testShip.direction = 'horizontal'
            expect(testShip.direction).toBe('horizontal');
        });

        test('timesHit property', () => {
            expect(testShip.getTimesHit()).toBe(0);
        });

        test('sunk property not sunk', () => {
            expect(testShip.getSunk()).toBe(false);
        });
        test('sunk property sank', () => {
            testShip.hit();
            testShip.hit();
            expect(testShip.getSunk()).toBe(true);
        });

        


    });

    describe('Ship factory methods', () => {
        
        test('hit function', () => {
            let testShip = Ship('destroyer');
            testShip.hit();
            expect(testShip.getTimesHit()).toBe(1);
        });

        test('isSunk function negative', () => {
            let testShip = Ship('destroyer');
            testShip.hit();
            
            expect(testShip.isSunk()).toBe(false);
        });
        test('isSunk function positive', () => {
            let testShip = Ship('destroyer');
            testShip.hit();
            testShip.hit();
            expect(testShip.isSunk()).toBe(true);
        });

        


    });



});


describe('GameBoard factory function tests', () => {


    describe('Game Board attributes', () => {
        let testBoard = Gameboard();

        //test empty board
        test('Is board empty when initialized?', () => {
            //tests if every element of every subarr of every arr passes test
            let testValue = testBoard.getBoard().every((row) => row.every((space) => space === null));
            expect(testValue).toBe(true);
        });

        //test board row length
        test('Row length', () =>{
            let testValue = testBoard.getBoard().length;
            expect(testValue).toEqual(10);
        });

        //test board column length
        test('Column length', () =>{
            let testValue = testBoard.getBoard()[0].length;
            expect(testValue).toEqual(10);
        });

    });

    describe('Place ship horizontal', () => {
        let testBoard = Gameboard();
        
       //test if a ships indexes are at the expected places when placed horz
       test('place ship at first square', () =>{
        let testShip = Ship('carrier');
        testBoard.palceShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0].shipName;
        expect(testValue).toBe('carrier');

       });

       test('place ship index at first square', () =>{
        let testShip = Ship('carrier');
        testBoard.palceShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0].shipIdex = 0;
        expect(testValue).toEqual(0);

       });

    });

    describe('Place ship vertical', () => {
        
        //test if a ships indexes are at the expected places when placed vert
 
    });

    describe('Do NOT place ship out-of-bounds', () => {
        
        //test vert and horz
 
    });

    describe('Do NOT make ship collide with another ship', () => {
        
        //test vert and horz
 
    });

    describe('All ships placed', () => {
        
        //test no ships, some ships, and all ships
 
    });


    describe('Recieve attack tests', () => {
        
        //test to see if ships get hit in the expected place

        //test record hits

        //test record misses

        //test targeting a space that has already been shot
 
    });

    describe('All ships sunk', () => {
        
        //test no ships, some ships, and all ships sunk
 
    });

    describe('reset board', () => {
        
        //make a new board, run clear function, and see if things are empty as expected
 
    });



});