'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = EMPTY
            const className = `cell cell-${i}-${j}`
          
           strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j})">${cell}</td>`
            
        }   
        
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
    
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            document.querySelector('.board-container').classList.add('hidden')
        }
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function findEmptyCell(){
    var emptyCell = []

    for (var i = 0; i < SIZE; i++){
        for (var j = 0; j < SIZE; j++){

            if(!gBoard[i][j].isMarked && !gBoard[i][j].isMine){
                var cell = {
                    i : i,
                    j : j
                }
                emptyCell.push(cell)
            }
        }

    }

    return emptyCell
}

function renderCell(location, value) {
    
    
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)   
    elCell.innerHTML = value
   
    
}