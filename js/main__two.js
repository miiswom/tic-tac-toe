const gridContainer = document.querySelector('.grid__container');
const grids = Array.from(gridContainer.querySelectorAll('.grid__item'));

const gridsIndexes = grids.map( (e, i) => i);

console.log(gridsIndexes);

const gameplay = {
  
  arrayOne: gridsIndexes,
  // copy of grids
  arrayTwo: gridsIndexes,
  
  playerOne: {
    name: 'Rocky',
    input: 'X',
    color: ['lime', 'yellow', 'lightgreen'],
    
    round1: {
      arr: [],
      color: 'lime'
    },
    round2: {
      arr: [],
      color: 'yellow'
    },
    round3: {
      arr: [],
      color: 'lightgreen'
    },
  },

  userChoice: function() {
    for(let i=0; i < grids.length; i++) {
      
      grids[i].addEventListener('click', () => {
        if(this.playerOne.round1.arr.length < 3) {
          
          this.findGridIndex(this.playerOne.round1.arr, i);
          this.printInput(i, this.playerOne.input, this.playerOne.color[0]);
          
          this.removeGridSelection(grids, i);

          this.newPlayerTwoChoice();
        } else if(this.playerOne.round2.arr.length < 3) {
          this.findGridIndex(this.playerOne.round2.arr, i);
          this.printInput(i, this.playerOne.input, this.playerOne.color[1]);

          this.removeGridSelection(grids, i);


          this.newPlayerTwoChoice();
        } else if(this.playerOne.round3.arr.length < 3) {
          this.findGridIndex(this.playerOne.round3.arr, i);
          this.printInput(i, this.playerOne.input, this.playerOne.color[2]);

          this.removeGridSelection(grids, i);


          this.newPlayerTwoChoice();
        };
      })
    }
  },

//add an event listener onclick to the grid__item
//when the user click; printInput and let playerTwoChoice run
  playerOneChoice: function () {
    for(let i=0; i < grids.length; i++) {
      if(this.playerOne.round1.arr.length < 3) {
          this.randomChoice(this.playerOne.round1.arr, this.arrayOne, this.playerOne.input, this.playerOne.round1.color);
          this.checkWinArr(this.playerOne.round1.arr);
        } else if(this.playerOne.round2.arr.length < 3) {
          this.randomChoice(this.playerOne.round2.arr, this.arrayOne, this.playerOne.input, this.playerOne.round2.color);
          this.checkWinArr(this.playerOne.round2.arr);
        } else if(this.playerOne.round3.arr.length < 3) {
          this.randomChoice(this.playerOne.round3.arr, this.arrayOne, this.playerOne.input, this.playerOne.round3.color);
          this.checkWinArr(this.playerOne.round3.arr);
        };
    }

  },
  
  /*------------------------------------*/
  
  playerTwo: {
    name: 'Bot',
    input: 'O',
    color: ['purple', 'pink','red'],
    
    round1: {
      arr: [],
      color: 'purple'
    },
    round2: {
      arr: [],
      color: 'pink'
    },
    round3: {
      arr: [],
      color: 'red'
    },
  },
  
 newPlayerTwoChoice: function() {
    let random = this.newRandomChoice(gridsIndexes);

    if(this.playerTwo.round1.arr.length < 3) {
      this.playerTwo.round1.arr.push(random);
      this.printInput(random, this.playerTwo.input, this.playerTwo.color[0]);
      this.removeGridSelection(grids, random);
    } else if(this.playerTwo.round2.arr.length < 3) {
      this.playerTwo.round2.arr.push(random);
      this.printInput(random, this.playerTwo.input, this.playerTwo.color[1]);
      this.removeGridSelection(grids, random);
    } else if(this.playerTwo.round3.arr.length < 3) {
      this.playerTwo.round3.arr.push(random);
      this.printInput(random, this.playerTwo.input, this.playerTwo.color[2]);
      this.removeGridSelection(grids, random);
    }
  },
  
  playerTwoChoice: function () {
    
    if(this.playerTwo.round1.arr.length < 3) {
      this.randomChoice(this.playerTwo.round1.arr, this.arrayTwo, this.playerTwo.input, this.playerTwo.round1.color);
      // this.checkWinArr(this.playerTwo.round1.arr);
    } else if(this.playerTwo.round2.arr.length < 3) {
      this.randomChoice(this.playerTwo.round2.arr, this.arrayTwo, this.playerTwo.input, this.playerTwo.round2.color);
      // this.checkWinArr(this.playerTwo.round2.arr);
    } else if(this.playerTwo.round3.arr.length < 3) {
      this.randomChoice(this.playerTwo.round3.arr, this.arrayTwo, this.playerTwo.input, this.playerTwo.round3.color);
      // this.checkWinArr(this.playerTwo.round3.arr);
    }
  },

  newRandomChoice: function(arr) { 
    let num = arr[(Math.floor(Math.random() * arr.length))];

    return grids.includes(num) ? this.randomChoice() : num;
  },
  
  randomChoice: function(round, arr, input, color) { 
    for(let i = 0; i < 3; i++) {
      let num = arr[(Math.floor(Math.random() * arr.length))];
      round.push(num);
      this.printInput(num, input, color)
      arr = arr.filter( (e) => { return e !== num });
      }
  },

  findGridIndex: function(arr, index ) {
    const gridIndex = grids.findIndex( (e) => e === grids[index]);
    console.log("the index of this grid is " + gridIndex);
    if(!arr.includes(gridIndex)) {
      arr.push(gridIndex);
    } else {
      console.log('Error');
      this.errorWarning();
    }
    console.log(arr);
  },

  recordChoice: function(input, color) {
    if(!grids[index].textContent === null) {
    grids[index].textContent = input;
    grids[index].style.color = color;
    } else {
      console.log('Error');
      return;
    }
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
  
  checkWinArr: function(round) {
    for(let i = 0; i < this.arrayWin.length; i++) {
      
      console.log(round.every(e => this.arrayWin[i].includes(e)) ? `a win: ${round} === ${this.arrayWin[i]}` : `a loss ${round} !== ${this.arrayWin[i]}`);
    }
  },

  printInput: function(index, input, color) {
    grids[index].textContent = input;
    grids[index].style.color = color;
  },
  
  removeGridSelection: function(arr, index) {
    console.log(arr.splice(index, arr[index]))
  },

  errorWarning: function() {
    alert('Choose another grid');
    return this.userChoice();
  },
}


console.log("- -- - - -- -- - - -")


gameplay.userChoice()


// console.log(gameplay.arrayWin[0]);

