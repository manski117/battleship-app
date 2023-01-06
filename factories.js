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
    function hit(){
        //increases timesHit
    }

    function isSunk(){
        //if hit = length then make true. 
    }
    

    //return line
    return {shipType, length, direction, timesHit, sunk, hit, isSunk};
};



//gameboard

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
module.exports = {sum4, subtract4, Ship};