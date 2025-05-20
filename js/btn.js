'use strict'


function onClickTimer(){
   var time = setInterval(()=>{gGame.secsPassed += 1
   var elTimer = document.querySelector('.timer')
   elTimer.innerHTML = 'timer: ' + gGame.secsPassed
   console.log(gGame.secsPassed)}, 1000)  
}