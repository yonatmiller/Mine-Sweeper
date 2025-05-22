'use strict'

var SIZE = 4
const FLAG = '🚩'
const EMPTY = ''
var gFirstClick = true
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2,
}
var gGame = {
    isOn:false,
    revealedCount:0,
    markedCount:0,
    secsPassed:0
}


function init(){
    gGame.isOn = true
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
}

//Choosing the game level
function onLevel(size, numOfMines){
    gFirstClick = true
    gGame.isOn = true

    gLevel.MINES = numOfMines
    flagUpdate('numOfMines')
   
    gLevel.SIZE = size
    gGame.markedCount = 0
    clearInterval(gtime)
    gGame.secsPassed = 0

    gLives = 3
    livesUpdate()

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
 
     var elBtn = document.querySelector('.victory')
    elBtn.innerText = EMPTY

    var elsmily = document.querySelector('.smily')
    elsmily.innerText = '😃'

    var elBtn = document.querySelector('.victory')   
    elBtn.style.visibility = 'hidden';
}

//building board - MODEL
function buildBoard() {
    const size  = gLevel.SIZE
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = {           
                minesAroundCount:0,
                isRevealed:false,
                isMine:false,
                isMarked:false
            }
        }
    }

    return board
}

//left-clicking a cell
function onCellClicked(elCell, i, j){

   if(gFirstClick){
        
        randomMine(i, j)
        startTimer()

        console.log(gBoard);
   }
    livesUpdate()
    
    if(gGame.isOn)
    {
        

        if(gBoard[i][j].isMine){
            renderCell({i:i, j:j},MINE)
            gGame.revealedCount += 1
            
            flagUpdate('mine')
            console.log( gGame.revealedCount);
            gBoard[i][j].isRevealed = true
            return checkGameOver()
        } 
        if (gBoard[i][j].minesAroundCount != 0) {
            //DOM:
            renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 
            
            
            gBoard[i][j].isRevealed = true
            gGame.revealedCount += 1
            console.log( gGame.revealedCount);


            
        }else{
           
            expandReveal({i:i, j:j})
        } 
        console.log(gFirstClick);
        if(!gFirstClick) isVictory()
        
        
}
}

//Right-clicking a cell
function onCellMarked(elCell, i, j){
   
    if(gGame.isOn){
       
       

        if(gBoard[i][j].isMarked){

        //MODEL:
        gBoard[i][j].isMarked = false

        //DOM:
        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)

        }

        if(!gBoard[i][j].isMarked){

        //MODEL:
            gBoard[i][j].isMarked = true
            gBoard[i][j].isRevealed = true
            gGame.markedCount += 1
            flagUpdate('flag')

        //DOM:
            elCell.innerText = FLAG
            
        }
    }
    isVictory()
}

//Count Neighbors of Mines
function setMinesNegsCount(cell){

    if(cell.i >= 0 && cell.i < gLevel.SIZE && cell.j < gLevel.SIZE && cell.j >= 0 ){
				
				for(var i = cell.i - 1; i < cell.i+2; i++){
					if(i < 0 || i >= gLevel.SIZE) continue
					
                    for (var j = cell.j-1 ; j< cell.j+2; j++) {
						if(j < 0 || j >= gLevel.SIZE)continue
                        
                        if(gBoard[i][j].isMine) continue
						//console.log(gBoard[i][j].minesAroundCount, i,j);

                        //  MODEL:  
                        gBoard[i][j].minesAroundCount +=  1
						
					}
				}
			}
}

//Reveals cells of neighbors
function expandReveal(location){
    for(var i = location.i - 1; i < location.i+2; i++){
        
        if(i < 0 || i >= gLevel.SIZE) continue
                        
        for (var j = location.j-1 ; j< location.j+2; j++) {
            if(j < 0 || j >= gLevel.SIZE)continue
                
                

                //if (gBoard[i][j].minesAroundCount === 0) {
                    if(gBoard[i][j].isMine) continue
                    if(!gBoard[i][j].isRevealed) {
                         renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)
                        gBoard[i][j].isRevealed = true
                        gGame.revealedCount += 1  
                       
                    }

        }
    }
}    

//Checking for a game over / clicking on a mine
function checkGameOver(){ 
    gLives -= 1
    if(gLives === 0) gGame.isOn = false
    

    console.log('gameover');
    livesUpdate()

}

//Victory check
function isVictory(){
    if(!gFirstClick){
        
        for(var i = 0; i < gLevel.SIZE ; i++){
        if(i < 0 || i >= gLevel.SIZE) continue
                        
        for (var j = 0 ; j < gLevel.SIZE; j++) {
            if(i < 0 || i >= gLevel.SIZE) continue
            //console.log('i:', i, 'j:', j);
            
            if(gBoard[i][j].isMarked && !gBoard[i][j].isMine) return 
            if(!gBoard[i][j].isMine && !gBoard[i][j].isRevealed) return 
           
        }
        }
        if(gGame.revealedCount >= gLevel.SIZE** - gLevel.MINES) {
                    clearInterval(gtime)
                    gGame.secsPassed = 0
                    gGame.markedCount = 0
                    console.log('victory');
                }
        }
        var elsmily = document.querySelector('.smily')
        elsmily.innerText = '😎'

        var elBtn = document.querySelector('.victory')   
        elBtn.style.visibility = 'visible';
    }

function onClickSmily(){
    gGame.secsPassed = 0
    onLevel(gLevel.SIZE, gLevel.MINES)  
}

function safeClick(){
    var emptyCell = []

    for (var i = 0; i < gLevel.SIZE; i++){
        for (var j = 0; j < gLevel.SIZE; j++){

            if(gBoard[i][j].isMine && !gBoard[i][j].isRevealed){
                var cell = {
                    i : i,
                    j : j
                }
                emptyCell.push(cell)
            }
        }
        var num = getRandomIntInclusive(0, emptyCell.length)
        
        
    }
    renderCell(emptyCell[num],MINE)

    setInterval(()=>{renderCell(emptyCell[num],EMPTY)
                    const elCell = document.querySelector(`.cell-${emptyCell[num].i}-${emptyCell[num].j}`)
                    elCell.classList.remove('stylemine')
                    elCell.classList.remove('stylecell')
    }, 1500)
}

