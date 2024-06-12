const gridContainer = document.querySelector('.grid__container');
const grids = Array.from(gridContainer.querySelectorAll('.grid__item'));

const gridsIndexes = grids.map( (e, i) => i);

const gameplay = {

  newArr: [],
    // copy of grids indexes
  copyOfGridIndexes: gridsIndexes.slice(),
  

  userClicks: function() {

    if(this.newArr.length <= 10) {
      for(let i=0; i < grids.length; i++) {
        grids[i].addEventListener('click', () => {

    /******* FIRST ROUND  *******/
        if (this.playerOne.moves.arr.length < 5) {
        //find grid index
        this.findGridIndex(i, this.playerOne.moves.arr);
        //print input on gameboard
        this.printInput(i, this.playerOne.input, this.playerOne.moves.color, this.playerOne.name, this.playerOne.moves.arr)
        //remove grid from being selected
        // get bot choice
        let botIndex = this.getBotRandomChoice(gridsIndexes);
        this.playerTwo.moves.arr.push(botIndex);
        this.printInput(botIndex, this.playerTwo.input, this.playerTwo.moves.color, this.playerTwo.name, this.playerTwo.moves.arr);
          
          // if(this.playerOne.moves.arr.length === 3 || this.playerTwo.moves.arr.length === 3 ) {
            this.checkWinArr(this.playerOne.name, this.playerOne.moves.arr);
            // this.checkWinArr(this.playerTwo.name, this.playerTwo.moves.arr);
          // }

        } 
    /******* SECOND ROUND  *******/

      }
    );//
    }}
  },

  findGridIndex: function(index, arr) {
    const gridIndex = grids.findIndex( (e) => e === grids[index]);
    index = gridIndex
    console.log("the value of this index is " + gridIndex);
    
    if(!this.newArr.includes(gridIndex)) {
      arr.push(gridIndex);
      this.newArr.push(gridIndex);
      // this.copyOfGridIndexes.splice(gridIndex, 1)
    } else {
      alert('Pick another grid');
      throw new Error('Pick another grid');
    }


    console.log(arr);
    console.log(this.newArr)
    console.log(this.copyOfGridIndexes)
  },

  // 4 has been picked so its IN the newArr & REMOVE from copyOf Index

getBotRandomChoice: function(arr) { 
  let num = arr[(Math.floor(Math.random() * arr.length))];
  return grids[num].textContent === ' ' ? num : this.getBotRandomChoice(gridsIndexes);
},

  printInput: function(index, input, color, name, round) {
    grids[index].textContent = input;
    grids[index].style.color = color;

    if(round.length >= 3) {
      this.checkWinArr(name, round);
    } else {
      return; 
    }
  },

  checkWinArr: function(name, round) {
    // let newArr = []
    if(round.length >= 3) {

      for(let i = 0; i < this.arrayWin.length; i++) {
        if(this.arrayWin[i].every(e => round.includes(e))) {
          alert(`a win: ${name} won ${this.arrayWin[i]} === ${round} `);
          window.location.reload();
        } else {
          console.log(`a loss: ${name} lost ${this.arrayWin[i]} !== ${round}`)
        }
    }
    }
    },

  /* ------------------------------------*/
  playerOne: {
    name: 'Aurora',
    input: 'X',
  
    moves: {
      arr: [],
      color: 'green'
    },
  },

  playerTwo: {
    name: 'Bot',
    input: 'O',
    
    moves: {
      arr: [],
      color: 'purple'
    },
  },

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

gameplay.userClicks()

//concat all arr and use slice to check if we have a match