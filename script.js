const setInnerHTMLValue = (selector, value) => {
  const element = document.querySelector(selector);
  element.innerHTML = value;
};

const ratioSelecter = document.getElementById("ratio");
const goalSelector = document.getElementById("goal");
const playerSelector = document.getElementById("player");
const boxSelector = document.getElementById("box");

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
});

goalSelector.addEventListener("input", () => {
  if (goalSelector.valueAsNumber >= ratioSelecter.valueAsNumber) {
    ratioSelecter.value = goalSelector.valueAsNumber;
    setInnerHTMLValue(
      "#ratio-number",
      `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
    );

    createBoxes(ratioSelecter.valueAsNumber);
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
  }
  setInnerHTMLValue("#player-number", playerSelector.valueAsNumber);
});
