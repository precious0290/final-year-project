## MCTS Notes

#Define a controller using using MCTS, such that the controller can be plugged into any game and win

#MCTS == best next move to take in order to win/draw a game

#MCTS Algiorithm Steps from Ytb Vid

1.Tree Traversal -> UCB1 (Si) = mean of (t/n) + c sqrt(ln N/ni), c = 2 ?

2.Node Expansion

3.Rollout (random simulation)

4.Backpropagation

In a 2 player game. Player 2 usually has n-1 moves since Player one has n moves. Meaning in the case of tic tac toe. Player 1 starts off with 9 moves while Player 2 starts off with 8 moves. The game ends when either a winner is found or there are no more moves that can be played. In other words n reaches 0. Or so I naively assumed. As the project progressed and I researched more I realised it wasn't about n-1 moves or how many moves can be played but what moves can be played. The trick was looking at the current state of the game and exploring the possible options to find a potential move for the AI.

My goal is to make a playable Tic-Tac-Toe game using the Monte Carlo Tree Search Algorithm.

## Tutorial Code
https://github.com/WebDevSimplified/JavaScript-Tic-Tac-Toe

https://youtu.be/dK6gJw4-NCo?si=Cozy80Vfz3R5LVzw

https://stackoverflow.com/questions/1155617/count-the-number-of-occurrences-of-a-character-in-a-string

https://www.wolframalpha.com/input?i=9%21+-+8%21

http://www.se16.info/hgb/tictactoe.htm

https://math.stackexchange.com/questions/269066/game-combinations-of-tic-tac-toe

https://stackoverflow.com/questions/51369718/python-how-can-i-find-if-an-item-exists-in-multidimensional-array

https://en.wikipedia.org/wiki/Tic-tac-toe_variants#:~:text=Many%20board%20games%20share%20the,toe%20date%20back%20several%20millennia.

https://www.geeksforgeeks.org/ml-monte-carlo-tree-search-mcts/

https://martin-ueding.de/posts/tic-tac-toe-with-monte-carlo-tree-search/

https://www.geeksforgeeks.org/classes-and-objects-in-javascript/

https://jeffbradberry.com/posts/2015/09/intro-to-monte-carlo-tree-search/

https://www.codepel.com/html5-games/tic-tac-toe-game-player-vs-computer-in-javascript/

