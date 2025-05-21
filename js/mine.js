'use strict'

const MINE = '💥'

function randomMine(){
    
    for (var i = 0 ; i < gLevel.MINES; i++){
        var currMines = findEmptyCell()
        
        // modal:
        gBoard[currMines.i][currMines.j].isMine = true
        checkMinesNegsCount({i:currMines.i, j:currMines.j})
        
    }
}