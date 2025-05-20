'use strict'

const MINE = '💥'

function randomMine(){
    var currMines = findEmptyCell()

    console.log(findEmptyCell());
    
    for (var i = 0 ; i < gLevel.MINES; i++){
        var currCell = currMines.splice(getRandomIntInclusive(0,currMines.length),1)
        var currcell1 = {i: currCell[0].i, j:currCell[0].j}
        // modal:
        gBoard[currcell1.i][currcell1.j].isMine = true
        checkMinesNegsCount({i:currcell1.i, j:currcell1.j})
        
    }
}