let ShipLengths = {
    'carrier': 5,
    'battleship': 4,
    'cruiser': 3,
    'submarine': 3,
    'destroyer': 2
}

//ships
const Ship = (type) => {
    //property vars
    const shipType = type;
    const length = ShipLengths[type];
    let direction = 'vertical';
    let timesHit = 0;
    let sunk = false;

    //methods
    function getTimesHit(){
        return timesHit;
    }

    function getSunk(){
        return sunk;
    }

    function getDirection(){
        return direction;
    }

    const changeDirection = () => {
        direction === 'horizontal'
          ? (direction = 'vertical')
          : (direction = 'horizontal');
    };

    function hit(){
        //increases timesHit
        timesHit++;
        console.log(timesHit);
        isSunk();
    }

    function isSunk(){
        //logic for ship health
        if(getTimesHit() < length){
            return false;
        } else if(getTimesHit() >= length){
            sinkShip();
            return true;
        }
    }

    function sinkShip(){
        sunk = true;
        return;
    }

    

    //add getter

    

    //return line
    return {shipType, length, hit, isSunk, getTimesHit, getSunk, sinkShip, getDirection, changeDirection};
};



//gameboard

const Gameboard = (arg) => {
    //properties
    let missedAttacks = 0;
    //create a 10 x 10 game board, coordinate style board[row][col];
    //map takes the 10 null elements and turns them into 10 arrays of null elements. 
    let board = Array(10).fill(null).map(() => Array(10).fill(null));

    function getBoard(){
        return board;
    }

    function placeShip(shipObj, xStart, yStart){
        //takes a ship object, the row coordinate number, and the column coordinate number
        let name = shipObj.shipType;
        let direction = shipObj.getDirection();
        //call the ship function to make ships

        //check if placement is valid
        if (validSpace()){
            let x = xStart;
            let y = yStart;
            for(let i = 0; i < shipObj.length; i++){
                
                //places them at specific coordinates 
                board[y][x] = {'ship': name, 'index': i}
                //direction of ship will place index in different direction
                if (direction === 'vertical'){
                    y++;
                } else if (direction === 'horizontal'){
                    x++;
                }
            }

        } else {
            console.error('invalid space');
        }
            

        //if not throw error or try/catch
    }

    function validSpace(x = 0, y = 0, direction = 'vertical', shipSize = 5){
        //is the starting space itself valid?
        if(x > 9 || y > 9){
            return false;
        }
        if((board[y][x]) !== null){
            return false;
        }
        let yLoop = y;
        let xLoop = x;
        for(let i = 0; i < shipSize; i++){
            //increment as you walk the path down or right
            let nextSpaceDown = i + yLoop;//9
            let nextSpaceOver = i + xLoop;//0
            //if there is a ship or you go off the board, break loop and return false. 
            if (((nextSpaceDown > 9) && direction === 'vertical') || (board[nextSpaceDown][x] !== null)){
                
                return false;

            } else if (((nextSpaceOver > 9) && direction === 'horizontal') || (board[y][nextSpaceOver] !== null) ){
                
                return false;
            }
            
            
            continue;

        }

        return true;
    }

    function receiveAttack(coords){
        //takes a pair of coordinates
        //determine if ship is there
            //send hit function to the correct ship
            //OR record coordinates of missed shots
    }

    function displayHit(coord){
        //takes a coord and displays on board where that shot was for player.
        //hits and misses should look different.
    }

    function areAllShipSunk(){
        //if all ships are sunk, true
        //if not, false
    }
  
    return {getBoard, placeShip, validSpace};
};


const Factory = (arg) => {
    
  
    return {functions};
};












function sum4(a, b) {
    return a + b;
  }
  
function subtract4(a, b) {
    return a - b;
}



//////Test export line/////
module.exports = {sum4, subtract4, Ship, Gameboard};