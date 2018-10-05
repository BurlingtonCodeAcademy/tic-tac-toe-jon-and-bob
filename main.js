let letterX = '<img src="x.png" height="120" width="120" id="x">';
let letterO = '<img src="o.png" height="120" width="120" id="o">';
let squares = document.getElementsByClassName('squares');
let player = letterX
let playerTurn = document.getElementById('turn');
let playerXMoves = [];
let playerOMoves = [];
let winningCombos = [['cell-0', 'cell-1', 'cell-2'], ['cell-3', 'cell-4', 'cell-5'], ['cell-6', 'cell-7', 'cell-8'], ['cell-0', 'cell-3', 'cell-6'], ['cell-1', 'cell-4', 'cell-7'], ['cell-2', 'cell-5', 'cell-8'], ['cell-0', 'cell-4', 'cell-8'], ['cell-2', 'cell-4', 'cell-6']];
let currentArray = playerXMoves;
let turnCount = 0;
//let activeCell = document.querySelectorAll('squares');

function clearBoard() {
  square.innerHTML = '';
  playerXMoves = [];
  playerOMoves = [];
  currentArray = playerXMoves;
  playerTurn.innerHTML = "It is player X's turn";
  turnCount = 0;
}

document.querySelector('button').addEventListener('click', start);

function start() {
  for (i = 0; i < 9; i++) {
    square = document.getElementById(`cell-${i}`);
    clearBoard();
    square.addEventListener('click', play);
  }
}

function stop() {
  for (i = 0; i < 9; i++) {
    square = document.getElementById(`cell-${i}`);
    square.removeEventListener('click', play);
  }
}

function winCheck() {
  console.log(currentArray)
  for (combo of winningCombos) {
    console.log(combo);
    if (currentArray.includes(combo)) {
      if (player === letterX) {
        playerTurn.innerHTML = 'Congratulations!  Player X Wins!!!';
        stop();
      } else if (player === letterO) {
        playerTurn.innerHTML = 'Congratulations!  Player O Wins!!!';
        stop();
      }
    }
    else {

    }
  }
};

function play(e) {
  if (e.currentTarget.innerHTML === '') {
    e.currentTarget.innerHTML = player;
    currentArray.push(e.currentTarget.id);
    turnCount++;
    winCheck();
    toggle();
  }
}

function toggle() {
  if (player === letterX) {
    player = letterO;
    currentArray = playerOMoves;
    playerTurn.innerHTML = "It is player O's turn";
  }
  else {
    player = letterX;
    currentArray = playerXMoves;
    playerTurn.innerHTML = "It is player X's turn";
  };
};

