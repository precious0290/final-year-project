var cpuIcon = 'X';
var playerIcon = 'O';
var AIMove;
//settings for liveBoard: 1 is cpuIcon, -1 is playerIcon, 0 is empty
var sampleBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
/*var and let create variables that can be reassigned another value. const creates "constant" variables that cannot be reassigned another value */
//const/var rootNodeExplorer = Tree(liveboard,0)
var winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');

// script.js

document.addEventListener('DOMContentLoaded', function () {
  renderBoard(sampleBoard);
  displayIconSelectionModal();
  
  // Function to handle user clicks on the board
  function handleUserMove(row, col) {
    $('.square:empty').hover(function() {
      $(this).text(playerIcon).css('cursor', 'pointer');
      }, function() {
      $(this).text('');
    });

    $('.square:empty').click(function() {
      $(this).css('cursor', 'default');
      sampleBoard[parseInt($(this).attr('id'))] = -1;
      renderBoard(sampleBoard);
      
      // Implement the logic to send a POST request to your Flask app with the user's move
      fetch('/make_user_move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          row: row,
          col: col,
        }),
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error:', error);
        });
      
      setTimeout(getAIMove, 100);
      $('.square').off();
    });
  }

  // Function to trigger AI move
  function getAIMove() {
    // Implement the logic to send a GET request to your Flask app to get the AI move
    fetch('/get_ai_move')
        .then(response => response.json())
        .then(result => {
          // Update the game board on the webpage
          updateBoard(result.board);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }
});

/*----------------------------------------------------------------------------------------------------*/
//UI
function renderBoard(board) {
  board.forEach(function(el, i) {
    var squareId = '#' + i.toString();
    if (el === -1) {
      $(squareId).text(playerIcon);
    } else if (el === 1) {
      $(squareId).text(cpuIcon);
    }
  });
  
  $('.square:contains(X)').addClass('x-marker');
  $('.square:contains(O)').addClass('o-marker');
}

function animateWinLine() {
  var idxOfArray = winningLines.map(function(winLines) {
    return winLines.map(function(winLine) {
      return sampleBoard[winLine];
    }).reduce(function(prev, cur) {
      return prev + cur;
    });
  });
  var squaresToAnimate = winningLines[idxOfArray.indexOf(Math.abs(3))];
  
  squaresToAnimate.forEach(function(el) {
      $('#' + el).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    });
}

function displayIconSelectionModal() {
  $('.modal-container').css('display', 'block');
  $('.choose-modal').addClass('animated bounceInUp');
  
  $('.button-area span').click(function() {
    var marker = $(this).text();
    playerIcon = (marker === 'X' ? 'X' : 'O');
    cpuIcon = (marker === 'X' ? 'O' : 'X');

    $('.choose-modal').addClass('animated bounceOutDown');
    setTimeout(function() {
      $('.modal-container').css('display', 'none');
      $('.choose-modal').css('display','none');
      startGame();
    }, 700);
    
    $('.button-area span').off();
  });
}

function endGameMessage(){
  var result = checkVictory(sampleBoard);
  $('.end-game-modal h3').text(result === 'win' ? 'You Lost' : "It's a draw");
  
  $('.modal-container').css('display', 'block');
  $('.end-game-modal').css('display','block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');
 
  $('.button-area span').click(function() {
    
    $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');
    
    setTimeout(function() {
      $('.modal-container').css('display', 'none');
      startGame();
    }, 700);
    
    $('.button-area span').off();
  });
}

function startGame() {
  sampleBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $('.square').text("").removeClass('o-marker x-marker');

  renderBoard(sampleBoard);
  initiatePlayerTurn();
}

function initiatePlayerTurn() {
  
}

function initiateAITurn() {
 const mctsPlayer = new MCTS(sampleBoard, cpuIcon);
  mctsPlayer.searchTree(sampleBoard, cpuIcon);
 //miniMax(liveBoard, 'aiPlayer');
  sampleBoard[AIMove] = 1;
  renderBoard(sampleBoard);
  if (checkVictory(sampleBoard)) {
    animateWinLine();
    setTimeout(endGameMessage, checkVictory(sampleBoard) === 'win' ? 700 : 100);
  } else {
    initiatePlayerTurn();
  }
}

function checkVictory(board) {


 // console.log("board length: " + board.length);

  var squaresInPlay = [...cellElements].every(cell => {
    return cell.classList.contains(playerIcon)||cell.classList.contains(cpuIcon)
});
var outcome = '';
var charCounter =0;

if(board !== undefined){
  console.log(board.length);
 var len = board.length;
 
 for(let row=0;  row < len; row++)
{
  for(let col=0; col < board[row].length; col++){
          //horizontal
        if(board[row][col] == cpuIcon)
        {
          charCounter++;
           if(charCounter == 3)
        {
            outcome = "win";
            charCounter = 0;
        }
        else{
          outcome = "lose";
          charCounter = 0;
        }
        }   
        if(board[col][row] ==cpuIcon)
        {
          charCounter++;
          if(charCounter == 3)
          {
            outcome = "win";
            charCounter = 0;
          }
          else{
            outcome = "lose";
            charCounter = 0;
          }
        }
          
          if(board[row][row] == cpuIcon){

            charCounter++;
          if(charCounter == 3)
          {
            outcome = "win";
            charCounter = 0;
          }
          else{
            outcome = "lose";
            charCounter = 0;
          }
          }
  }
}
}
   if(outcome === 'win'){
    return 'win';

   }
   else if(outcome === 'lose'){
    return 'lose';
   }
   else if(squaresInPlay === 9){
    return 'draw';
   }
   else{
    return false;
   }
}