'use strict'

var SIZE = 4
const FLAG = '🚩'
const EMPTY = ''


var gBoard
var gLevel = {
    SIZE: 0,
    MINES: 0,
}
var gGame = {
    isOn:false,
    revealedCount:0,
    markedCount:0,
    secsPassed:0
}

function init(){
    gGame.isOn = true
}
function onLevel(size, numOfMines){
    gGame.isOn = true
    gGame.secsPassed = 0
    
    gLevel.MINES = numOfMines
    gLevel.SIZE = size
    gGame.markedCount = 0
    clearInterval(gtime)
    gGame.secsPassed = 0
    gLives = 3

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    randomMine()
    startTimer()
    flagUpdate()

    console.log(gLevel.SIZE, gLevel.MINES);
    console.log(gBoard);
    
}
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

function onCellClicked(elCell, i, j){
    if(gGame.isOn)
    {
       
        flagUpdate()

    if(gBoard[i][j].isMine){
        renderCell({i:i, j:j},MINE)
        return gameOver()
    } 
     if (gBoard[i][j].minesAroundCount != 0) {
        //DOM:
        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 
        gGame.revealedCount += 1
        console.log(gGame.revealedCount);
        
        
     }else{
        revealedkNegs({i:i, j:j})
         
     } 
    isVictory()

}
}

function onCellMarked(elCell, i, j){
   
    if(gGame.isOn){
       
        flagUpdate()

        if(gBoard[i][j].isMarked){

        //MODEL:
        gBoard[i][j].isMarked = false

        //DOM:
        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)

        }

        if(!gBoard[i][j].isMarked){

        //MODEL:
            gBoard[i][j].isMarked = true
            gGame.markedCount += 1

        //DOM:
            elCell.innerText = FLAG
            
        }
    }
    isVictory()
}


function setMinesNegsCount(){
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            console.log(gBoard[i][j].isMine);
            
            if(gBoard[i][j].isMine){
                checkMinesNegsCount({i:i, j:j})
            }
           
        }
        
    }

}

function checkMinesNegsCount(cell){

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

function revealedkNegs(location){
    for(var i = location.i - 1; i < location.i+2; i++){
        
        if(i < 0 || i >= gLevel.SIZE) continue
                        
        for (var j = location.j-1 ; j< location.j+2; j++) {
            if(j < 0 || j >= gLevel.SIZE)continue
                
                

                if (gBoard[i][j].minesAroundCount === 0) {
                    if(gBoard[i][j].isMine) continue
                       
                    renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)  
                        //markNegs(newLocation)    
                }
                if (gBoard[i][j].minesAroundCount != 0) {
                    
                    renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 
                 }
                 
                // var newLocation = {i:i+1, j:j+1}
                //console.log(newLocation);
               
                renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 

        }
    }
    }    
    




function  gameOver(){
    gLives -= 1
    if(gLives = 0) gGame.isOn = false
   
    clearInterval(gtime)
    gGame.secsPassed = 0
    console.log('gameover');
    livesUpdate()
    
}

function isVictory(){
     for(var i = location.i - 1; i < location.i+2; i++){
        if(i < 0 || i >= gLevel.SIZE) continue
                        
        for (var j = location.j-1 ; j< location.j+2; j++) {
            if(i < 0 || i >= gLevel.SIZE) continue
             console.log(gLevel.SIZE** - gLevel.MINES);
            if(gBoard[i][j].isMarked && gBoard[i][j].minesAroundCount !=0) return false
           
            
            if(gGame.revealedCount === gLevel.SIZE** - gLevel.MINES) {
                clearInterval(gtime)
                gGame.secsPassed = 0
                console.log('victory');
    
            }

        }
    }
    
}