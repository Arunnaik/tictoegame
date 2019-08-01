/**
 * This program is a boilerplate code for the standard tic tac toe game
 * Here the “box” represents one placeholder for either a “X” or a “0”
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed:
 * Imagine you are playing with the computer so every alternate move should be done by the computer
 * X -> player
 * O -> Computer
 *
 * Winner needs to be decided and has to be flashed
 *
 * Extra points will be given for approaching the problem more creatively
 *
 */

const grid = [];
const GRID_LENGTH = 3;
let turn = "X";
const aiPlayer = "O";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 4, 6]
];

function initializeGrid() {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";

    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }

    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === "X") {
      content = '<span class="cross">X</span>';
    } else if (gridValue === "O") {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '"  class="box ' +
      additionalClass +
      " " +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");

  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}
function onBoxClick() {
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");

  if (typeof grid[colIdx][rowIdx] == "number") {
    turned(colIdx, rowIdx, turn);
    
      turned(emptySquares(), bestSpot(), aiPlayer);
    
  }
  renderMainGrid();
  addClickHandlers();
}
function turned(colIdx, rowIdx, player) {
  grid[colIdx][rowIdx] = player;
  let gameWon = checkWin(player);

  if (gameWon) {
    gameOver(gameWon);
  }
}
function gameOver(gameWon) {
  alert(`${gameWon.player} won the match`);

  document.querySelector(".endGame").style.display = "flex";
  document.getElementById("winner").innerHTML = `${
    gameWon.player
  } won the match`;
  document
  .getElementsByClassName("endGame")[0]
  .addEventListener("click", restart, false);
}
function emptySquares() {
  let b = grid.findIndex(function(o) {
    return o.some(function(e) {
      return typeof e == "number";
    });
  });
  console.log(b);
  return b;
}
function bestSpot() {
  if (emptySquares() !== -1) {
    return grid[emptySquares()].findIndex(e => typeof e == "number");
  }
}

function checkWin(player) {
  let plays = grid
    .flat()
    .reduce((a, e, i) => (e === player ? [...a, i] : a), []);

  let gameWon = null;
  for (index of plays) {
    document
      .getElementsByClassName("box")
      [index].removeEventListener("click", onBoxClick, false);
  }

  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      console.log(gameWon);

      break;
    }
  }

  return gameWon;
}

function restart() {
  document.querySelector(".endGame").style.display = "none";
  grid.length = 0;
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
}


initializeGrid();
renderMainGrid();
addClickHandlers();
