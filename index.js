const directions = {
  0: {
    x: -1,
    y: 0,
    o: 4,
  },
  1: {
    x: -1,
    y: -1,
    o: 5,
  },
  2: {
    x: 0,
    y: -1,
    o: 6,
  },
  3: {
    x: +1,
    y: -1,
    o: 7,
  },
  4: {
    x: +1,
    y: 0,
    o: 0,
  },
  5: {
    x: +1,
    y: +1,
    o: 1,
  },
  6: {
    x: 0,
    y: +1,
    o: 2,
  },
  7: {
    x: -1,
    y: +1,
    o: 3,
  },
};

const validate = (array, x, y, goal) => {
  const currentValue = array[y][x];
  for (let key in directions) {
    const dir = directions[key];
    const oppDir = directions[dir.o];
    let totalCounts = 1;

    if (array[y]?.[x] === currentValue) {
      let tmp_x = x + dir.x;
      let tmp_y = y + dir.y;
      while (array[tmp_y]?.[tmp_x] === currentValue) {
        totalCounts++;
        tmp_x = tmp_x + dir.x;
        tmp_y = tmp_y + dir.y;
      }

      let tmp_oppDir_x = x + oppDir.x;
      let tmp_oppDir_y = y + oppDir.y;
      while (array[tmp_oppDir_y]?.[tmp_oppDir_x] === currentValue) {
        totalCounts++;
        tmp_oppDir_x = tmp_oppDir_x + oppDir.x;
        tmp_oppDir_y = tmp_oppDir_y + oppDir.y;
      }
    }

    if (totalCounts >= goal) {
      return true;
    } 
  }
  return false;
};

const ticTac = [
  [0, 1, 0, 6],
  [0, 1, 0, 5],
  [0, 1, 0, 4],
  [0, 1, 0, 3],
  [0, 1, 0, 2],
];
console.log(validate(ticTac, 1, 3, 5));

/*
  [0,1,0,6,9], 
  [0,1,0,5,9], 
  [0,1,0,4,9], 
  [0,1,0,3,9], 
  [0,1,0,2,9]
  
  */
