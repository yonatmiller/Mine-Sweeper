'use strict'

var gtime
var gLives = 3

function startTimer(){
   gtime = setInterval(()=>{gGame.secsPassed += 1
   var elTimer = document.querySelector('.timer')
   elTimer.innerHTML = 'timer: ' + gGame.secsPassed}, 1000)
}

function flagUpdate(){
    var elTimer = document.querySelector('.flags')
    elTimer.innerHTML = 'flags: ' + (gLevel.MINES - gGame.markedCount)
    //console.log(gGame.markedCount); 
}

function livesUpdate(){
    var elTimer = document.querySelector('.lives')
    if(gLives = 3)  elTimer.innerHTML = '❤️❤️❤️'
    if(gLives = 2)  elTimer.innerHTML = '❤️❤️'
    if(gLives = 1)  elTimer.innerHTML = '❤️'
    if(gLives = 0)  elTimer.innerHTML = '💔'
    console.log(elTimer.innerHTML, gLives);
     
    // var strHTML = gLives
    // elTimer.innerHTML = strHTML

}