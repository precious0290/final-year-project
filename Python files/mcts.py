import math
import random

class TreeNode():
    #class constructor --> (create a tree node class instance)
    def __init__(self, game_state, parent=None):
        #initialise the board state
        self.state= game_state
        #is node terminal flag
        self.terminal = game_state.is_win() or game_state.is_draw()

        self.untried_actions = game_state.get_legal_moves()

        #set is fully expanded flag
        self.is_fully_expanded = self.is_terminal

        #init parent node (if available)
        self.parent = parent
        self.wins = 0

        # init number of nodes visited
        self.visits = 0

        #init total score of node
        self.score = 0

        #init current node's children
        self.children = []

class MCTS():
    #search for best move in current position
    def search(self, initial_state):
        #init root node
        self.root = TreeNode(initial_state)

        #number of iterations
        n = 1000
        #look at n (1000) iterations
        for iteration in range(n):
            #select node (selection phase)
            node = self.select(self.root)

            #score current node (simulation phase)
            score = self.rollout(node.state)

            #backpropagate the number of visits and score up to the root node
            self.backpropagate(node, score)

        #pick up the best move in the current position
        try:
            return self.get_best_move(self.root, 0)

        except:
            pass

    # select most promising node
    def select(self, node):
        #make sure that we're dealing with non-terminal nodes
        while not node.is_terminal:
            #case where the node is fully expanded 
            if node.is_fully_expanded:
                node = self.get_best_move(node, 2)

            #case where the node is not fully expanded
            else:
                #otherwise exapnd the node
                return self.expand(node)
        #return node
        return node
    
    #expand node
    def expand(self, node):
        #generate legal states (moves) for the given node
        states = node.board.generate_states()

        #loop over generated states (moves)
        for state in states:
            #make sure that current state (move) is not present in child nodes
            if str(state.position) not in node.children:
                #create a new node 
                new_node = TreeNode(state, node)

                #add child node to parents node children list (dict)
                node.children[str(state.position)] = new_node

                #case when node is fully expanded or not
                if len(states) == len(node.children):
                    node.is_fully_expanded = True
                
                #return newly created node
                return new_node
            
        #debugging
        print('should not get here!')



    # rollout: simulate the game by making random moves until reach end of game
    def rollout(self, board):
        #mkae random moves for both sides until terminal state of game is reached
        while not board.is_win():
            #try make a move
            try:
                #make move on board
                board = random.choice(board.generate_states())
                #print(board)
                
            #no moves available
            except:
                #print(board)
                #print('Draw state: ', board.is_draw())
                #return a draw score
                return 0
            
        #print(board)
            
        #return score from the player "x" perspective
        if board.player_2 == 'x': return 1
        elif board.player_2 == 'o': return -1

    # backpropagate no of visits and score back to the root node
    def backpropagate(self, node, score):
        #update nodes visit count and score up to root node
        while node is not None:
            #update node visits
            node.visits += 1

            #update node score
            node.score += score

            #set node to parent
            node = node.parent


    #select best node based on USB1 formula
    def get_best_move(self, node, exploration_constant):
        #define best score & best moves
        best_score = float('-inf') 
        best_moves = []

        #loop over child nodes
        for child_node in node.children.values():
            # define current player
            if child_node.board.player_2 == 'x': current_player = 1
            elif child_node.board.player_2 == 'o': current_player = -1

            #get move score using UCT formula
            move_score = current_player * child_node.score / child_node.visits + exploration_constant * math.sqrt(math.log(node.visits)/ child_node.visits)

            #better move has been found
            if move_score > best_score:
                best_score = move_score
                best_moves = [child_node]

            #found as good move as already available
            elif move_score == best_score:
                best_moves.append(child_node)
            
        #return one of the best moves randomly
        return random.choice(best_moves)