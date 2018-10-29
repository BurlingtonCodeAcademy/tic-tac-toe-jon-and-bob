let letterX = '<img src="x.png" height="120" width="120" id="x">';
let letterO = '<img src="o.png" height="120" width="120" id="o">';
let player = letterX
let numPlayers = 1;
let playerTurn = document.getElementById('turn');
let playerXMoves = [];
let playerOMoves = [];
let currentArray = playerXMoves;
let opponentArray = playerOMoves;
let turnCount = 0;
let lineDiv = document.getElementById('line0');
let winner = null;

const corners = [0, 2, 6, 8];

const adjacentCorners = [
  [0, 2, 6],
  [2, 8, 0],
  [8, 6, 2],
  [6, 0, 8]
];

const winConditions = [
  [0, 1, 2, 'top-row'],
  [3, 4, 5, 'middle-row'],
  [6, 7, 8, 'bottom-row'],
  [0, 3, 6, 'left-col'],
  [1, 4, 7, 'middle-col'],
  [2, 5, 8, 'right-col'],
  [0, 4, 8, 'left-diag'],
  [2, 4, 6, 'right-diag']
];

function clearBoard() {
  console.log('');
  console.log('----- New Game -----');
  winner = null;
  lineDiv.innerHTML = '';
  player = letterX
  playerXMoves = [];
  playerOMoves = [];
  currentArray = playerXMoves;
  playerTurn.innerHTML = "It is player X's turn";
  turnCount = 0;
  for (let i = 0; i < 9; i++) {
    let clearSquare = document.getElementById(`cell-${i}`);
    clearSquare.innerHTML = '';
  }
}

function zeroPlayer() {
  numPlayers = 0;
  clearBoard();
  computerPlayer2();
}

function singlePlayer() {
  numPlayers = 1;
  start();
}
function twoPlayers() {
  numPlayers = 2;
  start();
}

function buttonStart() {
  document.getElementById('onePlayer').addEventListener('click', singlePlayer);
  document.getElementById('twoPlayer').addEventListener('click', twoPlayers);
  document.getElementById('zeroPlayer').addEventListener('click', zeroPlayer);
}

function start() {
  for (let i = 0; i < 9; i++) {
    let startSquare = document.getElementById(`cell-${i}`);
    startSquare.addEventListener('click', play);
  }
  clearBoard();
}

function stop() {
  for (let i = 0; i < 9; i++) {
    let stopSquare = document.getElementById(`cell-${i}`);
    stopSquare.removeEventListener('click', play);
  }
  buttonStart();
}

function xOrOWins() {
  if (player === letterX) {
    winner = "x";
    playerTurn.innerHTML = 'Congratulations!  Player X Wins!!!';
  } else {
    winner = "o";
    playerTurn.innerHTML = 'Congratulations!  Player O Wins!!!';
  }
  stop();
}

function winTriplet(a, b, c) {
  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`)) {
    return true;
  }
};

function canIWin(a, b, c) {
  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
    return `cell-${c}`;
  } else if (currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
    return `cell-${a}`;
  } else if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
    return `cell-${b}`;
  }
}

function iCanWin() {
  for (let win of winConditions) {
    if (canIWin(win[0], win[1], win[2])) {
      let winCell = canIWin(win[0], win[1], win[2]);
      return winCell;
    }
  }
}

function winBlock(a, b, c) {
  if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
    return `cell-${c}`;
  } else if (opponentArray.includes(`cell-${b}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
    return `cell-${a}`;
  } else if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
    return `cell-${b}`;
  }
}

function iCanBlock() {
  for (let win of winConditions) {
    if (winBlock(win[0], win[1], win[2])) {
      let blockedCell = winBlock(win[0], win[1], win[2]);
      return blockedCell;
    }
  }
}

function showWinner(line) {
  lineDiv.innerHTML = `<div id="${line}"></div>`;
  xOrOWins();
}

function winCheck() {
  for (let win of winConditions) {
    if (winTriplet(win[0], win[1], win[2])) {
      showWinner(win[3]);
      return true;
    }
  } if (turnCount === 9) {
    playerTurn.innerHTML = "It's a DRAW.........";
  } else {
    toggle();
  }
}

function randomArray(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

function secondCorner() {
  for (array of adjacentCorners) {
    if (opponentArray[0] == `cell-${array[0]}`) {
      return array[randomArray([1, 2])];
    }
  }
}

function randomSquare() {
  let emptyArray = [];
  for (let i = 0; i < 9; i++) {
    if (document.getElementById("cell-" + i).innerHTML === '') {
      emptyArray.push("cell-" + i);
      return randomArray(emptyArray);
    }
  }
}

function computerAI() {
  if (document.getElementById("cell-4").innerHTML === '') {
    return "cell-4";
  } else if (turnCount === 1) {
    return `cell-${randomArray(corners)}`;
  } else if (turnCount === 2) {
    return `cell-${secondCorner()}`;
  } else if (iCanWin()) {
    console.log("win");
    return (iCanWin());
  } else if (iCanBlock()) {
    console.log("block");
    return (iCanBlock());
  } else if (turnCount === 9) {
    playerTurn.innerHTML = "It's a DRAW.........";
    return true;
  } else {
    console.log("random");
    return (randomSquare());
  }
}


function computerPlayer() {
  if (winner === null && turnCount < 9) {
    let mySquare = computerAI();
    console.log("Player O = " + mySquare);
    document.getElementById(mySquare).innerHTML = player;
    currentArray.push(mySquare);
    turnCount++;
    winCheck();
    if (numPlayers === 0) {
      setTimeout(computerPlayer2, 500);
    }
  }
}

function computerPlayer2() {
  if (winner === null) {
    let mySquare = computerAI();
    console.log("Player X = " + mySquare);
    document.getElementById(mySquare).innerHTML = player;
    currentArray.push(mySquare);
    turnCount++;
    winCheck();
    setTimeout(computerPlayer, 500);
  }
}

function play(e) {
  if (e.currentTarget.innerHTML === '') {
    e.currentTarget.innerHTML = player;
    currentArray.push(e.currentTarget.id);
    turnCount++;
    winCheck();
    if (numPlayers === 1) {
      computerPlayer();
    }
  } else {
    playerTurn.innerHTML = "Impossible! That cell is already full.";
  };
}

function toggle() {
  if (player === letterX) {
    player = letterO;
    currentArray = playerOMoves;
    opponentArray = playerXMoves;
    playerTurn.innerHTML = "It is player O's turn";
  }
  else {
    player = letterX;
    currentArray = playerXMoves;
    opponentArray = playerOMoves;
    playerTurn.innerHTML = "It is player X's turn";
  };
};

buttonStart();