from tictactoe1 import Tictactoe
from mctscontroller import MctsController
#from mcts_controller import 
# 'not' keyword argument
def main():
   print("Welcome to TicTacToe!")
   print()

   playGame = Tictactoe()
   playGame.printBoard()
   player2 = MctsController()
   positionListPlayer1 = []
   positionListPlayer2 = []
   outcome = 0
   sumOutcome =0
   
   

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
         positionListPlayer1 = positionListPlayer1 + [[playGame.getRow(),playGame.getCol()]] #saves the positions the first player makes
         savingPlayer1moveRow = playGame.getRow()
         savingPlayer1moveCol = playGame.getCol()
         print(savingPlayer1moveRow,savingPlayer1moveCol)
         #rowList = rowList.extend([playGame.getRow()])
         print(f"player 1's moves so far {positionListPlayer1}")
         playGame.printBoard()
         if (playGame.check()): break
         playGame.assign(player2.selectMove(), player2.selectMove(), 'o')
         if(not playGame.legalGameMoves()):
            print("Invalid moves")
            while(not playGame.legalGameMoves()):
               playGame.assign(player2.selectMove(), player2.selectMove(), 'o')
         playGame.assignToBoard()
            #player2.simulations(playGame.assign(player2.selectMove(),player2.selectMove(),'o'))
         positionListPlayer2 = positionListPlayer2 + [[playGame.getRow(),playGame.getCol()]] # stores the positon the second player played
         print(f"player 2's moves so far {positionListPlayer2}")
         
         savingPlayer2moveRow = playGame.getRow()
         savingPlayer2moveCol = playGame.getCol()
         print(savingPlayer2moveRow,savingPlayer2moveCol)
         playGame.printBoard()
         runs = 10000
         
         
         
         while(runs > 0):




            player2.simulateRuns(playGame.getGameBoard(), positionListPlayer1, positionListPlayer2) #-> in my simulation i should pass in the board state, and positions played
            playGame.assign(player2.playerTest(),player2.playerTest(), 'x')
            if(not playGame.legalGameMoves()):
               #print("Invalid moves")
               while(not playGame.legalGameMoves()):
                  playGame.assign(player2.playerTest(),player2.playerTest(), 'x')
            playGame.assignToBoard()
         
            playGame.printBoard()
            if (playGame.check()):
               outcome = playGame.outcome()
               sumOutcome += outcome  
               player2.backpropagation(playGame.outcome(),playGame.getGameBoard())
               player2.simulationTree()
               playGame.boardReset()
               playGame.assign(savingPlayer1moveRow,savingPlayer1moveCol, 'x')
               playGame.assign(savingPlayer2moveRow,savingPlayer2moveCol, 'o')
               playGame.assignToBoard()
               print(f"\nSum of outcomes: {sumOutcome}")
               pass

            playGame.printBoard()
            playGame.assign(player2.playerTest2(),player2.playerTest2(), 'o')   
            if(not playGame.legalGameMoves()):
               #print("Invalid moves")
               while(not playGame.legalGameMoves()):
                  playGame.assign(player2.playerTest2(),player2.playerTest2(), 'o')
            
            playGame.assignToBoard()
            playGame.printBoard()
            if (playGame.check()):
               outcome = playGame.outcome()
               sumOutcome += outcome  
               player2.backpropagation(playGame.outcome(),playGame.getGameBoard())
               player2.simulationTree()
               playGame.boardReset()
               playGame.assign(savingPlayer1moveRow,savingPlayer1moveCol, 'x')
               playGame.assignToBoard()
               playGame.assign(savingPlayer2moveRow,savingPlayer2moveCol, 'o')
               playGame.assignToBoard()
               print(f"\nSum of outcomes: {sumOutcome}")
               pass
            playGame.printBoard()
            runs -= 1

         

            #playGame.markedPositions()
         playGame.printBoard()   
         print(f"player 2's moves so far {positionListPlayer2}") 

         if (playGame.check()): break
         #playGame.printBoard()
      

      
      
       
  

if __name__ == "__main__":
    main()