const ratioSelecter = document.getElementById("ratio");
const goalSelector = document.getElementById("goal");
const playerSelector = document.getElementById("player");
const boxSelector = document.getElementById("box");
let initRowArray = [];
let initPlayerConfig = {};
let currentPlayerTurn = 1; // zero is initial/reset value

// const assignAlphabets = () => {};

// https://css-tricks.com/snippets/javascript/random-hex-color/
const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

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

const createPlayersConfig = (playersCount) => {
  const init = {};
  for (let index = 0; index < playersCount; index++) {
    const alphabet = String.fromCharCode(65 + index);
    init[index] = {
      name: alphabet,
      color: `#${generateRandomColor()}`,
    };
  }
  return init;
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
  initPlayerConfig = createPlayersConfig(playerSelector.valueAsNumber);
});

boxSelector.addEventListener("click", (event) => {
  const column = event.target;
  const row = event.target.parentNode;
  if (column.className === "column") {
    if (row.className === "row") {
      const rowIndex = row.getAttribute("data-row");
      const columnIndex = column.getAttribute("data-column");
      const playerInfo = initPlayerConfig[currentPlayerTurn - 1];

      initRowArray[rowIndex][columnIndex] = currentPlayerTurn;
      column.innerHTML = playerInfo?.name;
      column.style.backgroundColor = playerInfo?.color;

      const validation = validatePlayerChoices(
        initRowArray,
        Number(rowIndex),
        Number(columnIndex),
        goalSelector.valueAsNumber
      );

      console.log(
        ">>> validation",
        validation,
        initPlayerConfig,
        currentPlayerTurn
      );
      if (validation) {
        setInnerHTMLValue("#message", `Player "${playerInfo.name}" is WINNER`);
      } else {
        if (playerSelector.valueAsNumber !== currentPlayerTurn) {
          currentPlayerTurn++;
        } else {
          currentPlayerTurn = 1;
        }
      }
    }
  }
});

const initialLoad = () => {
  createBoxes(ratioSelecter.valueAsNumber);
  // Create initial arrays 3x3
  while (initRowArray.length < ratioSelecter.valueAsNumber) {
    initRowArray.push(new Array(ratioSelecter.valueAsNumber).fill(0));
  }
  // Create initial player configuration
  initPlayerConfig = createPlayersConfig(playerSelector.valueAsNumber);
};
// Start The Game
initialLoad();
