let letterX = '<img src="x.png" height="120" width="120" id="x">';
let letterO = '<img src="o.png" height="120" width="120" id="o">';
let squares = document.getElementsByClassName('squares');
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

let winConditions = [
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
      console.log("win = " + winCell);
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
      console.log("block = " + blockedCell);
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

function firstCorner() {
  let cornerArray = [0, 2, 6, 8];
  return "cell-" + cornerArray[(Math.floor(Math.random() * 4))];
}

function secondCorner() {
  if (document.getElementById("cell-0").innerHTML !== '' && document.getElementById("cell-2").innerHTML === '') {
    return "cell-2";
  } else if (document.getElementById("cell-2").innerHTML !== '' && document.getElementById("cell-8").innerHTML === '') {
    return "cell-8";
  } else if (document.getElementById("cell-8").innerHTML !== '' && document.getElementById("cell-6").innerHTML === '') {
    return "cell-6";
  } else if (document.getElementById("cell-6").innerHTML !== '' && document.getElementById("cell-0").innerHTML === '') {
    return "cell-0";
  }
}

function randomSquare() {
  console.log("random");
  let emptyArray = [];
  for (let i = 0; i < 9; i++) {
    if (document.getElementById("cell-" + i).innerHTML === '') {
      emptyArray.push("cell-" + i);
      return emptyArray[(Math.floor(Math.random() * emptyArray.length))];
    }
  }
}

function computerAI() {
  if (document.getElementById("cell-4").innerHTML === '') {
    return "cell-4";
  } else if (turnCount === 1) {
    return (firstCorner());
  } else if (turnCount === 2) {
    return (secondCorner());
  } else if (iCanWin()) {
    return (iCanWin());
  } else if (iCanBlock()) {
    return (iCanBlock());
  } else if (turnCount === 9) {
    playerTurn.innerHTML = "It's a DRAW.........";
    return true;
  } else {
    return (randomSquare());
  }
}


function computerPlayer() {
  if (winner === null) {
    let mySquare = computerAI();
    console.log("mySquare = " + mySquare);
    console.log("Player 1");
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
    console.log("Player 2");
    document.getElementById(mySquare).innerHTML = player;
    console.log("mySquare = " + mySquare);
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