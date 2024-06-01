const gridContainer = document.querySelector('.grid__container');
const grids = Array.from(gridContainer.querySelectorAll('.grid__item'));

console.log(grids);
const allClicks = [];

// function addO() {
// // when i click on a grid element
// // find the index of that element
// // and modify that element
// };
let input = 'X';

function addX() {

  for(let i=0; i < grids.length; i++) {
    grids[i].addEventListener('click', () => {
      console.log(grids[i]);
      grids[i].textContent = input;
      allClicks.push(grids[i].textContent);
      console.log(allClicks);
      checkPreviousClick();
      })
  }}

  function checkPreviousClick() {
    console.log('works...')
    console.log(allClicks[allClicks.length -1]);

    if(allClicks[allClicks.length -1] === 'X') {
      input = 'O';
    } else if ((allClicks[allClicks.length -1] === 'O')) {
      input = 'X';
    }
  }
  
  addX();

  // function clickListener() {
  //   let e = document.onclick
  //   let current = e.target.textContent;
  //   console.log(current);
  // }

  // clickListener()

// const playerOne = {
//   name: playerNumOne,
//   gameInput: addO
// };
// const playerTwo = {
//   name: playerNumTwo,
//   gameInput: addX
// };



