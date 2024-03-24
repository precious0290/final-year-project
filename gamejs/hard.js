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
   // console.log('Getting score...');
    return this.score;
  }
  /*
   addChild(childIdentifier, ChildNode){
    this.children[childKey] = childIdentifier;
   } */
 addChild(childIdentifier, ChildNode){
    this.children[childIdentifier] = ChildNode;
  }
   get Children(){
    return this.children;
   }
   /*
   getChildrenLength(){
    return this.children.length;
   } */
   get ChildrenLength(){
    return Object.keys(this.children).length;
  }
  }
  //MCTS Attempt -> chatgpt provided me with helpful suggestions and debug handling still having problems
 
  //Selection
  function Selection(liveBoard){
    var rootNodeExplorer = new Tree(liveBoard, null); //class Tree object
    var iterations = 50;
    //availableMoves(liveBoard).length;
     //var iterations = 8; //number of iterations for the for loop, most people seem to use 1000
   //looping the actions of expanding the tree, 
   //simulating the game, performing backpropagation 
   //and UCT and returning the selected move
     for(var i = 0; i < iterations;i++){
       var explorerNode = rootNodeExplorer;
       explorerNode = Expansion(explorerNode);
       if(explorerNode !== null){
        var score = Simulation(explorerNode);
      //console.log("Simulation score: " + score);
       Backpropagation(score, explorerNode);
       AIMove = UCT(explorerNode);
       }
     }
     return AIMove;
   }
   /*
   What I am trying to achieve with Expansion:

      function Expansion(node){

        if(node is Terminal){
          return node;
        }
        else{
          newnode = new Tree(node.LiveBoard, node);
          newnode explores and pushes new moves to the children set, so i think this needs to be a while loop ?.

              need to check if every next possible move has been found then we just return the newnode         
            if(availableMoves(newnode.LiveBoard) == 0){
                return newnode;
            }
        }
      }
   
   
   */
  /*
  function Expansion(explorerNode){
    if(explorerNode.is_terminal){
      return explorerNode;
    }
    else{
        var newNode = new Tree(explorerNode.Liveboard, explorerNode);
        var newNodeLen = availableMoves(newNode.Liveboard);
        while( newNodeLen.length > 0){

        }
        //need to push newNode moves into the children list that stores all the possible moves (nodes found)
        
    }
  } */
  function Expansion(explorerNode) {
    if (explorerNode.is_terminal) {
        return explorerNode;
    } else {
        var availableMovesList = availableMoves(explorerNode.Liveboard);
        availableMovesList.forEach(move => {
            // Create a new board state with the current move applied
            var newBoard = explorerNode.Liveboard.map(cell => {
              if (cell === 1) return cpuIcon; // Use the AI's symbol
              else if (cell === -1) return playerIcon; // Use the player's symbol
              else return ' '; // Empty cells
          }); // Clone the liveboard
            newBoard[move] = getCurrentPlayer(explorerNode.Liveboard); // Apply the move
            // Create a new Tree node for the new board state
            var childNode = new Tree(newBoard, explorerNode);

            // Add the new child node to the explorerNode's children
            // Assuming children is an object where key is the move and value is the node
            /*explorerNode.children[move] = childNode; */
             // Use the addChild method to add the new child node to the explorerNode's children
             explorerNode.addChild(move, childNode);
        });
        if (availableMovesList.length > 0) {
          explorerNode.is_fully_expanded = true;
      }


        // Update the explorerNode's expansion status
       // explorerNode.is_fully_expanded = true;
        return explorerNode;
    }
}
   //Expansion deals with finding a node that is not a terminal node in order to explore potential moves
   //for the AI player
   //If the tree is fully expanded/node is terminal the node is returned else child nodes is returned
  /* function Expansion(explorerNode){
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
   } */
  /* 
   function getUnexploredNode(explorerNode)
   {
     var possibleNodes = availableMoves(explorerNode.Liveboard);
     var exploredNodes = Object.keys(explorerNode.children).map(Number); //Number changes the string representation of the board to numbers
     console.log("Possible Nodes: " + possibleNodes);
     console.log("Explored Nodes: " + exploredNodes);
     return possibleNodes.filter(move => !exploredNodes.includes(move));
   }
   function expandNode(explorerNode, move){
     var newBoard = explorerNode.Liveboard.map((x) => x);
     console.log("newBoard: " + newBoard);
     newBoard[move] = getCurrentPlayer(newBoard);
     var childNode = new Tree(newBoard, explorerNode);
     explorerNode.children[move] = childNode;
     return childNode;
   } */
   function getCurrentPlayer(board) {
     // Count 'X's and 'O's on the board
     var mctsAI = playerIcon === 'X' ? 'O' : 'X';
     var playerCount = board.filter(cell => cell === playerIcon).length;
     var mctsCount = board.filter(cell => cell === mctsAI).length;

     /*var xCount = board.filter(cell => cell === 'X').length;
     var oCount = board.filter(cell => cell === 'O').length; */
   
     // Determine the current player
     if (playerCount > mctsCount) {
         return mctsAI; // 'O's turn
     } else {
         return playerIcon; // 'X's turn
     }
   }
  /* function updateNodeExpansionStatus(explorerNode){
     var unexploredMoves = getUnexploredNode(explorerNode);
     if(unexploredMoves.length === 0){
       explorerNode.is_fully_expanded = true;
     }
     explorerNode.is_fully_expanded = false;
   } */
   function Simulation(explorerNode){
     //playgame state between the selected node and returning the score of the complete game
     var winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // console.log('explorer.gameboard:', explorerNode.Liveboard);
     var tempBoard = explorerNode.Liveboard.map(cell => {
      if (cell === 1) return cpuIcon; // Use the AI's symbol
      else if (cell === -1) return playerIcon; // Use the player's symbol
      else return ' '; // Empty cells
  });
    //console.log("Temp board: " + tempBoard);
     var player1 = playerIcon; //player symbolises human
     var player2 = cpuIcon; //cpu symbolises AI
     var currentPlayer = player2;
    /* var tempBoard = explorerNode.Liveboard.map((x) => x); */
     if(!Array.isArray(explorerNode.Liveboard)){
       console.log("tempboard not iterable");
       return;
     }
     
     while(true){
       var movesAvailable = availableMoves(tempBoard);
       if((movesAvailable.length === 0) || determineWinner(tempBoard,winLines,player1,player2)){
         break;
     }
     else{
       var move = movesAvailable[Math.floor(Math.random() * movesAvailable.length)];
       tempBoard[move] = currentPlayer;
       currentPlayer = (currentPlayer === player1) ? player2 : player1; 
      // console.log("Current player: " + currentPlayer);
       //console.log("Temp board: " + tempBoard);

     } 
     //console.log("made it Simulation");
   } 
   var gameResult = determineWinner(tempBoard,winLines,player1,player2);
  // console.log("Game result: " + gameResult);
       if(gameResult === 'AI'){
         return 1; //if AI wins return 1
       }
       else if(gameResult === 'Human'){
         return -1; // if player wins return -1
       }
       else{
         return 0; //If draw return 0
       }
     
   }
   function determineWinner(board, winningLines, humanSymbol, aiSymbol) {
    var winnerFound = false;
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];

        // Check if the board has a winning line for either symbol
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Determine the winner based on the symbol
            winnerFound = true;
            if (board[a] === humanSymbol) {
                return 'Human';
            } else if (board[a] === aiSymbol) {
                return 'AI';
            }
        }
    }

    // Check for a draw (all cells are filled and no winner)
    const isDraw = board.every(cell => cell === humanSymbol || cell === aiSymbol);
    if (isDraw && winnerFound == false) {
        return 'Draw';
    }

    // No winner or draw yet
    return null;
}
// i think this works now but uses too much memory
/*function Backpropagation(score, explorerNode) {
 while (explorerNode !== null && explorerNode !== undefined) {
      if (explorerNode instanceof Tree) {
          // Safe to proceed with explorerNode
          var currentVisits = explorerNode.NumVisits;
          var currentScore = explorerNode.Score;
          
          console.log("Current visits:" + currentVisits);
          console.log("Current Score:"+ score);

           explorerNode.NumVisits = currentVisits + 1 ; //+1 for node visited
           explorerNode.Score = currentScore + score; //add the score of simulation result

          console.log("Node Visits: "+ explorerNode.NumVisits); 
          console.log("Explorer Node Score "+explorerNode.Score);
         


           explorerNode = explorerNode.parentNode;

         
      } else {
          console.error("explorerNode is not an instance of Tree", explorerNode);
          break; // Exit the loop if explorerNode is not a Tree instance
      }

      
  } 
 
} */

function Backpropagation(score, explorerNode) {
  while (explorerNode !== null && explorerNode instanceof Tree) {
    // Safe to proceed with explorerNode
    var currentVisits = explorerNode.NumVisits;
    var currentScore = explorerNode.Score;
    //console.log("Current visits:" + currentVisits);
    //console.log("Current Score:"+ score);

    explorerNode.NumVisits = currentVisits + 1; // +1 for node visited
    explorerNode.Score = currentScore + score; // add the score of simulation result

    //console.log("Node Visits: "+ explorerNode.NumVisits); 
    //console.log("Explorer Node Score "+explorerNode.Score);

    explorerNode = explorerNode.parentNode; // explorerNode becomes the parent
  }
}
//
   /*function Backpropagation(score, explorerNode){
      //(explorerNode !== window) || (explorerNode !== null && explorerNode !== undefined)     
     while(explorerNode !== null){
      if (explorerNode && 'NumVisits' in explorerNode && 'Score' in explorerNode) {
        // Safe to access explorerNode.NumVisits and explorerNode.Score
      var currentVisits = explorerNode.NumVisits;
      var currentScore = explorerNode.Score;

       explorerNode.NumVisits = currentVisits + 1 ; //+1 for node visited
       explorerNode.Score = currentScore + score; //add the score of simulation result
       
       explorerNode = explorerNode.parentNode; //explorer node becomes the parent //

    }  
      
      
      console.log("Node Visits: "+ explorerNode.NumVisits); 
      console.log("Explorer Node Score "+explorerNode.Score);
      console.log("Current Score:"+ score);
      console.log("Current visits:" + currentVisits);
     }
    
//
     
   }   */
   //UCT implementation with the formula
   function UCT(explorerNode) {

   // console.log("Explorer node Visits:" + explorerNode.NumVisits);
    if (explorerNode.NumVisits === 0) {
      return Number.MAX_SAFE_INTEGER; // Avoid division by zero in UCT formula
    }
    var moveFound = 0;
    let bestScore = Number.MIN_SAFE_INTEGER;
    let bestMoves = [];
    const constNode = Math.sqrt(2);
    var children;
    if(explorerNode instanceof Tree ) {
      children = explorerNode.Children;
      console.log(children);
    }
    else{
        console.log("Explorer node is undefined or not a Tree instance");
    }
    
    // Iterate through each child node
    Object.keys(children).forEach(move => {

      //console.log("Does it get here at all ?");
      let childNode = children[move];
      const scoreMean = 1 * childNode.Score / childNode.NumVisits;
      console.log("Score Mean: " + scoreMean);
      const parentsVisit = 2 * (Math.log(explorerNode.NumVisits));
      //console.log("Parents Visit: " + parentsVisit);
      const childVisit = childNode.NumVisits;
      console.log("Child Visit: " + childVisit);
  
        let uctScore = (scoreMean) + (constNode) * Math.sqrt(parentsVisit/childVisit);        
          console.log("UctScore: " + uctScore); 
        if (uctScore > bestScore) {
        bestScore = uctScore;
        bestMoves = [move]; // Reset bestMoves with the new best move
      } else if (uctScore === bestScore) {
        bestMoves.push(move); // Add move as equally good
      }
            
      
    });
  
    // Choose a move randomly from the best moves
    if (bestMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * bestMoves.length);  
      moveFound = bestMoves[randomIndex];
      return moveFound;
    }
    //console.log("bestMoveFound: " + moveFound);
    var emptySpaces = availableMoves(liveBoard);
    var randMoveGiven;
 if(emptySpaces.length > 0){
   randMove =(Math.floor(Math.random()*(emptySpaces.length))) % emptySpaces.length;
  randMoveGiven = emptySpaces[randMove];
 }else{
  randMoveGiven = -1;
 }
    //
    return  randMoveGiven; // returns random move from a list of available spaces until i get the implementation to work correctly.
  }
   /*
   function UCT(explorerNode){
    var bestScore =0;
    var bestMoves = [];
     var constNode = Math.sqrt(2);
     for(var i=0; i < explorerNode.getChildrenLength; i++){
      if(explorerNode.NumVisits == 0){
       return Infinity;
     }
     var result = Math.floor((explorerNode.score/explorerNode.NumVisits) + constNode * Math.sqrt(Math.log(explorerNode.parentNode.NumVisits)/ explorerNode.NumVisits));
    if( result > bestScore){
      bestScore = result;

      bestMoves.push(explorerNode.children[explorerNode.parentNode]);
    }
    else if(result == bestScore){
      bestMoves.push(explorerNode.children[explorerNode.parentNode]);
    }
     }
       #better move has been found
            if move_score > best_score:
                best_score = move_score
                best_moves = [child_node]

            #found as good move as already available
            elif move_score == best_score:
                best_moves.append(child_node)
            
        #return one of the best moves randomly
        return random.choice(best_moves)
     
     var moveFound = Math.floor(Math.random() * bestMoves.length);
     var bestMoveFound = bestMoves[moveFound];

     console.log("moveFound: " + moveFound);
   console.log("bestMoveFound: " + bestMoveFound);
     return bestMoves[Math.floor(bestMoves.length * Math.random())];
     //return bestMoveFound;
    // return bestMoveFound;
     //Math Formula -? wins/visits + constant * sqrt(log Parent visits/ visits)
   } */
     




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
Selection(liveBoard,null);
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
    if (!el ||el === ' ' ) {
      return i;
    }
  }).filter(function(e) {
    return (typeof e !== "undefined");
  });
}

renderBoard(liveBoard);
chooseMarker();

/*
function renderProperties(){
 renderBoard(liveBoard);
chooseMarker(); 
}*/
