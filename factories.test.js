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




describe('Ship factory function tests', () => {


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

        test.only('hitMatrix getter', () =>{
            let arr = testShip.getHitMatrix();
            expect(arr).not.toContain('x');
        })

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
        test('changeDirection fucntion', () => {
            let testShip = Ship('destroyer');
            testShip.changeDirection()
            expect(testShip.getDirection()).toBe('horizontal');
        });

        test.only('hitMatrix and hit method', () =>{
            let testShip = Ship('destroyer');
            testShip.hit(0);
            let arr = testShip.getHitMatrix();
            let testValue = ((arr[0] === 'x') && (arr[1] === 'o'));
            expect(testValue).toBe(true);
        })

        


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

    describe.skip('Place ship horizontal', () => {
        let testBoard = Gameboard();
        let testShip = Ship('carrier');
        testShip.changeDirection();
        
       //test if a ships indexes are at the expected places when placed horz
       test('place ship type at first square', () =>{
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0]['ship'];
        expect(testValue).toBe('carrier');

       });

       test('place ship index at first square', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0]['index'];
        expect(testValue).toEqual(0);

       });

       test('place ship type at next square horizontal', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][1]['ship'];
        expect(testValue).toBe('carrier');

       });

       test('place ship index at next square horizontal', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][1]['index'];
        expect(testValue).toEqual(1);

       });

    });

    describe.skip('Place ship vertical', () => {
        
        //test if a ships indexes are at the expected places when placed vert
        let testBoard = Gameboard();
        let testShip = Ship('carrier');
        
       //test if a ships indexes are at the expected places when placed horz
       test('place ship type at first square', () =>{
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0]['ship'];
        expect(testValue).toBe('carrier');

       });

       test('place ship index at first square', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[0][0]['index'];
        expect(testValue).toEqual(0);

       });

       test('place ship type at next square horizontal', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[1][0]['ship'];
        expect(testValue).toBe('carrier');

       });

       test('place ship index at next square horizontal', () =>{
        
        testBoard.placeShip(testShip, 0, 0);
        let testValue = testBoard.getBoard()[1][0]['index'];
        expect(testValue).toEqual(1);

       });
 
    });

    describe('Do NOT place ship out-of-bounds or over another ship', () => {
        let testBoard = Gameboard();
        let testShip = Ship('carrier');
        //test vert and horz
        test('cannot place ship in space that does not exist', ()=>{
            let testValue = testBoard.validSpace(12,11, 'vertical', testShip.length);
            expect(testValue).toBe(false);
        });

        test('ship cannot run vertically off board', ()=>{
            let testValue = testBoard.validSpace(0,8, 'vertical');
            expect(testValue).toBe(false);
        })

        test('ship cannot run horizontally off board', ()=>{
            let testValue = testBoard.validSpace(8,0, 'horizontal');
            expect(testValue).toBe(false);
        })

        test('ship cannot be placed on another ship', ()=>{
            testBoard.placeShip(testShip,0,0);
            let testValue = testBoard.validSpace(0,0, 'vertical');
            expect(testValue).toBe(false);
        });

        test('ship cannot run vertically into another ship', ()=>{
            testBoard.placeShip(testShip,0,2);
            let testValue = testBoard.validSpace(0,0, 'vertical');
            expect(testValue).toBe(false);
        });

        test('ship cannot run horizontally into another ship', ()=>{
            testBoard.placeShip(testShip,2,0);
            let testValue = testBoard.validSpace(0,0, 'horizontal');
            expect(testValue).toBe(false);
        });

        


 
    });

    describe('All ships placed', () => {
        //make object instances of all 5 ships
        let testBoard = Gameboard();
        let carrier = Ship('carrier');
        let battleship = Ship('battleship');
        let cruiser = Ship('cruiser');
        let submarine = Ship('submarine');
        let destroyer = Ship('destroyer');

        test('no ships placed', ()=>{
            let testValue = testBoard.allShipsPlaced();
            expect(testValue).toBe(false);
        });

        test('only some ships placed', ()=>{
            testBoard.placeShip(carrier, 0,0, carrier.length);
            testBoard.placeShip(battleship, 1,0, battleship.length);
            testBoard.placeShip(cruiser, 3,0, cruiser.length);
            let testValue = testBoard.allShipsPlaced();
            expect(testValue).toBe(false);
        });

        test('all ships placed', ()=>{
            testBoard.placeShip(carrier, 0,0, carrier.length);
            testBoard.placeShip(battleship, 1,0, battleship.length);
            testBoard.placeShip(cruiser, 3,0, cruiser.length);
            testBoard.placeShip(submarine, 3,0, submarine.length);
            testBoard.placeShip(destroyer, 3,0, destroyer.length);
            let testValue = testBoard.allShipsPlaced();
            expect(testValue).toBe(false);
        });


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