let letterX = '<img src="x.png" height="120" width="120" id="x">';
let letterO = '<img src="o.png" height="120" width="120" id="o">';
let squares = document.getElementsByClassName('squares');
let player = letterX
let playerTurn = document.getElementById('turn');
let playerXMoves = [];
let playerOMoves = [];
let currentArray = playerXMoves;
let turnCount = 0;
let lineDiv = document.getElementById('line0');

function clearBoard() {
  lineDiv.innerHTML = '';
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

function xOrOWins() {
  if (player === letterX) {
    playerTurn.innerHTML = 'Congratulations!  Player X Wins!!!';
  } else {
    playerTurn.innerHTML = 'Congratulations!  Player O Wins!!!';
  }
  stop();
}

function winCheck() {
  if (currentArray.includes('cell-0') && currentArray.includes('cell-1') && currentArray.includes('cell-2')) {
    lineDiv.innerHTML = '<div id="top-row"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-3') && currentArray.includes('cell-4') && currentArray.includes('cell-5')) {
    lineDiv.innerHTML = '<div id="middle-row"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-6') && currentArray.includes('cell-7') && currentArray.includes('cell-8')) {
    lineDiv.innerHTML = '<div id="bottom-row"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-0') && currentArray.includes('cell-3') && currentArray.includes('cell-6')) {
    lineDiv.innerHTML = '<div id="left-col"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-1') && currentArray.includes('cell-4') && currentArray.includes('cell-7')) {
    lineDiv.innerHTML = '<div id="middle-col"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-2') && currentArray.includes('cell-5') && currentArray.includes('cell-8')) {
    lineDiv.innerHTML = '<div id="right-col"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-0') && currentArray.includes('cell-4') && currentArray.includes('cell-8')) {
    lineDiv.innerHTML = '<div id="left-diag"></div>';
    xOrOWins();
  } else if (currentArray.includes('cell-2') && currentArray.includes('cell-4') && currentArray.includes('cell-6')) {
    lineDiv.innerHTML = '<div id="right-diag"></div>';
    xOrOWins();
  } else if (turnCount === 9) {
    playerTurn.innerHTML = "It's a DRAW.........";
    stop();
  } else {
    toggle();
  }
}

function play(e) {
  if (e.currentTarget.innerHTML === '') {
    e.currentTarget.innerHTML = player;
    currentArray.push(e.currentTarget.id);
    turnCount++;
    winCheck();
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

