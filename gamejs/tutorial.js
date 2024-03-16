var cpuIcon = 'X';
var playerIcon = 'O';
var currentPlayer = 'random';
var RandMove;
var AIMove;
//settings for liveBoard: 1 is cpuIcon, -1 is playerIcon, 0 is empty
var liveBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
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
var time = 0;
let interval;
const hours = document.querySelector('.hour');
const minutes = document.querySelector('.minute');
const seconds = document.querySelector('.second');
var gameStarted = false;
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
      return liveBoard[winLine];
    }).reduce(function(prev, cur) {
      return prev + cur;
    });
  });
  var squaresToAnimate = winningLines[idxOfArray.indexOf(Math.abs(3))];
  
  squaresToAnimate.forEach(function(el) {
      $('#' + el).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    });
}

//MODALS
function chooseMarker() {
  startNewGame();
}



function endGameMessage(){
  gameStarted = false;
  timerState(gameStarted);
  var result = checkVictory(liveBoard);
  var wintext = "";
  if(result == 'win'){
    wintext = "MiniMax Wins!";
  }else if(result == 'lose'){
    wintext = "Random AI wins!";
  }
  else if(result == 'draw'){
    wintext = "It's a draw!";
  }
  $('.end-game-modal h3').text(wintext);
  
  $('.modal-container').css('display', 'block');
  $('.end-game-modal').css('display','block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');
 
  $('.button-area span').click(function() {
    
    $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');
    
    setTimeout(function() {
      $('.modal-container').css('display', 'none');
      startNewGame();
    }, 700);
    
    $('.button-area span').off();
  });
}

//GAMEPLAY
function startNewGame() {
  liveBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $('.square').text("").removeClass('o-marker x-marker');
  renderBoard(liveBoard);
  gameStarted = true;
  timerState(gameStarted);
  aiTutorial();
}

function timerState(gameStarted){
  if(gameStarted == true){
    clearTimer();
    startTimer();
  }
  else{
    stopTimer();
  }
} 
function randomMove(liveBoard){
    //var randMove = Math.floor(Math.random()*liveBoard.length);
   var emptySpaces = availableMoves(liveBoard);
   if(emptySpaces.length > 0){
     randMove =(Math.floor(Math.random()*(emptySpaces.length))) % emptySpaces.length;
     RandMove = emptySpaces[randMove];
   }else{
    RandMove = -1;
   }
   return RandMove;
  }



function aiTutorial() {
    // Check if the game has a winning condition or is a draw
    if (checkVictory(liveBoard)) {
        animateWinLine();
        setTimeout(endGameMessage, 700);
    } else {
        if (currentPlayer === 'random') {
            randomMove(liveBoard);
            liveBoard[RandMove] = currentPlayer === 'random' ? -1 : 1;
            currentPlayer = 'minimax'; // Switch to the other AI
        } else {
            miniMax(liveBoard, 'aiPlayer');
            liveBoard[AIMove] = currentPlayer === 'random' ? -1 : 1;
            currentPlayer = 'random'; // Switch back to the Random AI
        }
        renderBoard(liveBoard);
        setTimeout(aiTutorial, 500); // Continue the game loop after a short delay
    }
}

function startTimer(){
 incrementTimer();
 interval = setInterval(incrementTimer, 1000);
}
function stopTimer(){
  time = 0;
 clearInterval(interval);
}
function clearTimer(){
  hours.innerHTML = '00';
  minutes.innerHTML ='00';
  seconds.innerHTML = '00';
}
function incrementTimer(){
  time++;

  var second = time % 60;
  var minute = Math.floor(time / 60) % 60;
  var hour = Math.floor(time / 3600) % 60;
  
  second = (second < 10) ? '0'+second : second;
  minute = (minute < 10) ? '0'+minute : minute;
  hour = (hour < 10) ? '0'+hour : hour;
  
  hours.innerHTML = hour;
  minutes.innerHTML = minute;
  seconds.innerHTML = second;
}

//var interval = setInterval(incrementTimer,1000); //1000 miliseconds == 1 second




//UTILITIES
function checkVictory(board) {
  var squaresInPlay = board.reduce(function(prev, cur) {
    return Math.abs(prev) + Math.abs(cur);
  });

  var outcome = winningLines.map(function(winLines) {
    return winLines.map(function(winLine) {
      return board[winLine];
    }).reduce(function(prev, cur) {
      return prev + cur;
    });
  }).filter(function(winLineTotal) {
    return Math.abs(winLineTotal) === 3;
  });

  if (outcome[0] === 3) {
    return 'win';
  } else if (outcome[0] === -3) {
    return 'lose';
  } else if (squaresInPlay === 9) {
    return 'draw';
  } else {
    return false;
  }
}

function availableMoves(board) {
  return board.map(function(el, i) {
    if (!el) {
      return i;
    }
  }).filter(function(e) {
    return (typeof e !== "undefined");
  });
}

//AI
//minimax algorithm - explanation here: http://http://neverstopbuilding.com/minimax
function miniMax(state, player) {
  //base cases: check for an end state and if met - return the score from the perspective of the AI player.  
  var rv = checkVictory(state);
  if (rv === 'win') {
    return 10;
  }
  if (rv === 'lose') {
    return -10;
  }
  if (rv === 'draw') {
    return 0;
  }

  var moves = [];
  var scores = [];
  //for each of the available squares: recursively make moves and push the score + accompanying move to the moves + scores array
  availableMoves(state).forEach(function(square) {
    state[square] = (player === 'aiPlayer') ? 1 : -1;
    scores.push(miniMax(state, (player === 'aiPlayer') ? 'opponent' : 'aiPlayer'));
    moves.push(square);
    state[square] = 0;
  });

  //calculate and return the best score gathered from each of the available moves. track the best movein the AIMove variable

  if (player === 'aiPlayer') {
    AIMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
    return Math.max.apply(Math, scores);
  } else {
    AIMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
    return Math.min.apply(Math, scores);
  }
}

renderBoard(liveBoard);
chooseMarker();