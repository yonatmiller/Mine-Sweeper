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
    //console.log(document.querySelector(`.cell cell-0-0`))


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
						//console.log(gBoard[i][j].minesAroundCount, i,j);
                       
                        //  MODEL:  
                        gBoard[i][j].minesAroundCount +=  1
						
					}
	
				}
			}
   
}

function onCellClicked(elCell, i, j){
    if(gGame.isOn)
    {
        onClickTimer()
        console.log(gBoard[i][j].isMine);

    if(gBoard[i][j].isMine){
        renderCell({i:i, j:j},MINE)
        return gameOver()
    } 
     if (gBoard[i][j].minesAroundCount != 0) {
        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 
     }else  markNegs({i:i, j:j})
    //DOM:
   
  
    console.log(elCell);

}

function markNegs(location){
    for(var i = location.i - 1; i < location.i+2; i++){
        console.log(i);
        
        if(i < 0 || i >= SIZE) continue
                        
        for (var j = location.j-1 ; j< location.j+2; j++) {
             console.log(j);
            if(j < 0 || j >= SIZE)continue
                
                

                if (gBoard[i][j].minesAroundCount === 0) {
                    if(gBoard[i][j].isMine) continue
                        renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount)  
                        //markNegs(newLocation)    
                }
                if (gBoard[i][j].minesAroundCount != 0) {
                    renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 
                 }
                 
                 var newLocation = {i:i+1, j:j+1}
                console.log(newLocation);
                
                renderCell({i:i, j:j}, gBoard[i][j].minesAroundCount) 

               
             
        }
    }
    }    
}

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

        //DOM:
            elCell.innerText = FLAG
            
        }
    }
}


function  gameOver(){
    gGame.isOn = false
    console.log('gameover');
    
}