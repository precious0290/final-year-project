#
# AI that learns to play Tic Tac Toe using
#        reinforcement learning
#                (MCTS)
#

# packages

from Board import *
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route("/")
def givePage():
    return render_template("tictactoe.html")
    
@app.route('/get_ai_move', methods=['GET'])
def get_ai_move():
    ai_move = board.generate_ai_move()
    return jsonify(ai_move)        

@app.route('/make_user_move', methods=['POST'])
def make_user_move():
    data = request.get_json()
    row = data.get('row')
    col = data.get('col')

    if row is not None and col is not None:
        result = board.make_move(row, col)
        return jsonify(result)
    else:
        return jsonify({'error': 'Invalid move parameters'}), 400   
# Tic Tac Toe board class

# main driver
if __name__ == '__main__':
    # create board instance
    board = Board()
        
        
        
    
    
    
    
    
    
    
    
