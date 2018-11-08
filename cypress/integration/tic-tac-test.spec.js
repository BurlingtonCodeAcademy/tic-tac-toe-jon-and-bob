describe('Cypress', function () {
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
});

describe('Check Empty', function () {
  it('checks for an empty board', function () {
    checkEmpty();
  });
});

describe('No Rules', function () {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('2 PLAYERS').click();
  });

  it('plays X in a cell', function () {
    playOn(0, '<img src="x.png" height="120" width="120" id="x">');
  });

  it('plays O in a different cell', function () {
    playOn(0, '<img src="x.png" height="120" width="120" id="x">');
    playOn(1, '<img src="o.png" height="120" width="120" id="o">');
  });

  it('plays X in a third cell', function () {
    playOn(0, '<img src="x.png" height="120" width="120" id="x">');
    playOn(1, '<img src="o.png" height="120" width="120" id="o">');
    playOn(2, '<img src="x.png" height="120" width="120" id="x">');
  });
});

describe('Rules', function () {

  it('says impossible playing in non-empty cell', function () {
    cy.visit('/');
    cy.contains('2 PLAYERS').click();
    cy.get('div#cell-0').click();
    cy.get('div#cell-0').click();
    cy.contains('Impossible!');
  });
});

describe('Reset Button', function () {
  it('clears one square when clicked', function () {
    cy.visit('/');
    cy.contains('2 PLAYERS').click();
    clickOnSquare(1);
    cy.contains('2 PLAYERS').click();
    checkEmpty();
  });
});

describe('Win Conditions', function () {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('2 PLAYERS').click();
  });

  playerXWins();
  playerOWins();

  function playerXWins() {

    let playerXWinConditions = [
      [0, 3, 1, 4, 2],
      [3, 1, 4, 2, 5],
      [6, 0, 7, 1, 8],
      [0, 1, 3, 4, 6],
      [1, 0, 4, 3, 7],
      [2, 1, 5, 4, 8],
      [0, 1, 4, 2, 8],
      [2, 0, 4, 1, 6]
    ];

    for (let cellArray of playerXWinConditions) {

      it('says "X Wins!" for spaces ' + (cellArray[0] + 1).toString() + "-" + (cellArray[2] + 1).toString() + "-" + (cellArray[4] + 1).toString(), function () {
        cy.reload();
        cy.contains('2 PLAYERS').click();
        checkWin(cellArray);
        cy.contains('Congratulations!  Player X Wins!!!');
      });
    };
  };

  function playerOWins() {

    let playerOWinConditions = [
      [3, 0, 4, 1, 6, 2],
      [1, 3, 2, 4, 6, 5],
      [0, 6, 1, 7, 4, 8],
      [1, 0, 4, 3, 2, 6],
      [0, 1, 3, 4, 2, 7],
      [1, 2, 4, 5, 3, 8],
      [1, 0, 2, 4, 3, 8],
      [0, 2, 1, 4, 3, 6]
    ];

    for (let cellArray of playerOWinConditions) {

      it('says "O Wins!" for spaces ' + (cellArray[1] + 1).toString() + "-" + (cellArray[3] + 1).toString() + "-" + (cellArray[5] + 1).toString(), function () {
        cy.reload();
        cy.contains('2 PLAYERS').click();
        checkWin(cellArray);
        cy.contains('Player O Wins!');
      });
    };
  };
});

describe('Ends Game on Win', function () {
  it('does not allow play after win', function () {
    cy.reload();
    checkWin([0,3,1,4,2,5]);
    cy.get('div#cell-5').should('be.empty');
  });
});

function clickOnSquare(cellNumber) {
  cy.get(`div#cell-${cellNumber}`).click();
}

function checkWin(cellArray) {
  for (let cell of cellArray) {
    clickOnSquare(cell);
  }
}

function checkEmpty() {
  for (let i = 0; i < 9; i++) {
    cy.get(`div#cell-${i}`).should('be.empty');
  }
}

function playOn(cellNumber, expectedText) {
  cy.get('div#cell-' + cellNumber).click().should(($el) => {
    expect($el).to.have.html(expectedText);
  })
}