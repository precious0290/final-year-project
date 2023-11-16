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
class MctsController:

   
   #print ("here")

   def _init_ (self):
      self.tree = [] # tree element
      self.actions = [] # actions list
      self.backup = [] # backup
      self.rootNode = random.randint(0,2) # s0 starting node
      self.node = 0
      self.outcomeValue = 0 # outcome value
      self.player1 = 0
      self.player2 = 0
      self.player1Actions = []
    #this will or should become the function for selecting the best move
   def selectMove(self):
       global move
       move = random.randint(0,2)
       return move
   
   def playerTest(self):
      global testmove
      testmove = random.randint(0,2)
      return testmove
   
   def playerTest2(self):
      global simMoves
      simMoves = random.randint(0,2)
      return simMoves	
   
   def simulateRuns(self,board, movesPlayer1, movesPlayer2):
      self.player1Actions = movesPlayer1
      self.actions = movesPlayer2
      board = board
      #print(board)
     




   def backpropagation(self, outcome, board):
      global sum
      self.tree = board + [outcome]
      self.tree = self.tree.append(self.tree)
      self.backup = deepcopy(self.tree)

      
      

   def simulationTree(self):
      return self.backup
   
   def printOutcomeSum(self):
      global sum
      print(sum)


   def actionsTaken(self):
      print()

   def upperConfidenceTree(self):
      print()



   
      


