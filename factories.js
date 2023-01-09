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
    let hitMatrix = Array(length).fill('o');
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

    const getHitMatrix = () =>{
        return hitMatrix;
    }

    const changeDirection = () => {
        direction === 'horizontal'
          ? (direction = 'vertical')
          : (direction = 'horizontal');
    };

    function hit(i = 0){
        //recieves number as arg that corresponds to index of ship damage
        //increases timesHit
        timesHit++;
        hitMatrix[i] = 'x';
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
    return {shipType, length, hit, isSunk, getTimesHit, getSunk, sinkShip, getDirection, changeDirection, getHitMatrix};
};



//gameboard

const Gameboard = (arg) => {
    //properties
    let missedAttacks = 0;
    //create a 10 x 10 game board, coordinate style board[row][col];
    //map takes the 10 null elements and turns them into 10 arrays of null elements. 
    let board = Array(10).fill(null).map(() => Array(10).fill(null));

    //make variables to store a record of hits
    let hits = [];
    let misses = [];
    let allAttackedSpaces = [];
    let PlacedShipObjs = {}

    
    

    //public methods:

    const searchArrayForCoords = (array, x, y) =>{
        let found = false;
        array.forEach(element => {
            
            if ((element[0] === x) && (element[1] === y)){
                //return true if you find the xy coords
                found = true;
            } 
        });
        

        return found;
    }

    

    //getters
    const getHits = () =>{
        return hits;
    }

    const getMisses = () =>{
        return misses;
    }

    const getAllAttackedSpaces = () =>{
        return allAttackedSpaces;
    }

    function getBoard(){
        return board;
    }

    

    function placeShip(shipObj, xStart, yStart){
        //takes a ship object, the row coordinate number, and the column coordinate number
        let name = shipObj.shipType;
        let direction = shipObj.getDirection();
        //call the ship function to make ships

        //check if placement is valid
        if (validSpace(xStart, yStart, direction, shipObj.length)){
            let x = xStart;
            let y = yStart;
            for(let i = 0; i < shipObj.length; i++){
                
                //places them at specific coordinates 
                board[y][x] = {'ship': name, 'index': i, 'status': 'o'}
                //direction of ship will place index in different direction
                if (direction === 'vertical'){
                    y++;
                } else if (direction === 'horizontal'){
                    x++;
                }
            }

            PlacedShipObjs[`${name}`] = shipObj;

        } else {
            console.error('invalid space');
        }
            

        //if not throw error or try/catch
    }

    

    function validSpace(x = 0, y = 0, direction = 'vertical', shipSize = 5){
        //is the starting space itself valid?
        if(x > 9 || y > 9){
            console.error('space does not exist on board');
            return false;
        }
        if((board[y][x]) !== null){
            console.error('not an empty space');
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
                console.error('You either ran into a ship or off board vertically');
                return false;

            } else if (((nextSpaceOver > 9) && direction === 'horizontal') || (board[y][nextSpaceOver] !== null) ){
                console.error('You either ran into a ship or off board horizontally');
                return false;
            }
            
            
            continue;

        }

        return true;
    }

    const recordShot = (x,y, hit = false) =>{
        //evaluate hit
        allAttackedSpaces.push([x,y]);

        if (hit){
             hits.push([x,y]);
        } else if(!hit){
            misses.push([x,y]);

        }

    }

    function receiveAttack(x, y){

        //takes a pair of coordinates
        let target = board[y][x];

        
        //determine if ship is there
        if (target === null){
            //attack miss case board[y][x] = {'ship': name, 'index': i, 'status': 'o'}
            
            //alert player that attack missed
            displayHit(x,y, false);

            //record negative coordinates
            recordShot(x,y, false);


            //record in that space that it was also missed in the past
            board[y][x] = {'missed': true};

        } else if(target !== null){
            //attack hits case
            if (target['missed'] === true) {
                console.error('You cannot target the same space twice');
                return false;
            } 
            
            //get index from ship that was hit
            let i = target['index']

            //get ship type from ship that was hit
            let ship = target['ship'];

            //call intermediate function to call hit function and send it the right index
            registerHitTo(ship, i);

            //record coordinates to both the hits and total array variables
            recordShot(x,y, true);

            //alert player that hit was successfull (just call another pure function)
            displayHit(x,y, true);

            
        }

            
    }

    const registerHitTo = (shipType, index) =>{
        //recieve ship type as string and index as number

        //get object ref out of PlacedShipObjs using the string
        let shipObj = PlacedShipObjs[`${shipType}`];

        //call hit function
        shipObj.hit(index);
    }

    function displayHit(coord){
        //takes a coord and displays on board where that shot was for player.
        //hits and misses should look different.
        //this will eventually interact with the DOM
        return true;
    }

    function allShipsPlaced(){
        let carrierPlaced = false;
        let battleshipPlaced = false;
        let cruiserPlaced = false;
        let submarinePlaced = false;
        let destroyerPlaced = false;

        //loop through whole board. Return early if all found
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                if (board[y][x] === null){
                    continue;
                } else{
                    let shipDetected = board[y][x];
                    if (shipDetected === 'carrier'){
                        carrierPlaced = true;
                    }
                    if (shipDetected === 'battleship'){
                        battleshipPlaced = true;
                    }
                    if (shipDetected === 'cruiser'){
                        cruiserPlaced = true;
                    }
                    if (shipDetected === 'submarine'){
                        submarinePlaced = true;
                    }
                    if (shipDetected === 'destroyer'){
                        destroyerPlaced = true;
                    }
                    if(carrierPlaced && battleshipPlaced && cruiserPlaced && submarinePlaced && destroyerPlaced){
                        return true;
                    }

                }
            }
        }

        return false;
        //well, are they? 
    }

    function allShipsSunk(){
        let arr = Object.values(PlacedShipObjs);
        let allSunk = true;
        for(let i = 0; i < arr.length; i++){
            let shipObj = arr[i];
            let shipIsSunk = shipObj.getSunk();
            if(shipIsSunk){
                continue;
            } else if (!shipIsSunk){
                allSunk = false;
                
            }
        }

        return allSunk;
        //if all ships are sunk, true
        //if not, false
    }
  
    return {getBoard, placeShip, validSpace, allShipsPlaced, getHits, getMisses, searchArrayForCoords, receiveAttack, allShipsSunk};
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