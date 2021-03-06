//create gameboard array object with functions
//to get/set data and reset the array
const gameBoard = (() => {
    let board = new Array(9);
    const getIndexData = (num) => board[num];
    const setIndexData = (num, value) => board[num] = value;
    const resetBoard = () => { 
        for(i = 0; i < board.length; i++) {
            board[i] = undefined;
        }
    }
    return {
        board,
        getIndexData,
        setIndexData,
        resetBoard,
        
    };
})();
//player object that returns the marker (X/O) the player is using
const Player = (marker) => {
    const getMarker = () => marker;
    return {getMarker}
}
//gamedisplay object to control the flow of the game
const gameDisplay = (() => {
    //populate player objects
    const playerX = Player("X");
    const playerO = Player("O");
    let count = 0;
    let gameOver = false;
    //get elements from HTML file and give them data-indices corresponding
    //to the array indices in gameBoard object
    const gridItems = document.querySelectorAll('.grid-item');
    for(i = 0; i < gridItems.length; i++) {
        gridItems[i].setAttribute("data-index", i);
    }
    const gameText = document.getElementById('game-text');

    const updateGameText = (text) => {
        gameText.textContent = text;
    }
    const updateGameGrid = (i, gameText) => {
        gridItems[i].textContent = gameText
    }
    //core gameplay function to set gameboard array and update the DOM
    const gamePlay = function(item){
        if(gameBoard.getIndexData(item.dataset.index) === undefined){
            if(count % 2 === 0) {
                gameBoard.setIndexData(item.dataset.index, playerX.getMarker());
                updateGameGrid(item.dataset.index, playerX.getMarker());
                updateGameText("Player O's turn");
            }
            else {
                gameBoard.setIndexData(item.dataset.index, playerO.getMarker());
                updateGameGrid(item.dataset.index, playerO.getMarker());
                updateGameText("Player X's turn");
            }
            count++;
        }
        winGame();
    }
    gridItems.forEach(item => item.addEventListener('click', (e) => {
        if(gameOver === true)return;
        gamePlay(e.target);
    }))
   //reset gameboard array and the DOM
    const resetGrid = () => {
        gridItems.forEach(item => item.textContent = "")
        gameBoard.resetBoard();
        count = 0;
        gameOver = false;
        updateGameText("Player X's turn");
    }
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => resetGrid());
    
   //following functions to check various win conditions/tie condition
    const checkRows = () => {
        let i = 0;
        while (i < 7){
            if (gameBoard.board[i] != undefined){
                if(gameBoard.board[i] === gameBoard.board[i+1] && gameBoard.board[i+1] === gameBoard.board[i+2]){
                    updateGameText(`Player ${gameBoard.board[i]} Wins!`);
                    gameOver = true;
                }
            }
            i += 3;
        }
    }
    const checkColumns = () => {
        let i = 0;
        while (i < 3) {
            if (gameBoard.board[i] != undefined){
                if(gameBoard.board[i] === gameBoard.board[i+3] && gameBoard.board[i+3] === gameBoard.board[i+6]){
                    updateGameText(`Player ${gameBoard.board[i]} Wins!`);
                    gameOver = true;
                }
            }
            i++;
        }
    }
    const checkDiagonals = () => {
        if(gameBoard.board[4] != undefined){
            if(gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8]){
                updateGameText(`Player ${gameBoard.board[4]} Wins!`)
                gameOver = true;
            }
            else if(gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6]){
                updateGameText(`Player ${gameBoard.board[4]} Wins!`)
                gameOver = true;
            }
        }
    }
    const checkTie = () => {
        if(count === 9){
            updateGameText("It's a Tie");
            gameOver = true;
        }
    }
    const winGame = () => {
        checkTie();
        checkRows();
        checkDiagonals();
        checkColumns();
        
    }
    
    return {
        gridItems,
        resetGrid,
        resetButton,
        playerX,
        playerO,
        winGame,
        gameOver,
        gamePlay,
        
    };

})();

