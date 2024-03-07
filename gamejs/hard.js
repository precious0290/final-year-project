var cpuIcon = 'X';
var playerIcon = 'O';
var AIMove;
//settings for liveBoard: 1 is cpuIcon, -1 is playerIcon, 0 is empty
var liveBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
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
var time = 0;
let interval;
const hours = document.querySelector('.hour');
const minutes = document.querySelector('.minute');
const seconds = document.querySelector('.second');
var gameStarted = false;
class Tree{
    constructor(gameboard,parentNode)
    {
            this.gameboard = gameboard;
          if ((checkVictory(gameboard) == "win") || (checkVictory(gameboard) == "draw")) {
             this.is_terminal = true;
          }
          else{
            this.is_terminal = false;
          }
              
  
         this.is_fully_expanded = this.is_terminal; //shows the expanded state of the nodde
          //initialise parent
          this.parentNode = parentNode;
  
          //initialise number of nodes visited
         this.numvisits = 0;
  
          //initialise total score of node
          this.score = 0;
  
          //initialise current node's children
          this.children = {};
    }
  get Liveboard(){
    return this.gameboard;
  }
  set NumVisits(numvisits){
    this.numvisits = numvisits;
  }
  get NumVisits(){
    return this.numvisits;
  }
  
  set Score(value){
    this.score = value;
  }
  get Score(){
    return this.score;
  }
   addChild(childIdentifier, ChildNode){
    this.children[childKey] = childIdentifier;
   }
  }
  //MCTS Attempt -> chatgpt provided me with helpful suggestions and debug handling still having problems
 
  //Selection
  function Selection(liveBoard){
    var rootNodeExplorer = new Tree(liveBoard, this); //class Tree object
     var iterations = 1000; //number of iterations for the for loop, most people seem to ue 1000
   //looping the actions of expanding the tree, simulating the game, performing backpropagation and UCT and returning the selected move
     for(var i = 0; i < iterations;i++){
       var explorerNode = rootNodeExplorer;
       explorerNode = Expansion(explorerNode);
       var score = Simulation(explorerNode);
       Backpropagation(score, explorerNode);
       AIMove = UCT(explorerNode);
     }
     return AIMove;
   }
   //Expansion deals with finding a node that is not a terminal node in order to explore potential moves
   //for the AI player
   //If the tree is fully expanded/node is terminal the node is returned else child nodes is returned
   function Expansion(explorerNode){
     if(explorerNode.is_terminal == true){
         return explorerNode;
     }
     else{
       var unexploredMoves = getUnexploredNode(explorerNode);
       if(unexploredMoves.length > 0){
         var moves = unexploredMoves[Math.floor(Math.random()*unexploredMoves.length)];
         var child = expandNode(explorerNode, moves);
         updateNodeExpansionStatus(explorerNode);
         return child;
       }
       else{
         explorerNode.is_fully_expanded = true;
         return explorerNode;
       }
     }
   }
   
   function getUnexploredNode(explorerNode)
   {
     var possibleNodes = availableMoves(explorerNode.Liveboard);
     var exploredNodes = Object.keys(explorerNode.children).map(Number); //Number changes the string representation of the board to numbers
     return possibleNodes.filter(move => !exploredNodes.includes(move));
   }
   function expandNode(explorerNode, move){
     var newBoard = explorerNode.Liveboard.map((x) => x);
     newBoard[move] = getCurrentPlayer(newBoard);
     var childNode = new Tree(newBoard, explorerNode);
     explorerNode.children[move] = childNode;
     return childNode;
   }
   function getCurrentPlayer(board) {
     // Count 'X's and 'O's on the board
     var xCount = board.filter(cell => cell === 'X').length;
     var oCount = board.filter(cell => cell === 'O').length;
   
     // Determine the current player
     if (xCount > oCount) {
         return 'O'; // 'O's turn
     } else {
         return 'X'; // 'X's turn
     }
   }
   function updateNodeExpansionStatus(explorerNode){
     var unexploredMoves = getUnexploredNode(explorerNode);
     if(unexploredMoves.length === 0){
       explorerNode.is_fully_expanded = true;
     }
   }
   function Simulation(explorerNode){
     //playgame state between the selected node and returning the score of the complete game
     
     console.log('explorer.gameboard:', explorerNode.Liveboard);
     var tempBoard = explorerNode.Liveboard.map((x) => x);
     var player1 = playerIcon;
     var player2 = cpuIcon;
     var currentPlayer = player1;
   
     if(!Array.isArray(explorerNode.Liveboard)){
       console.log("tempboard not iterable");
       return;
     }
     
     while(true){
       var movesAvailable = availableMoves(tempBoard);
       if((movesAvailable.length === 0) || (checkVictory(tempBoard))){
         break;
     }
     else{
       var move = movesAvailable[Math.floor(Math.random() * movesAvailable.length)];
       tempBoard[move] = currentPlayer;
       currentPlayer = (currentPlayer === player1) ? player2 : player1;  
     }
     
     var gameResult = checkVictory(tempBoard);
       if(gameResult === 'win'){
         return -1; //if player wins return -1
       }
       else if(gameResult === 'lose'){
         return 1; // if AI wins return 1
       }
       else{
         return 0; //If draw return 0
       }
    
   }
     
     /* 
     if(player2 wins){
   
       return 1;
     }
     else if(player1 wins){
       return -1;
     }
     else{
       return 0;
     }
     
     */
   }
   function Backpropagation(score, explorerNode){

     while(explorerNode !== null){  
      var currentVisits = explorerNode.NumVisits;
      var currentScore = explorerNode.Score;

       explorerNode.NumVisits = currentVisits + 1 ; //+1 for node visited
       explorerNode.Score = currentScore + score; //add the score of simulation result
       
       explorerNode = explorerNode.parentNode; //explorer node becomes the parent
     }
     
   } 
   //UCT implementation with the formula
   function UCT(explorerNode){
     var constNode = Math.sqrt(2);
     if(explorerNode.NumVisits == 0){
       return Infinity;
     }
     return Math.floor((explorerNode.score/explorerNode.NumVisits()) + constNode * Math.sqrt(Math.log(explorerNode.parentNode.NumVisits())/ explorerNode.NumVisits()));
     //Math Formula -? wins/visits + constant * sqrt(log Parent visits/ visits)
   }
     




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
console.log("liveboard:"+ liveBoard);
// In this function there is an ai take turn method so we can use that to  implement the mcts functionality based on what i was sent for the java script
// Search
//Expansion
//Simulation
//Backpropagation
function aiTakeTurn() {
  //call mcts here
 //const mctsPlayer = new MCTS(liveBoard, cpuIcon,AIMove);
Selection(liveBoard,0);
 //miniMax(liveBoard, 'aiPlayer');
 if(AIMove !== undefined) { 
  liveBoard[AIMove] = 1;
  renderBoard(liveBoard);
  if (checkVictory(liveBoard)) {
    animateWinLine();
    setTimeout(endGameMessage, checkVictory(liveBoard) === 'win' ? 700 : 100);
  } else {
    playerTakeTurn();
  }
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
//change how checkVictory logic finds win/loss in code for the MCTS function
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
/*function miniMax(state, player) {
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
  var scores = []; */
  //for each of the available squares: recursively make moves and push the score + accompanying move to the moves + scores array
 /* availableMoves(state).forEach(function(square) {
    state[square] = (player === 'aiPlayer') ? 1 : -1;
    scores.push(miniMax(state, (player === 'aiPlayer') ? 'opponent' : 'aiPlayer'));
    moves.push(square);
    state[square] = 0;
  }); */

  //calculate and return the best score gathered from each of the available moves. track the best movein the AIMove variable
/*
  if (player === 'aiPlayer') {
    AIMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
    return Math.max.apply(Math, scores);
  } else {
    AIMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
    return Math.min.apply(Math, scores);
  }
}
*/


  
      
  
  
  
  
  

renderBoard(liveBoard);
chooseMarker();

/*
function renderProperties(){
 renderBoard(liveBoard);
chooseMarker(); 
}*/





