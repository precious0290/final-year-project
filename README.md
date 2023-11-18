## MCTS Notes

#Define a controller using using MCTS, such that the controller can be plugged into any game and win

#MCTS == best next move to take in order to win/draw a game

#MCTS Algiorithm Steps from Ytb Vid

1.Tree Traversal -> UCB1 (Si) = mean of (t/n) + c sqrt(ln N/ni), c = 2 ?

2.Node Expansion

3.Rollout (random simulation)

4.Backpropagation

In a 2 player game. Player 2 usually has n-1 moves since Player one has n moves. Meaning in the case of tic tac toe. Player 1 starts off with 9 moves while Player 2 starts off with 8 moves. The game ends when either a winner is found or there are no more moves that can be played. In other words n reaches 0.

## Tutorial Code
https://github.com/WebDevSimplified/JavaScript-Tic-Tac-Toe

https://youtu.be/dK6gJw4-NCo?si=Cozy80Vfz3R5LVzw

https://stackoverflow.com/questions/1155617/count-the-number-of-occurrences-of-a-character-in-a-string

https://www.wolframalpha.com/input?i=9%21+-+8%21

http://www.se16.info/hgb/tictactoe.htm

https://math.stackexchange.com/questions/269066/game-combinations-of-tic-tac-toe

https://stackoverflow.com/questions/51369718/python-how-can-i-find-if-an-item-exists-in-multidimensional-array


