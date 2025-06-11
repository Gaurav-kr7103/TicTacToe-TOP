const Board = (() => {
    const rowSize = 3;
    const colSize = 3;
    let board = [];//const can be used (because determines the object storage type)
    let moves = 0;
    function resetBoard() {
        for (let i=0; i<rowSize; i++) {
            board[i] = [];
            for (let j=0; j<colSize; j++) {
                board[i].push(0);//0 means empty cell
            }
        }
        return board;
    };
    function askToMove () {
        const row = Number(prompt("Enter the Row :"));
        const col = Number(prompt("Enter the Col :"));
        return [row,col];
    };
    function isSpaceAvailable(row,col) {
        return (board[row][col] === 0);
    }; 
    function makeMove(token) {
        let [i,j] = askToMove();
        while (!isSpaceAvailable(i,j)) {
            ([i,j] = askToMove());
        }
        board[i][j] = token;
        movesMade();
        return hasPlayerWon(i,j);
    };
    function hasPlayerWon (row, col) {
        const val = board[row][col];
        for (let i=0; i<rowSize; i++) 
            if (board[i][col] !== val)
                return false;
        for (let j=0; j<colSize; j++)
            if (board[row][j] !== val) 
                return false;
        return true;
    };
    function movesMade () {
        moves++;
        if (moves == 9) {
            console.log("Draw");
            resetBoard();
        }
    }
    return {resetBoard, makeMove};
})();

Board.resetBoard();

function Player (name="", token) {
    const playerName = name;
    const playerToken = token;
    function viewPlayerName() {
        return playerName;
    }
    function viewPlayerToken() {
        return playerToken;
    }
    function playerMove() {
        Board.makeMove(playerToken);
    }

    return {viewPlayerName, viewPlayerToken, playerMove};
};

const player1 = Player("player1", 'O');
const player2 = Player("player2", 'X');

const Game = ( () => {
    function playGame() {
        while (1) {
            let won = player1.playerMove();
            if (won) {
                console.log(`${player1.viewPlayerName} has won`);
            }
            won = player2.playerMove();
            if (won) {
                console.log(`${player1.viewPlayerName} has won`);
            }
            won  
        }
    }
    return {playGame};
}
)();

Game.playGame();