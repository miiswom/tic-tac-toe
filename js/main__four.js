const gridContainer = document.querySelector('.grid__container');
const grids = Array.from(gridContainer.querySelectorAll('.grid__item'));
const gridsIndexes = grids.map( (e, i) => i);

// ********* Gameboard objects *********

const gameboard = {
  newArr: [],

  arrayWin: [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ],
}

userClicks = (function () {
  for(let i=0; i < grids.length; i++) {
    grids[i].addEventListener('click', () => {

/*** ROUND  LOOP***/
      aurora.findGridAndPrint(i);
      theBot.findGridAndPrint(theBot.getBotRandomChoice()), 6000;
    });
  };
})();


// ********* Player objects *********

function createPlayer (name, input, color) {
  let playerName = name;
  const playerInput =  input;
  const playerColor = color;
  let playerMoves = []; 

  let findGridAndPrint = (index) => {
  const gridIndex = grids.findIndex( (e) => e === grids[index]);
  index = gridIndex
  console.log("the value of this index is " + gridIndex);

  if(!gameboard.newArr.includes(gridIndex)) {
    playerMoves.push(gridIndex);
    gameboard.newArr.push(gridIndex);

    grids[index].textContent = input;
    grids[index].style.color = color;
    } else {
      alert('Pick another grid');
      throw new Error('Pick another grid');
    }

  //console.log(playerMoves);
  //console.log(gameboard.newArr)
  if(playerMoves.length >= 3) {
        for(let i = 0; i < gameboard.arrayWin.length; i++) {
          if(gameboard.arrayWin[i].every(e => playerMoves.includes(e))) {
            alert(`a win: ${name} won ${gameboard.arrayWin[i]} === ${playerMoves} `);
            setTimeout(location.reload(), 6000);
          } else {
            console.log(`a loss: ${name} lost ${gameboard.arrayWin[i]} !== ${playerMoves}`)
          }
      }
    }
}

  return {playerName, playerInput, playerColor, findGridAndPrint}
}
// 
const aurora = createPlayer('Aurora', 'X', 'lime');

function createBot(name, input, color) {
  const bot = createPlayer(name, input, color);

  const getBotRandomChoice = () => {
  let num = gridsIndexes[(Math.floor(Math.random() * gridsIndexes.length))];
  return grids[num].textContent === ' ' ? num : getBotRandomChoice(gridsIndexes);
}

return Object.assign({}, bot, {getBotRandomChoice})
};

const theBot = createBot('Bot', 'O', 'fuchsia')
/*
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 50 50">
  <line pathLength="100" class="stroke" x1="8.5" y1="8.5" x2="41.5" y2="41.5" />
  <line pathLength="100" class="stroke" x1="41.5" y1="8.5" x2="8.5" y2="41.5" style="animation-delay:1s" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 50 50">
  <circle class="stroke" pathLength="100" cx="25" cy="25" r="18" transform="rotate(-90) scale(1 -1)" transform-origin="25 25" style="animation-delay:2s; animation-duration:4s;" />
</svg>

*/