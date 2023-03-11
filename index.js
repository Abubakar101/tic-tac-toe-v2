const ratioSelecter = document.getElementById("ratio");
const goalSelector = document.getElementById("goal");
const playerSelector = document.getElementById("player");
const boxSelector = document.getElementById("box");
let initRowArray = [];

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

const setInnerHTMLValue = (selector, value) => {
  const element = document.querySelector(selector);
  element.innerHTML = value;
};

const createRowColumnArray = (ratioValue) => {
  const rowArray = [];
  for (let index = 0; index < ratioValue; index++) {
    const columnArray = new Array(ratioValue).fill(0);
    rowArray.push(columnArray);
  }
  return rowArray;
};

const createBoxes = (ratio) => {
  const nodes = [];
  for (let index = 0; index < ratio; index++) {
    const rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    rowDiv.setAttribute("data-row", index);

    for (let secIndex = 0; secIndex < ratio; secIndex++) {
      const columnDiv = document.createElement("div");
      columnDiv.setAttribute("class", "column");
      columnDiv.setAttribute("data-column", secIndex);
      rowDiv.appendChild(columnDiv);
    }
    nodes.push(rowDiv);
  }
  boxSelector.replaceChildren(...nodes);
};

ratioSelecter.addEventListener("input", () => {
  if (ratioSelecter.valueAsNumber <= goalSelector.valueAsNumber) {
    goalSelector.value = ratioSelecter.valueAsNumber;
    setInnerHTMLValue("#goal-number", goalSelector.valueAsNumber);
  }
  setInnerHTMLValue(
    "#ratio-number",
    `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
  );
  createBoxes(ratioSelecter.valueAsNumber);
  initRowArray = createRowColumnArray(ratioSelecter.valueAsNumber);
});

goalSelector.addEventListener("input", () => {
  if (goalSelector.valueAsNumber >= ratioSelecter.valueAsNumber) {
    ratioSelecter.value = goalSelector.valueAsNumber;
    setInnerHTMLValue(
      "#ratio-number",
      `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
    );

    createBoxes(ratioSelecter.valueAsNumber);
    initRowArray = createRowColumnArray(ratioSelecter.valueAsNumber);
  }
  setInnerHTMLValue("#goal-number", goalSelector.valueAsNumber);
});

playerSelector.addEventListener("input", () => {
  const setNewRatioValue = (playerSelector.valueAsNumber - 1) * 3;
  if (ratioSelecter.valueAsNumber < setNewRatioValue) {
    ratioSelecter.value = setNewRatioValue;
    setInnerHTMLValue(
      "#ratio-number",
      `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
    );
    createBoxes(ratioSelecter.valueAsNumber);
    initRowArray = createRowColumnArray(ratioSelecter.valueAsNumber);
  }
  setInnerHTMLValue("#player-number", playerSelector.valueAsNumber);
});

boxSelector.addEventListener("click", (event) => {
  const column = event.target;
  const row = event.target.parentNode;
  if (column.className === "column") {
    if (row.className === "row") {
      const rowIndex = row.getAttribute("data-row");
      const columnIndex = column.getAttribute("data-column");
      console.log(">>>>", rowIndex, columnIndex, goalSelector.valueAsNumber, initRowArray);
      initRowArray[rowIndex][columnIndex] = 1;
      const validation = validate(
        initRowArray,
        rowIndex,
        columnIndex,
        goalSelector.valueAsNumber
      );

      console.log(">>> validation", validation);
    }
  }
});

const initialLoad = () => {
  const defaultRatio = 3;
  createBoxes(defaultRatio);
  while (initRowArray.length < defaultRatio) {
    initRowArray.push(new Array(defaultRatio).fill(0));
  }
};
initialLoad();
