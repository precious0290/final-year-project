var cpuIcon = 'X';
var playerIcon = 'O';
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
      startNewGame();
    }, 700);
    
    $('.button-area span').off();
  });
}

function endGameMessage(){
  gameStarted = false;
  timerState(gameStarted);
  var result = checkVictory(liveBoard);
  var wintext = "";
  if(result == 'win'){
    wintext = "You lose!";
  }else if(result == 'lose'){
    wintext = "You win!";
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
  playerTakeTurn();
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

function playerTakeTurn() {
  $('.square:empty').hover(function() {
    $(this).text(playerIcon).css('cursor', 'pointer');
  }, function() {
    $(this).text('');
  });

  $('.square:empty').click(function() {
    $(this).css('cursor', 'default');
    liveBoard[parseInt($(this).attr('id'))] = -1;
    renderBoard(liveBoard);
    
    if (checkVictory(liveBoard)) {    
      setTimeout(endGameMessage,(checkVictory(liveBoard) === 'win') ? 700 : 100);
    } else {
      setTimeout(aiTakeTurn, 100);
    }
    $('.square').off();
  });
}

function randomMove(liveBoard){
  //var randMove = Math.floor(Math.random()*liveBoard.length);
 var emptySpaces = availableMoves(liveBoard);
 randMove =(Math.floor(Math.random()*(emptySpaces.length))) % emptySpaces.length;
 AIMove = randMove;
 return AIMove;

}
function aiTakeTurn() {
 // miniMax(liveBoard, 'aiPlayer');
 randomMove(liveBoard);
  liveBoard[AIMove] = 1;
  renderBoard(liveBoard);
  if (checkVictory(liveBoard)) {
    animateWinLine();
    setTimeout(endGameMessage, checkVictory(liveBoard) === 'win' ? 700 : 100);
  } else {
    playerTakeTurn();
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



renderBoard(liveBoard);
chooseMarker();