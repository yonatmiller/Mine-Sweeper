'use strict'

var gtime
var gLives = 3

//Start game timer
function startTimer(){
   gtime = setInterval(()=>{gGame.secsPassed += 1
   var elTimer = document.querySelector('.timer')
   elTimer.innerHTML = 'timer: ' + gGame.secsPassed}, 1000)
}

//Update the number of remaining flags
function flagUpdate(diff){

    if (diff === 'mine'){
        diff = -1
    }else  {diff = 0}
    
    console.log( gLevel.MINES, gGame.markedCount, diff);
    
    var elTimer = document.querySelector('.flags')
    elTimer.innerHTML = 'flags: ' + (gLevel.MINES - gGame.markedCount + diff)
    //console.log(gGame.markedCount); 
}

//Update the number of lives remaining
function livesUpdate(){
    var elLives = document.querySelector('.lives')
    if(gLives === 3)  elLives.innerHTML = '❤️❤️❤️'
    if(gLives === 2)  elLives.innerHTML = '❤️❤️'
    if(gLives === 1)  elLives.innerHTML = '❤️'
    if(gLives === 0){
        clearInterval(gtime)
        gGame.markedCount = 0
        elLives.innerHTML = '🪦'

        var elsmily = document.querySelector('.smily')
        elsmily.innerText = '🤯'

    }  
    
}