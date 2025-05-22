'use strict'

//building board - DOM
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

    console.log(elContainer);
    
}

//Random number
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Finds an empty cell
function findEmptyCell(){
    var emptyCell = []

    for (var i = 0; i < gLevel.SIZE; i++){
        for (var j = 0; j < gLevel.SIZE; j++){

            if(!gBoard[i][j].isMarked && !gBoard[i][j].isMine){
                var cell = {
                    i : i,
                    j : j
                }
                emptyCell.push(cell)
            }
        }

    }

    var ranIdx = getRandomIntInclusive(0, emptyCell.length)
    return emptyCell[ranIdx]
}

//render Cell - DOM
function renderCell(location, value) {
    
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value

    if(value === MINE){
        elCell.classList.add('stylemine')
    }else{
        elCell.classList.add('stylecell')
    }
}

