from flask import Flask, jsonify, render_template, request
from tictactoe import Board

app = Flask(__name__)

# Create board instance
board = Board()

@app.route("/")
def givePage():
    return render_template("index.html")

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

# Main driver
if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
    
    
    
