from tictactoe1 import Tictactoe
from mctscontroller import MctsController
from mcts import Tree,MCTS
import random
#from mcts_controller import 
# 'not' keyword argument
def main():
   print("Welcome to TicTacToe!")

   playGame = Tictactoe()
   playGame.printBoard()
   player2 = MCTS()
   positionListPlayer1 = []
   positionListPlayer2 = []
  # rowList = []

      
   while( not playGame.check()):
      
      if (playGame.check()): break

      else:
         #playGame.assign(int(input("Enter a Row number (0-2): ")),int(input("Enter a Column number (0-2): ")),'x')
         playGame.assign(int(input("Enter a Row number (0-2): ")),int(input("Enter a Column number (0-2): ")),'x')
         if(not playGame.legalGameMoves()):
            print("Invalid moves")
            while(not playGame.legalGameMoves()):
               playGame.assign(int(input("\nEnter a Row number (0-2): ")),int(input("\nEnter a Column number (0-2): ")),'x')
         playGame.assignToBoard()
        # positionListPlayer1 = positionListPlayer1 + [[playGame.getRow(),playGame.getCol()]] #saves the positions the first player makes
        # savingPlayer1moveRow = playGame.getRow()
        # savingPlayer1moveCol = playGame.getCol()
         #print(savingPlayer1moveRow,savingPlayer1moveCol)
         #rowList = rowList.extend([playGame.getRow()])
        # print(f"player 1's moves so far {positionListPlayer1}")
         playGame.printBoard()
         if (playGame.check()): break
         playGame.assign(player2.selectBestPossibleMove(), player2.selectBestPossibleMove(), 'o')
         if(not playGame.legalGameMoves()):
            print("Invalid moves")
            while(not playGame.legalGameMoves()):
               playGame.assign(player2.selectMove(), player2.selectMove(), 'o')
         playGame.assignToBoard()
            #player2.simulations(playGame.assign(player2.selectMove(),player2.selectMove(),'o'))
        # positionListPlayer2 = positionListPlayer2 + [[playGame.getRow(),playGame.getCol()]] # stores the positon the second player played
        # print(f"player 2's moves so far {positionListPlayer2}")
         
        # savingPlayer2moveRow = playGame.getRow()
        # savingPlayer2moveCol = playGame.getCol()
         #print(savingPlayer2moveRow,savingPlayer2moveCol)
         playGame.printBoard()
           
         #playGame.markedPositions()
        # playGame.printBoard()   
        # print(f"player 2's moves so far {positionListPlayer2}") 

         if (playGame.check()): break
         #playGame.printBoard()
      

      
      
       
  

if __name__ == "__main__":
    main()