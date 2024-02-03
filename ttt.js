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
  var result = checkVictory(liveBoard);
  $('.end-game-modal h3').text(result === 'win' ? 'You Lost' : "It's a draw");
  
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
  //renderProperties();
  renderBoard(liveBoard);

  //chooseMarker();
  //chooseDifficulty();
  playerTakeTurn();
 // chooseMarker();
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

// In this function there is an ai take turn method so we can use that to  implement the mcts functionality based on what i was sent for the java script
// Search
//Expansion
//Simulation
//Backpropagation
function aiTakeTurn() {
  //call mcts here
 //const mctsPlayer = new MCTS(liveBoard, cpuIcon,AIMove);
  AIMove = Selection(liveBoard);
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
//change how checkVictory logic finds win/loss in code for the MCTS function
//UTILITIES
function checkVictory(board) {

var outcome = '';
 // console.log("board length: " + board.length);
  /* 
    1. Loop through board state elements
    1.1 -> How to loop through board state elements ?
    1.2  -> how to check for consecutive state elements in board state
    1.3 -> Is there a better method to check for consecutive state elements in board state

    2. return the outcome of the loop -> win/loss, draw
    2.1 -> draw is when there is no win/lose
    2.2 -> win/loss is when there is 3 consecutive state elements 
    */

  for(var line of winningLines){
    var [a, b, c] = line;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      outcome = cpuIcon ? cpuIcon : playerIcon;
    }
  }
  if(board.every(cell => cell !== 0)){
    outcome = 'draw';
  }

   if(outcome === cpuIcon){
    return 'win';

   }
   else if(outcome === playerIcon){
    return 'lose';
   }
   else if(outcome === 'draw'){
    return 'draw';
   }
   else{
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
class Tree{
  //nodes representing: child, parent, termination ? , visits ?, score ? ??
   gameboard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
   is_terminal;
   is_fully_expanded;
   parentNode;
   numvisits;
   score;
   children;
    constructor(gameboard,parentNode)
    {
            this.gameboard = Array.isArray(gameboard) ? [...gameboard] : [];
          if ((checkVictory(gameboard) == "win") || (checkVictory(gameboard) == "draw")) {
             this.is_terminal = true;
          }
          else{
            this.is_terminal = false;
          }
              
  
         this.is_fully_expanded = self.is_terminal;
          //initialise parent
          this.parentNode = parentNode;
  
          //initialise number of nodes visited
         this.numvisits = 0;
  
          //initialise total score of node
          this.score = 0;
  
          //initialise current node's children
          this.children = {};
    }
  getLiveboard(){
    return this.gameboard;
  }
  }
  //MCTS Attempt

  //Selection
function Selection(liveBoard){
  var rootNodeExplorer = new Tree(liveBoard, this);
  var iterations = 1000;

  for(var i = 0; i < iterations;i++){
    var explorerNode = rootNodeExplorer;
    explorerNode = Expansion(explorerNode);
    var score = Simulation(explorerNode);
    var backpropresult = Backpropagation(score, explorerNode);
    AIMove = UCT(backpropresult, explorerNode);
  }
  return AIMove;
}

function Expansion(explorerNode){
  if(explorerNode.is_terminal == true){
      return explorerNode;
  }
  else{
    return explorerNode.children;
  }
}

function Simulation(explorerNode){
  //playgame state ?
  
  console.log('node.gameboard:', explorerNode.gameboard);
  var tempBoard = [...explorerNode.gameboard];
  var player1 = playerIcon;
  var player2 = cpuIcon;
  var currentPlayer = player1;

  if(!Array.isArray(node.gameboard)){
    console.log("tempboard not iterable");
    return;
  }
  
  while(true){
    var movesAvailable = availableMoves(tempBoard);
    if((movesAvailable.length === 0) || (checkVictory(tempBoard))){
      break;
  }
  else{
    var move = movesAvailables[Math.floor(Math.random() * movesAvailable.length)];
    tempBoard[move] = currentPlayer;
    currentPlayer = (currentPlayer === player1) ? player2 : player1;  
  }
  
  var gameResult = checkVictory(tempBoard);
    if(gameResult === 'win' && currentPlayer === player1){
      return -1; //if player wins return -1
    }
    else if(gameResult === 'win' && currentPlayer === player2){
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
    explorerNode.numvisits += 1; //+1 for node visited
    explorerNode.score += score; //add the score of simulation result
    explorerNode = explorerNode.parentNode; //explorer node becomes the parent
  }
  
} 

function UCT(backpropresult, explorerNode){
  var constNode = Math.sqrt(2);
  if(explorerNode.numvisits == 0){
    return Infinity;
  }
  return Math.floor((explorerNode.score/explorerNode.numvisits) + constNode * Math.sqrt(Math.log(explorerNode.parentNode.numvisits)/ explorerNode.numvisits));
  //Math Formula
}
  
  
      
  
  
  
  
  

renderBoard(liveBoard);
chooseMarker();

/*
function renderProperties(){
 renderBoard(liveBoard);
chooseMarker(); 
}*/





