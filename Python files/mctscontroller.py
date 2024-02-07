#Define a controller using using MCTS, such that the controller can be plugged into any game and win

#MCTS == best next move to take in order to win/draw a game

#MCTS Algiorithm Steps from Ytb Vid
# Tree Traversal -> UCB1 (Si) = mean of (t/n) + c sqrt(ln N/ni), c = 2 ?
# Node Expansion
# Rollout (random simulation)
# Backpropagation
# alt + click new lines = change multi lines at the same time

#Q(s,a) = outcome of action taken when at the state
#reward [0,1]
# Tree is the list of possibly explored moves that the controller has found through the simulations
#backup stores states that have been explored with their outcome (win/loss/draw)
# if controller wins we return z=1 , if controller loses we return z=0.
#black = O, white = X

import random
import math
from copy import deepcopy
from tictactoe1 import Tictactoe

class Tree():
    def __init__(self, rootNode, parentNode):
        self.mctscontroller = MCTSController()

        if(not self.mctscontroller.gameState()):
            self.is_terminal = False
        else:
            self.is_terminal = True
        self.rootNode = rootNode
        self.parentNode = parentNode
        self.children = {}
        self.visits = 0
        self.score = 0
        self.node = self.node

class MctsController:

   
   #print ("here")

   def _init_ (self):
      self.simGame = Tictactoe()
      self.actions = [[1,1]] # actions list
      self.backup = [] # backup
      self.gameBackup = [] # game backup
      self.outcomeValue = 0 # outcome value

      self.player1 = random.randint(0,2) # player1
      self.player2 = random.randint(0,2) # player2
      self.player1Actions = []



    #this will or should become the function for selecting the best move
    #Selection
   def SearchMoves(self):
       #global move
       
       self.root = Tree(initial_state, None)
       choiceNode = self.selectBestPossibleMove(self.root)
       score = self.outcomeValue
       self.backpropagation(choiceNode, score)
       #move = random.randint(0,2)
       #return move
       return  self.get_best_move(self.root, 0)
   
   def gameState(self, endGameState):
      if not endGameState:
         return False
      else: return True

   
   def selectBestPossibleMove(self, choiceNode):

      while not choiceNode.is_termial:
         if choiceNode.is_fully_expanded:
            choiceNode = self.get_best_move(choiceNode,2)
         
         else:
            return self.expand(choiceNode)

   #Expansion
   def expandNodes(self, choiceNode):
      states = self.simGame.getGameBoard()

      for state in states:
         if str(state.assignToBoard) not in choiceNode.children:
            new_node = Tree(state, choiceNode)
            choiceNode.children[str(state.assignToBoard)] = new_node

            if len(states) == len(choiceNode.children):
               choiceNode.is_fully_expanded = True
         return new_node

   
   #def playerTest(self):
    #  global testmove
   #   testmove = random.randint(0,2)
   #   return testmove
   
  # def playerTest2(self):
    #  global simMoves
    #  simMoves = random.randint(0,2)
     # return simMoves	
   

   #Simulation -> simulate a game between two players playing tictactoe making random moves
   def simulateRuns(self,board):
      global runs, row, col
      runs  = 10000
      listOfPlayer2Moves = []
      self.simGame.gameboard = board
      while (runs > 0):
         
         while(not self.simGame.check()):
            #player 1 makes a move
            self.simGame.assign(self.player1, self.player1, 'x')
            while (not self.simGame.legalGameMoves()):
               self.simGame.assign(self.player1, self.player1, 'x')
            self.simGame.assignToBoard()

            #player 2 makes a move
            self.simGame.assign(self.player2, self.player2, 'o')
            while (not self.simGame.legalGameMoves()):
               self.simGame.assign(self.player2, self.player2, 'o')
            self.simGame.assignToBoard()

            runs -=1

         for itr in range(len(board)):
             for itr1 in range((board[itr])):
               if (board[itr][itr1] == 'o'):
                  row = itr
                  col = itr1
                  self.actions.append((row, col))



         board = self.simGame.boardReset()
         self.outcomeValue = self.simGame.outcome()
      



      #print(board)

   #def simulationTree(self, board, player2State, indx):
      #global treelistSave, treelistAdd, treelistCopy
      #treelistAdd = ['']
      #if(treelistAdd == ''):
      #   treelistAdd = filter('',treelistAdd)

      #treelistAdd = treelistAdd.append(player2State)
     # treelistSave = treelistAdd
      #treelistSave = filter('',treelistSave)
      
      #self.tree = deepcopy(treelistSave)
      #print (self.tree)
      #print(self.tree)
      #self.backup = deepcopy(self.tree)
      #print(self.backup)

      #Backpropagation
   def backpropagation(self, choiceNode, score):
        for i in range(len(self.actions.reverse())):
            for j in range(len(self.actions[i])):
               while choiceNode is not None:
                  choiceNode.visits += 1

                  choiceNode.score += score

                  choiceNode = choiceNode.parentNode 
        # global treelistSave, treelistAdd
        # global tempTreeList, visits
         #treelistAdd = board + [outcome]
         #treelistSave = treelistAdd
         #self.node = outcome
       #  tempTreeList = self.tree + [outcome]
       #  self.node = tempTreeList[0]
       #  tempTreeList = tempTreeList.reverse() #reverses the list
       #  for i in range(len(tempTreeList)):
        #    visits  = tempTreeList.count(self.node)
          #  self.node = tempTreeList[i]
        # for i in tempTreeList:   
        #    tempTreeList[i] =  tempTreeList[i] + [outcome] + [visits]
         #   outcome += outcome #adding up the values in the tree for the outcome metric
         #tempTreeList = tempTreeList.reverse() # reverses the list back to its original order
        # self.tree = deepcopy(tempTreeList)
         #print(self.tree)
         #self.gameBackup = board + [outcome]

   def get_best_moves(self, choiceNode, constant):
      best_score = float('inf')
      best_moves = []


      for child_node in choiceNode.childNodes.values():
         if self.outcomeValue == 1:
            current_player = 1
         else:
            current_player = -1

         move_score = current_player * child_node.score /child_node.visits + constant * math.sqrt(math.log(choiceNode.visits)/child_node.visits)

         if move_score > best_score:
            best_score = move_score
            best_moves = [child_node]

         elif move_score == best_score:
            best_moves.append(child_node)

      return random.choice(best_moves)



   
   #def printOutcomeSum(self):
   #   global sum
    #  print(sum)


  # def actionsTaken(self, player2):
  #    global takenActions
    #  takenActions = takenActions + [player2]
    #  self.actions = deepcopy(takenActions)
    #  print(self.actions)

   def upperConfidenceTreeCalc(self):
      print()



   
      


