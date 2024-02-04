// script.js

document.addEventListener('DOMContentLoaded', function () {
    const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('message');

    // Function to update the game board on the webpage
    function updateBoard(board) {
        // Implement the logic to update the HTML board element based on the state of the game
        // You might use a loop to iterate through rows and columns and update each cell accordingly
        // Example: boardElement.rows[row].cells[col].innerHTML = board[row][col];
    }

    // Function to handle user clicks on the board
    function handleUserMove(row, col) {
        // Implement the logic to send a POST request to your Flask app with the user's move
        fetch('/make_user_move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                row: row,
                col: col,
            }),
        })
        .then(response => response.json())
        .then(result => {
            // Update the game board on the webpage
            updateBoard(result.board);

            // Check if the game is over and display a message if needed
            if (result.game_over) {
                if (result.winner) {
                    messageElement.textContent = 'Game Over! Winner: ' + result.winner;
                } else {
                    messageElement.textContent = 'Game Over! It\'s a tie!';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function getAIMove() {
        // Implement the logic to send a GET request to your Flask app to get the AI move
        fetch('/get_ai_move')
        .then(response => response.json())
        .then(result => {
            // Update the game board on the webpage
            updateBoard(result.board);

            // Check if the game is over and display a message if needed
            if (result.game_over) {
                if (result.winner) {
                    messageElement.textContent = 'Game Over! Winner: ' + result.winner;
                } else {
                    messageElement.textContent = 'Game Over! It\'s a tie!';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Add event listeners to each cell in the board for user clicks
    // You may need to adapt this based on your HTML structure
    // Example assumes each cell has a class 'cell' and data attributes 'data-row' and 'data-col'
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            const row = this.dataset.row;
            const col = this.dataset.col;

            // Check if the cell is empty before allowing the user to make a move
            if (!this.textContent.trim()) {
                handleUserMove(row, col);
                // After the user move, trigger the AI move
                getAIMove();
            }
        });
    });
});
