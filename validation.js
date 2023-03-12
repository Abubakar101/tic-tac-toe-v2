/*
  GAME LOGIC
*/

const directions = {
  0: {
    y: 0,
    x: -1,
    o: 4,
  },
  1: {
    y: -1,
    x: -1,
    o: 5,
  },
  2: {
    y: -1,
    x: 0,
    o: 6,
  },
  3: {
    y: -1,
    x: +1,
    o: 7,
  },
  4: {
    y: 0,
    x: +1,
    o: 0,
  },
  5: {
    y: +1,
    x: +1,
    o: 1,
  },
  6: {
    y: +1,
    x: 0,
    o: 2,
  },
  7: {
    y: +1,
    x: -1,
    o: 3,
  },
};

// rowIndex (y) (up/down) and columnIndex (x) (left/right)
const validatePlayerChoices = (array, y, x, goal) => {
  const currentValue = array[y][x];
  for (let key in directions) {
    const dir = directions[key];
    const oppDir = directions[dir.o];

    let totalCounts = 1;
    let tmp_y = y + dir.y;
    let tmp_x = x + dir.x;
    while (array[tmp_y]?.[tmp_x] === currentValue) {
      totalCounts++;
      tmp_y = tmp_y + dir.y;
      tmp_x = tmp_x + dir.x;
    }

    let tmp_oppDir_y = y + oppDir.y;
    let tmp_oppDir_x = x + oppDir.x;
    while (array[tmp_oppDir_y]?.[tmp_oppDir_x] === currentValue) {
      totalCounts++;
      tmp_oppDir_y = tmp_oppDir_y + oppDir.y;
      tmp_oppDir_x = tmp_oppDir_x + oppDir.x;
    }

    if (totalCounts >= goal) {
      return true;
    }
  }
  return false;
};
