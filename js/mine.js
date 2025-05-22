'use strict'

const MINE = '💥'

//Randomly places mines
function randomMine(celli, cellj){
gFirstClick = false
    for (var i = 0 ; i < gLevel.MINES; i++){
        var currMines = findEmptyCell()
        console.log(i);
        
            if(celli === currMines.i && cellj === currMines.j){
                continue    
            } else{
                
                // modal:
                gBoard[currMines.i][currMines.j].isMine = true
                setMinesNegsCount({i:currMines.i, j:currMines.j})
            }
       
console.log(i);
    }
    
}