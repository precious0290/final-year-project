from tictactoe1 import Tictactoe
from mctscontroller import MctsController
#from mcts_controller import 
# 'not' keyword argument
def main():
   playGame = Tictactoe()
   playGame.printBoard()
   player2 = MctsController()
   positionListPlayer1 = []
   positionListPlayer2 = []

  # rowList = []
   while( not playGame.check()):
      if (playGame.check()): break

      else:
         #playGame.assign(int(input("Enter a Row number (0-2): ")),int(input("Enter a Column number (0-2): ")),'x')
         playGame.assign(int(input("Enter a Row number (0-2): ")),int(input("Enter a Column number (0-2): ")),'x')
         positionListPlayer1 = positionListPlayer1 + [[playGame.getRow(),playGame.getCol()]] #saves the positions the first player makes
         #rowList = rowList.extend([playGame.getRow()])
         print(f"player 1's moves so far {positionListPlayer1}")
         playGame.printBoard()
         if (playGame.check()): break
         playGame.assign(player2.selectMove(),player2.selectMove(),'o')
         positionListPlayer2 = positionListPlayer2 + [[playGame.getRow(),playGame.getCol()]]
        
         player2.simulateRuns(playGame.getGameBoard(), positionListPlayer1, positionListPlayer2,10000) #-> in my simulation i should pass in the board state, and positions played
         if(playGame.legalGameMoves()):
            print ("Invalid move placement")
            #player2.simulations(playGame.assign(player2.selectMove(),player2.selectMove(),'o'))
            positionListPlayer2 = positionListPlayer2 + [[playGame.getRow(),playGame.getCol()]] # stores the positon the second player played
            #playGame.markedPositions()
         playGame.printBoard()   
         print(f"player 2's moves so far {positionListPlayer2}") 

         if (playGame.check()): break
         #playGame.printBoard()
      

      
      
       
  

if __name__ == "__main__":
    main()