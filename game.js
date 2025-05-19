'use strict'

var SIZE = 4
const FLAG = '🚩'
const EMPTY = ''

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
    gBoard = buildBoard()
    
    
    renderBoard(gBoard, '.board-container')
   
   
    console.log(gBoard);
    randomMine()
    gGame.isOn = true
}

function buildBoard() {
    const size  = SIZE
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



function setMinesNegsCount(){
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            console.log(gBoard[i][j].isMine);
            
            if(gBoard[i][j].isMine){
                checkMinesNegsCount({i:i, j:j})
            }
            //MODEL:
           //gBoard[i][j].minesAroundCount = curr

           //DOM:
           
           //renderCell({i:i, j:j}, chekMinesNegsCount({i:i, j:j}))

        }
        
    }

}


function checkMinesNegsCount(cell){

    if(cell.i >= 0 && cell.i < SIZE && cell.j < SIZE && cell.j >= 0 ){
				
	
				for(var i = cell.i - 1; i < cell.i+2; i++){
                    
					if(i < 0 || i >= SIZE) continue
					
                    for (var j = cell.j-1 ; j< cell.j+2; j++) {
						if(j < 0 || j >= SIZE)continue
                        
                        if(gBoard[i][j].isMine) continue
						console.log(gBoard[i][j].minesAroundCount, i,j);
                       
                        //  MODEL:  
                        gBoard[i][j].minesAroundCount +=  1
						 
                        //  DOM :
                        console.log(document.querySelector(`.cell-${location.i}-${location.j}`));
                        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)
					}
	
				}
			}

   
   
   
}


function onCellClicked(elCell, i, j){
    console.log(elCell, i, j);
    
    

}

function onCellMarked(elCell, i, j){
    renderCell({i,j}, FLAG)
    elCell = que

}
