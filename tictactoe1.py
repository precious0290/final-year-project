

countSameChar = 0
list_of_positions = [[0,0]]
win = ''
#rowList = []
#colList = []
class Tictactoe:
    def __init__(self):
        self.gameboard = [['#', '#', '#'],
                          ['#', '#', '#'],
                          ['#', '#', '#']]
        self.rows = 0
        self.cols = 0
        self.char = ''
        self.rowList = []
        self.colList = []
    
          # assigning a position to the input char
    def assign(self, x, y, char ):
       #global rowList, colList
       
       self.rows = x
       self.cols = y
       self.char = char

#ok so if the move is valid then it can be placed in the board
    def assignToBoard(self):
        self.gameboard[self.rows][self.cols]= self.char


    def getRow(self):
        return self.rows
    def getCol(self):
        return self.cols

    def markedPositions():
        print ()

#this function checks whether the position that the player chose is free and also within scope 
    def legalGameMoves(self):
       # global choosingRow, choosingCol, matrix
        if ((self.gameboard[self.rows][self.cols] == '#') and (0 <= self.rows) and (self.rows < len(self.gameboard)) and (0 <= self.rows) and (self.rows < len(self.gameboard)) ): # if the position is occupied by an x or and o then the player must choose a different position
            return True
        else: return False



    def check(self):
        global win, winners
        # Horizontal wins X
        if((not any('#' in list for list in self.gameboard))):
            print("\nGame ends in a draw!")
            pass
        
        if((self.gameboard[0][0] == 'x' and self.gameboard[0][1] == 'x' and self.gameboard[0][2]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
        if((self.gameboard[1][0] == 'x' and self.gameboard[1][1] == 'x' and self.gameboard[1][2]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
        if((self.gameboard[2][0] == 'x' and self.gameboard[2][1] == 'x' and self.gameboard[2][2]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
            
        # Vertical Wins X
        if((self.gameboard[0][0] == 'x' and self.gameboard[1][0] == 'x' and self.gameboard[2][0]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
        if((self.gameboard[0][1] == 'x' and self.gameboard[1][1] == 'x' and self.gameboard[2][1]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
        if((self.gameboard[0][2] == 'x' and self.gameboard[1][2] == 'x' and self.gameboard[2][2]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True
            return True
        
        # Diagonal wins X
        if((self.gameboard[0][0] == 'x' and self.gameboard[1][1] == 'x' and self.gameboard[2][2]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True 
            return True
        if((self.gameboard[0][2] == 'x' and self.gameboard[1][1] == 'x' and self.gameboard[2][0]== 'x')):
            print("\nx wins!")
            win = 'x'
            winners = True 
            return True
        
        # Horizontal wins O
        if((self.gameboard[0][0] == 'o' and self.gameboard[0][1] == 'o' and self.gameboard[0][2]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True 
            return True
        if((self.gameboard[1][0] == 'o' and self.gameboard[1][1] == 'o' and self.gameboard[1][2]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True 
            return True
        if((self.gameboard[2][0] == 'o' and self.gameboard[2][1] == 'o' and self.gameboard[2][2]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True
            return True
            
        # Vertical Wins O
        if((self.gameboard[0][0] == 'o' and self.gameboard[1][0] == 'o' and self.gameboard[2][0]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True 
            return True
        if((self.gameboard[0][1] == 'o' and self.gameboard[1][1] == 'o' and self.gameboard[2][1]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True 
            return True
        if((self.gameboard[0][2] == 'o' and self.gameboard[1][2] == 'o' and self.gameboard[2][2]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True
            return True
        
        # Diagonal wins O
        if((self.gameboard[0][0] == 'o' and self.gameboard[1][1] == 'o' and self.gameboard[2][2]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True
            return True
        
        if((self.gameboard[0][2] == 'o' and self.gameboard[1][1] == 'o' and self.gameboard[2][0]== 'o')):
            print("\no wins!")
            win = 'o'
            winners = True 
            return True        
       # if((self.gameboard[0][2] == 'o' and self.gameboard[1][1] == 'x' and self.gameboard[2][0]== 'o')):
        #    print("\no wins!")
        #    win = 'o' 
        #    return True 
        else: 
            return False

    def printBoard(self):
            print()
            print(self.gameboard[0][0] + "|" + self.gameboard[0][1] + "|" + self.gameboard[0][2])
            print("-----")
            print(self.gameboard[1][0] + "|" + self.gameboard[1][1] + "|" + self.gameboard[1][2])
            print("-----")
            print(self.gameboard[2][0] + "|" + self.gameboard[2][1] + "|" + self.gameboard[2][2])
   

    def getGameBoard(self):
       return self.gameboard
    
    def boardReset(self):
        self.gameboard = [['#', '#', '#'],
                          ['#', '#', '#'],
                          ['#', '#', '#']]

    

    def outcome(self):
       global win
       if (win == 'o'):
           return 1
       elif (win == 'x'):
           return -1
       else:
           return 0


        