const X_class = 'x'
const O_class = 'o'
const winning_combos = [[0,1,2], [3,4,5], [6,7,8], [0, 3, 6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
const cellElements = document.querySelectorAll('[data-cell]')
const gameboard = document.getElementById('gb')
const winMessageElement = document.getElementById('winMsg')
//const winMessageTextElement = document.getElementById('winTxt')
const restartButton = document.getElementById('rb')
const winMessageTextElement = document.querySelector('[data-win-msg]')

//specific problem i ran into was calling the html elements in an  incorrect way. I fixed this by checking my code against the tutorial code after i saw my html id worked. Either way works
//i also did not have the correct ` when trying to implement the winmessagetextelement.innertext code .


let oTurn
startGame()

restartButton.addEventListener('click',startGame)
//i forgot about not needing to add () to functions when its a parameter

function startGame() {
    oTurn = false
cellElements.forEach(cell => {
    cell.classList.remove(X_class)
    cell.classList.remove(O_class)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick,{once: true})
})
setGameHoverBoardClass()
winMessageElement.classList.remove('show')
}
function handleClick(e){
   const cell= e.target
   const currentClass = oTurn ? O_class : X_class
   console.log(currentClass) 
   //placemark
   placeMark(cell, currentClass) 
     //check for win
   if(checkWin(currentClass))
   {
    endGame(false)
    console.log(currentClass + " wins")
   }else if(isDraw())
   {
    // check for draw
    endGame(true)
   }
   
 
    
    //switch turns 
    swapTurns()
    setGameHoverBoardClass()
    console.log('You have been clicked')
}

 function endGame(draw) {
 if (draw){
    winMessageTextElement.innerText = 'Draw!';
 }
 else{
 winMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
 }
 winMessageElement.classList.add('show');
}
 function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_class)||cell.classList.contains(X_class)
    })
    //destructuring cell elements into an array
 }
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns()
{
    oTurn =!oTurn
}
function setGameHoverBoardClass(){
gameboard.classList.remove(X_class)
gameboard.classList.remove(O_class)
if(oTurn){
    gameboard.classList.add(O_class)
}
else{
    gameboard.classList.add(X_class)
}
}

function checkWin(currentClass){
    return winning_combos.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
    //returns true if some of the winning combonations have been met.
}
