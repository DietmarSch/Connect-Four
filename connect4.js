/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
// var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width,height) {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  const masterArray=[];
  for (let y=0; y<height;y++){
    const tempArr=[];
    for (let x=0; x<width; x++){
      tempArr.push(0);
    }
    masterArray.push(tempArr);
  }
  return masterArray;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard=document.getElementById('board');
  // TODO: add comment for this code
  // Create the top-row as column-top, add eventlistener for click.This will be
  // the row above the board, where we put the chips into the board.
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
  //Fill out the top-row with cells, with the id of x and append it to the top-row;
  // append the top-row to the Board in index-html
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);


  // TODO: add comment for this code
  // Building the complete board with rows, column  and cells;
  // Each cell gets an individual id, containing x-y - Value
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.classList.add("empty");
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
  
// switch players
  // TODO: switch currPlayer 1 <-> 2
function switchPlayers(){
  currPlayer=((currPlayer === 1)? 2:1);
  header=document.getElementById('headerLeft'); // Field to show the the new currPlayer
  header.className=`p${currPlayer}`;
}



function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y=0; //Initial.  
  while (y < HEIGHT){
    // console.log(strID);
    if (board[y][x] !==0){
      return y-1;
    }
    y +=1;
  }
  return y-1;  //only if all cells of the columne are empty.
} 

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let strId = `${y}-${x}`;
  // console.log('inside placeintable, y,x, strid: ',y,x,strId);
  let targetCell = document.getElementById(strId);
  // console.log(targetCell);
  strCurrentPlayer = `p${currPlayer}`;
  
  targetCell.classList.remove('empty');
  targetCell.classList.add(strCurrentPlayer);
  newDiv=document.createElement('div');
  newDiv.classList.add('piece');
  targetCell.append(newDiv);
  switchPlayers();
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message;
  alert ("GAME OVER! \n" + msg);

}
function checkForTie(){
  let tie=true
  board.forEach(subArr =>{
    const bool= subArr.every(val =>{
      // console.log('check cell: ', val);
      return (val !== 0);
    });
    // console.log(bool);
    if (bool===false){tie=false};
  });
  // console.log(tie);
  return tie;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // From each cell starts one array of 4 cells in each: vertical, horizontal, diagonal-right
  // and diagonal-left.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}




/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x]=currPlayer;   // Update Array board
  // console.log(board);
  placeInTable(y, x);             // Update htmlBoard
  if (checkForTie()){endGame("Tie!")};
  if (checkForWin()){endGame(`Player ${currPlayer} won`)};
  // check for win
}  

const board = makeBoard(WIDTH,HEIGHT);
console.log(board);
makeHtmlBoard();

