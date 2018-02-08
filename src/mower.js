class Mower {
  constructor(MaxX = 0, MaxY = 0) {
    // A map that stores the 4 possible directions,
    // the fitst element of the map is the current direction
    // the current direction's value is equal 1 the rest of the map is 0
    this.directionsMap = [
      {
        key: 'W',
        value: 1,
      },{
        key: 'N',
        value: 0,
      },{
        key: 'E',
        value: 0,
      },{
        key: 'S',
        value: 0,
    }];

    this.corners = {
      MaxX: parseInt(MaxX) || 0,
      MaxY: parseInt(MaxY) || 0,
    };
  }

  init(initialX = 0, initialY = 0, initialO = 'E') {
    const possibleDirections = ['W', 'N', 'E', 'S'];
    if (possibleDirections.indexOf(initialO) === -1 ||
     isNaN(parseInt(initialX)) ||
     isNaN(parseInt(initialX)) ||
     parseInt(initialX) > this.corners.MaxX ||
     parseInt(initialY) > this.corners.MaxY
   ) {
      console.error('Invalid initial Values', initialX, initialO, initialO);
      throw Error('Invalid initial Values');
    }

    this.position = {
      x: parseInt(initialX),
      y: parseInt(initialY),
      o: initialO,
    };

    while (this.directionsMap[0].key !== initialO) {
      this.rotate('R');
    }
  }

  // returns the value of the Map by key
  getDirectionValue(key) {
   for (let i = 0; i < this.directionsMap.length; i++) {
     if (this.directionsMap[i].key === key) {
       return this.directionsMap[i].value;
     }
   }
  }

  moveForward() {
    // An equation that links the new position to the direction
    const newXPos = this.position.x + (this.getDirectionValue('E') - this.getDirectionValue('W'));
    const newYPos = this.position.y + (this.getDirectionValue('N') - this.getDirectionValue('S'));

    if (newXPos < 0 ||
       newXPos > this.corners.MaxX ||
       newYPos < 0 ||
       newYPos > this.corners.MaxY) {
         return;
    }

    this.position = {
      x: newXPos,
      y: newYPos,
      o: this.directionsMap[0].key,
    };
  }

  // shift an array to the right, example [1, 4, 5, 3] becomes [4, 5, 3, 1]
  shiftDirectionsMap() {
    this.directionsMap[0].value = 0;
    const firstElm = this.directionsMap.shift();
    this.directionsMap[0].value = 1;
    this.directionsMap.push(firstElm);
  }

  // shift an array to the left, example [1, 4, 5, 3] becomes [3, 1, 4, 5]
  unshiftDirectionsMap() {
    this.directionsMap[0].value = 0;
    let lastElm = this.directionsMap.pop();
    this.directionsMap = [lastElm].concat(this.directionsMap);
    this.directionsMap[0].value = 1;
  }

  rotate(rotation) {
    if (rotation === 'R') {
      this.shiftDirectionsMap();
    } else {
      this.unshiftDirectionsMap();
    }
  }

  executeSequence(sequence) {
    if(!/^[FRL]*$/.test(sequence)) {
      console.error('Invalid sequence');
      return;
    }

    for (let i = 0; i < sequence.length; i++) {
      if(sequence[i] === 'F') {
        this.moveForward();
      } else {
        this.rotate(sequence[i]);
      }
    }
  }
}

export default Mower;
