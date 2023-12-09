/*class Tree{
//nodes representing: child, parent, termination ? , visits ?, score ? ??
  treeConstructor(gameboard,parentNode)
  {
        this.gameboard = gameboard;
        if ((checkVictory(gameboard) == "win") || (checkVictory(gameboard) == "draw")) {
           this.is_terminal = true

        else:
            this.is_terminal = false

       this.is_fully_expanded = self.is_terminal
        //initialise parent
        this.parentNode = parentNode

        //initialise number of nodes visited
       this.numvisits = 0

        //initialise total score of node
        this.score = 0

        //initialise current node's children
        this.children = {}
  }
}
*/ 

/*
class MCTS{
    function searchTree(){

      this.rootNodeExplorer = new Tree(liveboard,0);
      numIterations = 0;

      for(var iteration=0; iteration<numIterations; iteration++){
        explorerNode = selectNode(this.rootNodeExplorer);
        score = simulationRollot(explorerNode.gameboard);
        backpropagation(explorerNode, score);

      }
    try{
      return getPromisingMove(rootNodeExplorer,2)
    }
    catch{

    }
    }
    function loopingAvailMoves(explorerNode)
    {
        availableMoves(this.gameboard);
     // for(var i=0;i<this.gameboard.length;i++)
    }

    function expandNode(explorerNode)
    {
      legalBoardStates = explorerNode.availableMoves(this.gameboard);
      while(legalBoardStates.forEach(loopingAvailMoves)!= false){
          var boarstate = legalBoardStates.child
          if(explorerNode.children.includes(boardstate.toString())){
          newFoundNode = Tree(boardstate, explorerNode);
          explorerNode.children[boardstate.toString()] = newFoundNode;

          if(boardstate.length == explorerNode.children.length){
            explorerNode.is_fully_explored = true
          }


        }
      }
      return newFoundNode;
    }

    function simulationRollout(gameboard){
      while(checkVictory(this.gameboard) != true){
        try{
          gameboard = gameboard[(Math.floor(Math.random() * availableMoves(gameboard)))];
        }
        catch{
          return 0;
        }

        //call outcome function
          return 0
      }
    }

    function backpropagation(explorerNode, score){
      
      while (explorerNode != null){
        exploreNode.visits += 1;
        explorerNode.score += score;
        explorerNode = explorerNode.parentNode;
      }
    }

    function getPromisingMove(explorerNode, explorationConstant)
    {
      bestScore = 0;
      bestMoves = [];

      //Define current players' markers

      //UCT score calculation
      moveScore = (currentPlayer *childNode.score /childNode.visits) + (explorationConstant * Math.sqrt(Math.log(explorerNode.visits)/childNode.visits))

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

*/



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
  miniMax(liveBoard, 'aiPlayer');
  liveBoard[AIMove] = 1;
  renderBoard(liveBoard);
  if (checkVictory(liveBoard)) {
    animateWinLine();
    setTimeout(endGameMessage, checkVictory(liveBoard) === 'win' ? 700 : 100);
  } else {
    playerTakeTurn();
  }
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
// In this function there is an ai take turn method so we can use that to  implement the mcts functionality based on what i was sent for the java script
// Search
//Expansion
//Simulation
//Backpropagation

/*
function mcts(gamestate,player){
  return searchMove(gamestate, player);
}

//find an select the best move from the tree
function selectMove(gamestate, player){
return UCTCalulation(currentNode,explorationConstant)
}

function expandNode(explorerNode)
{
 while(explorerNode.is_terminal == false)
 {
#case where the node is fully expanded 
    if node.is_fully_expanded:
        node = self.get_best_move(node, 2)

    #case where the node is not fully expanded
    else:
        #otherwise exapnd the node
        return self.expand(node)
 }
}

function gameSimulations(){
  //use the expanded node to simulate the game and get the markers of each player

}
function backpropagation(){

} */
//Use the methods and the functionality here to create the MCTS Part!
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

/*
function renderProperties(){
 renderBoard(liveBoard);
chooseMarker(); 
}*/





