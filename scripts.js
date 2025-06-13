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

    function setLocation (r,c) {
        row = r;
        col = c;
    }
    function canPlayerMove() {
        return (board[row][col] === 0);
    }
    function playerMove(token) {
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
        if (val % 2 == 0) {//check diagonals
            //left diagonal
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

            //right diagonal
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
    return {makeBoard, playerMove, hasPlayerWon, movesCheck, setLocation, canPlayerMove};
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


const Game = ( () => {
    let player1, player2;
    let gameActive = false;
    let player1Turn = true;

    function setGameActive() {
        gameActive = true;
    }
    function Start(player1Name, player2Name) {
        Board.makeBoard();
        player1 = Player(player1Name, 'O');
        player2 = Player(player2Name, "X");
    }
    function Play() {
        let token = 'O';
        if (!player1Turn) {
            token = 'X'
        }
        player1Turn = !player1Turn;
        Board.playerMove(token);
    }
    return {Start, setGameActive, Play, player1Turn};
})();


const boxes = document.querySelectorAll(".box-parent > div")
boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        if (!Game.gameActive)
            return;
        if (Game.gameActive === true) {
            let val = box.dataset.value;
            const row = Math.floor( (val-1) / 3 );
            const col = (val-1) % 3;
            Board.setLocation(row,col);
            if (!Board.canPlayerMove())
                return;
            Game.Play();
            let token = 'O';
            if (!Game.player1Turn)
                token = 'X';
            box.textContent = `${token}`;
            
        }
    });
});

const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", () => {
    const player1Name = document.querySelector("#player1-name").value;
    const player2Name = document.querySelector("#player2-name").value;
    Game.Start(player1Name, player2Name);
    Game.setGameActive();
});


