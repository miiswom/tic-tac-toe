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
        //find grid index
        this.findGridIndex(i, this.playerOne.round1.arr);
        //print input on gameboard
        this.printInput(i, this.playerOne.input, this.playerOne.round1.color)
        //remove grid from being selected
        // get bot choice
        let botIndex = this.getBotRandomChoice(gridsIndexes);
        this.printInput(botIndex, this.playerTwo.input, this.playerTwo.round1.color)
        }
      );
      }
    }


  },

  findGridIndex: function(index, arr) {
    const gridIndex = grids.findIndex( (e) => e === grids[index]);
    index = gridIndex
    console.log("the value of this index is " + gridIndex);
    
    if(!this.newArr.includes(gridIndex)) {
      arr.push(gridIndex);
      this.newArr.push(gridIndex);
      this.copyOfGridIndexes.splice(gridIndex, 1)
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

  printInput: function(index, input, color) {
    grids[index].textContent = input;
    grids[index].style.color = color;
  },

  /* ------------------------------------*/
  playerOne: {
    name: 'Aurora',
    input: 'X',
  
    round1: {
      arr: [],
      color: 'green'
    },
  
    round2: {
      arr: [],
      color: 'lime'
    },
  
    round3: {
      arr: [],
      color: 'yellow'
    },
  },

  playerTwo: {
    name: 'Bot',
    input: 'O',
    
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
}

gameplay.userClicks()