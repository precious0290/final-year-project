class Tree{
//nodes representing: child, parent, termination ? , visits ?, score ? ??

 //var is_terminal = false;
 //var is_fully_expanded = false;
 //var numvisits = 0;
 //var score = 0;
 //var children = {};
  treeConstructor(gameboard,parentNode)
  {
        this.gameboard = gameboard;
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
}



class MCTS{

 constructor(liveBoard,aiPlayer) {
        this.liveBoard = liveBoard;
        this.aiPlayer = aiPlayer;
      //  this.searchTree() = this.searchTree(liveboard,aiPlayer);
      //  this.selectNode() = this.selectNode(liveboard,aiPlayer);
      //  this.expandNode() = this.expandNode(liveboard,aiPlayer);
       // this.simulationRollout() = this.simulationRollout(liveboard,aiPlayer);
       // this.getPromisingMove() = this.getPromisingMove(liveboard,2,aiPlayer);
  }
/*  availableMoves(state).forEach(function(square) {
    state[square] = (player === 'aiPlayer') ? 1 : -1;
    scores.push(searchTree(state, (player === 'aiPlayer') ? 'opponent' : 'aiPlayer'));
    moves.push(square);
    state[square] = 0;
  });
*/
  //Select
  searchTree(liveboard, aiPlayer){

      this.rootNodeExplorer = new Tree(liveboard,0);
      var numIterations = 1000;

      for(var iteration=0; iteration<numIterations; iteration++){
       var  explorerNode = this.selectNode(this.rootNodeExplorer);
        var score = this.simulationRollout(explorerNode.gameboard, aiPlayer);
        this.backpropagation(explorerNode, score);
      }

    try{
      AIMove = getPromisingMove(rootNodeExplorer,2,aiplayer)
    }
    catch{

    }
    }

    selectNode(rootNodeExplorer)
    {
      //make sure that we're dealing with non-terminal nodes
      while(rootNodeExplorer.is_terminal == false){
        if(rootNodeExplorer.is_fully_expanded){
          rootNodeExplorer = this.getPromisingMove(gameboard,rootNodeExplorer,2);
        }
        else{
          return expandNode(rootNodeExplorer);
        }
      }
      return rootNodeExplorer;
    }
   // function loopingAvailMoves(explorerNode)
   // {
   //     availableMoves(this.gameboard);
     // for(var i=0;i<this.gameboard.length;i++)
  //  } 
      //expand
     expandNode(explorerNode)
    {

      legalBoardStates = explorerNode.availableMoves(this.gameboard);

      for(var boardState of legalBoardStates)
      {
          if(explorerNode.children.includes(boardstate.position.toString())){
          var newFoundNode = Tree(boardstate, explorerNode);
          explorerNode.children[boardstate.postion.toString()] = newFoundNode;

          if(boardstate.length == explorerNode.children.length){
            explorerNode.is_fully_explored = true
          }
      }
     // while(legalBoardStates.forEach(loopingAvailMoves)!= false){
       //   var boarstate = legalBoardStates.child
      //    if(explorerNode.children.includes(boardstate.position.toString())){
      //    newFoundNode = Tree(boardstate, explorerNode);
      //    explorerNode.children[boardstate.postion.toString()] = newFoundNode;

      //    if(boardstate.length == explorerNode.children.length){
       //     explorerNode.is_fully_explored = true
       //   }


        }
        return newFoundNode;
      }
      
        //simulate
    simulationRollout(gameboard,aiPlayer){
      while(checkVictory(this.gameboard) != true){
        try{
          gameboard = gameboard[(Math.floor(Math.random() * availableMoves(gameboard)))];
        }
        catch{
          return 0;
        }
          if(aiPlayer == "X")
          {
            if(aiPlayer == "X")
            {
              return 1;
            }
            else{
              return -1;
            }
          }
          else if(aiPlayer == "O"){
            if(aiPlayer == "O"){
              return 1;
            }
            else{
              return -1;
            }
          }

        //call outcome function
       
      }
    }
//backprop
    backpropagation(explorerNode, score){
      
      while (explorerNode != null){
        exploreNode.visits += 1;
        explorerNode.score += score;
        explorerNode = explorerNode.parentNode;
      }
    }

    getPromisingMove(gameboard,explorerNode, explorationConstant, aiPlayer)
    {
      var cpuIcon = aiPlayer;
      var playerIcon = "";
      if (cpuIcon == "X")
      {
          playerIcon = "O";
      }
      else{
        playerIcon = "X";
      }
      bestScore = 0;
      bestMoves = [];
      var currentPlayer = 0;

      //Define current players' markers
      //let childNode.gameboard.player of explorerNode.children.valueOf()
        for(let childNode of explorerNode.children.valueOf())
        {
          if(childNode.gameboard == cpuIcon)
          {
            currentPlayer = 1;
          }
          else if(childNode.gameboard == playerIcon)
          {
            currentPlayer = -1;
          }
        }
      //UCT score calculation
      moveScore = (currentPlayer *childNode.score/childNode.visits) + (explorationConstant * Math.sqrt(Math.log(explorerNode.visits)/childNode.visits));

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMoves.push(childNode);
      }
      else if(moveScore == bestScore) {
        besMoves.push(childNode);
      }

      return bestMoves[(Math.floor(Math.random() * bestMoves.length))];
    }
 }

    





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
 // mcts(liveBoard, 'aiPlayer');
 
// var SearchNodeResults = mctsPlayer.searchTree(liveBoard, 'aiPlayer');
 //var expandNode = mctsPlayer.expandNode(liveBoard, searchNodeResults);
 //var simulationResult = mctsPlayer.simulationRollout(liveBoard,expandNode);
// mctsPlayer.backpropagation(expandNode, simulationResult);
  mctsPlayer = new MCTS(liveBoard, 'aiPlayer');
  mctsPlayer.searchTree(liveBoard, 'aiPlayer');
 //miniMax(liveBoard, 'aiPlayer');
  liveBoard[AIMove] = 1;
  renderBoard(liveBoard);
  if (checkVictory(liveBoard)) {
    animateWinLine();
    setTimeout(endGameMessage, checkVictory(liveBoard) === 'win' ? 700 : 100);
  } else {
    playerTakeTurn();
  }
}
//change how checkVictory logic finds win/loss in code for the MCTS function
//UTILITIES
function checkVictory(board) {
  var squaresInPlay = [...cellElements].every(cell => {
    return cell.classList.contains(playerIcon)||cell.classList.contains(cpuIcon)
});
  /* function checkWin(currentClass){
    return winning_combos.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
    
    const cellElements = document.querySelectorAll('[data-cell]')

    return [...cellElements].every(cell => {
        return cell.classList.contains(playerIcon)||cell.classList.contains(cpuIcon)
    })
    
    */

  var outcome = winningLines.some(combination => {
    return combination.every(index => {
      return board[index].classList.contains(playerIcon);
      // return cellElements[index].classList.contains(currentClass);
    });
    return combination.every(index => {
      return board[index].classList.contains(cpuIcon);
      // return cellElements[index].classList.contains(currentClass);
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





