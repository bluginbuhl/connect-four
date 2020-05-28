var table = $('table tr');

$('#resetGame').click(refreshPage)

function refreshPage() {
  window.location.reload();
}

// check bottom-most available row
function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(255, 255, 255)') {
      return row
    }
  }
}

// find color of button
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// change color of button
function changeColor(rowIndex, colIndex, color) {
    console.log('Changed (' + rowIndex + ',' + colIndex + ')' + ' to ' + color);
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// check if 4 inputs are equal, not white, and not undefined
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(255, 255, 255)' && one !== undefined);
}

////////////////
// win checks //
////////////////

function reportWin(row, col) {
  console.log("Win starting at row/col:")
  console.log(row);
  console.log(col);
}

// horizontal wins
function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
        console.log('horizontal');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// vertical wins
function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
        console.log('vertical');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// diagonal wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// game end
function gameEnd(winningPlayer, winningColor) {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 7; row++) {
      $('.names').fadeOut('fast');
      $('.message').text(winningPlayer + ' wins!');
      $('.message').css(
        'background-color', winningColor).css(
        'text-align', 'center').css(
        'padding-top', '20px'
      );
    }
  }
}

// Ask for player names, assign colors
function startGame() {
  var playerOne = prompt("Player 1: Enter your name.");
  var playerTwo = prompt("Player 2: Enter your name.");

  var colorOne = 'rgb(255, 255, 0)';
  var colorTwo = 'rgb(255, 0, 0)';

  $('#playerOneName').text(playerOne).css('color', colorOne);
  console.log("playerOne set to: " + playerOne);
  $('#playerTwoName').text(playerTwo).css('color', colorTwo);
  console.log("playerTwo set to: " + playerTwo);

  document.getElementById('startGame').disabled = true;

  var currentPlayer = 1;
  var currentName = playerOne;
  var currentColor = colorOne;

  $('#resetMessage').text(currentName + "'s turn");

  $('.gameboard button').on('click', function() {
    var gameOn = true;
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      gameOn = false;
      gameEnd(currentName, currentColor);
    }
  
    currentPlayer = currentPlayer*-1;


    if (currentPlayer === 1) {
      currentName = playerOne;
      currentColor = colorOne;
    } else {
      currentName = playerTwo;
      currentColor = colorTwo;
    }

    if (gameOn === true) {
      $('#resetMessage').text(currentName + "'s turn");
    } else {
      $('#resetMessage').text("Click reset to play again!");
    }

  })
}

$('#startGame').click(startGame);
