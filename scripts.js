const Board = (()=>{
    const rowSize = 3;
    const colSize = 3;
    let moves = 0;
    let row = -1, col = -1;

    let board = [];
    function makeBoard() {
        board = [];
        moves = 0;
        for (let i=0; i<rowSize; i++) {
            board[i] = [];
            for (let j=0; j<colSize; j++) {
                board[i].push(0);
            }
        }
    }

    function askLocation () {
        row = Number(prompt("Enter the Row"));
        col = Number(prompt("Enter the Column"));
    }
    function playerMove(token) {
        askLocation();
        if (board[row][col] !==0) {
            playerMove(token);
            return;
        }
        board[row][col] = token;
        moves ++;
    }
    function movesCheck() {
        if (moves == 9) {
            console.log("Draw");
            makeBoard();
        }
    }
    function hasPlayerWon() {
        let val = row + col;
        if (val % 2 == 0) {//check diagnols
            //left diagnol
            let i=0, j=0;
            let ele = 0;
            while (i<3 && j<3) {
                if (board[i][j] === board[row][col]) {
                    ele++;
                    i++; j++;
                } else {
                    break;
                }
            }
            if (ele == 3)
                return true;

            //right diagnol
            i=0; j=2;
            ele = 0;
            while (i<3 && j>=0) {
                if (board[i][j] === board[row][col]) {
                    ele++;
                    i++; j--;
                } else {
                    break;
                }
            }
            if (ele == 3)
                return true;
        }
        //now just have to check vertical rows and cols;
        let ele = 0;
        for (let i=0; i<rowSize; i++) {
            if (board[i][col] === board[row][col])
                ele++;
            else break;
        }
        if (ele == 3)
            return true;

        ele = 0;
        for (let j=0; j<colSize; j++) {
            if (board[row][j] === board[row][col])
                ele++;
            else break;
        }
        if (ele == 3)
            return true;

        return false;
    }
    return {makeBoard, playerMove, hasPlayerWon, movesCheck};
})();

function Player(name = "", token) {
    const PlayerName = name;
    const PlayerToken = token;

    function sayPlayerName () {
        return PlayerName;
    }
    function sayPlayerToken() {
        return PlayerToken;
    }
    return {sayPlayerName, sayPlayerToken}
}

Board.makeBoard();
const player1 = Player("Player1", 'O');
const player2 = Player("Player2", "X");
const Game = ( () => {
    function Begin() {
        while (1) {
            Board.playerMove(player1.sayPlayerToken());
            if (Board.hasPlayerWon()) {
                console.log(`${player1.sayPlayerName()} has won the game.`);
                break;
            } else {
                Board.movesCheck();
            }

            Board.playerMove(player2.sayPlayerToken());
            if (Board.hasPlayerWon()) {
                console.log(`${player2.sayPlayerName()} has won the game.`);
                break;
            } else{
                Board.movesCheck();
            }
        }
    }
    return {Begin};
})();

Game.Begin();