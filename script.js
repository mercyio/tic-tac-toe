// 
function createData(){
  const initGameData = {
     xwins:0,
     owins:0,
     usedTile:0,
     xTurn:true,
     oCombo:[],
     xCombo:[]
 }
 
   if(!localStorage.getItem('gameData')){
    localStorage.setItem('gameData',JSON.stringify(initGameData))
   }
 }
 
 const updateData = (key,value)=>{
     const prevGameData = JSON.parse(localStorage.getItem('gameData'))
     const newGameData = {
         ...prevGameData
     }
     newGameData[key] = value
     localStorage.setItem('gameData',JSON.stringify(newGameData))
 }
 const getData = ()=>(
     localStorage.getItem("gameData")?
      JSON.parse(localStorage.getItem("gameData"))
      :{
         xwins:0,
         owins:0,
         usedTile:0,
         xTurn:true,
         oCombo:[],
         xCombo:[]
     }
 )
 
 const winningCombo = [
     [1,2,3],
     [4,5,6],
     [7,8,9],
     [1,4,7],
     [2,5,8],
     [3,6,9],
     [1,5,9],
     [3,5,7]
 ]
 
 //wins checker
 let {xwins} = getData()
 let {owins} = getData()
 let {usedTile} = getData()

 //player turn
 let {xTurn} = getData()
 
 //player combos
 let {xCombo} = getData()
 let {oCombo} = getData()
 
 //dom elements
 const xwinEL = document.querySelector(".x-wins")
 const owinEL = document.querySelector(".o-wins")
 const currentTurn = document.querySelector('.turn')
 const tiles = document.querySelectorAll('.tile')
 const changeTurnBtn = document.querySelector('.change-turn')
 const winnerEl = document.querySelector('.winner') 
 const winModal = document.querySelector('.win-modal')
 const winEl = document.querySelector('.win-text')
 const quitBtn = document.querySelector('.quit')
 const startBtn = document.querySelector('.start-game')
 const continueBtn = document.querySelector('.continue')
 
 //game functionality
 function resetGame(tiles,xWinEL,oWinEL,x=0,o=0){
     xCombo = []
     oCombo = []
     tiles.forEach(tile=>{
         tile.innerHTML = ""
         tile.classList.remove('used')
     })
     xWinEL.innerHTML = x
     oWinEL.innerHTML = o
 
     usedTile = 0
     updateData("xCombo",xCombo)
     updateData("oCombo",oCombo)
     updateData("usedTile",usedTile)
     updateData("xwins",x)
     updateData("owins",o)
     winModal.style.transform = 'scale(0)'
 }
 function checkWinner(player){
   if(player === "x"){
   const hasWon =  winningCombo.some((item)=>
         item.every(item2=> xCombo.includes(item2))
     )
     if(hasWon){
         xwins ++
         updateData("xwins",xwins)
         winModal.style.transform = 'scale(1)'
        winnerEl.innerHTML = '<p style =" color:aqua">PLAYER X </p>'
        winModal.style.transform = 'scale(1)'
         // resetGame(tiles,xwinEL,owinEL,xwins,owins)
     }
   }
   else if(player === "o"){
     const hasWon =  winningCombo.some((item)=>
     item.every(item2=> oCombo.includes(item2))
     )
     if(hasWon){
     owins ++
     updateData('owins',owins)
     winnerEl.innerHTML ='<p  style =" color:orange">PLAYER O</p>'
     winModal.style.transform = 'scale(1)'
 
         // resetGame(tiles,xwinEL,owinEL,xwins,owins)
     }
   }
 }
 function addToTile(tile){
     changeTurnBtn.style.display = "none"
     if(usedTile < 8){
         if(!tile.classList.contains('used')){
             if(xTurn){
                 tile.innerHTML =  '<p style =" color:aqua">X </p>'
                 currentTurn.innerHTML = '<p  style =" color:orange">O TURN</p>'
                 xCombo.push(parseInt(tile.id))
                 updateData('xCombo',xCombo)
                 checkWinner('x')             
             }
             else{
                 tile.innerHTML = '<p  style =" color:orange">O</p>'
                 currentTurn.innerHTML = '<p style =" color:aqua">X TURN </p>'
                 oCombo.push(parseInt(tile.id))
                 updateData('oCombo',oCombo)
                 checkWinner('o')
                 
              }
             xTurn = !xTurn
             updateData('xTurn',xTurn)
             tile.classList.add('used')
             usedTile ++
         }
     }
     else{
     //    resetGame(tiles,xwinEL,owinEL,xwins,owins)
     winModal.style.transform = "scale(1)"
     winnerEl.innerHTML = "NO PLAYER   "
     winEl.innerHTML = "Game Over"
     }
  
    
 }
 
 
 //event listeners
 changeTurnBtn.addEventListener('click',()=>{
     xTurn = !xTurn
     if(xTurn){
         currentTurn.innerHTML ='<p style =" color:aqua">X TURN </p>'
         updateData('xTurn',xTurn)
     }else{
         currentTurn.innerHTML = '<p  style =" color:orange">O TURN</p>'
         updateData('OTurn',OTurn)
     }
 })
 
 tiles.forEach(tile=>{
     xCombo.forEach(combo=>{
         if(tile.id == combo){
             tile.classList.add("used")
             tile.innerHTML = '<p style =" color:aqua">X </p>'
         }
     })
     oCombo.forEach(combo=>{
         if(tile.id == combo){
             tile.classList.add("used")
             tile.innerHTML =  '<p  style =" color:orange">O</p>'
         }
     })
     tile.addEventListener('click',()=>addToTile(tile))
 })
 quitBtn.addEventListener('click',()=>{
     changeTurnBtn.style.display  = "block"
     resetGame(tiles,xwinEL,owinEL,0,0)
 })
 startBtn.addEventListener('click',()=>{
  changeTurnBtn.style.display  = "block"
  resetGame(tiles,xwinEL,owinEL,0,0)
})
 continueBtn.addEventListener('click',()=>{
     resetGame(tiles,xwinEL,owinEL,xwins,owins)
 })
 window.addEventListener("load",()=>{
     createData()
     xwinEL.innerHTML = xwins,
     owinEL.innerHTML = owins,
     currentTurn.innerHTML = xTurn?
     '<p style =" color:aqua">X TURN </p>'
     : '<p  style =" color:orange">O TURN</p>'
     if(owins> 0 || xwins > 0){
         changeTurnBtn.style.display  = "none"
     }
 })