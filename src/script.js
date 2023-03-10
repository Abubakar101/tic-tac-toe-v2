const setInnerHTMLValue = (selector, value) => {
  const element = document.querySelector(selector);
  element.innerHTML = value;
};

const ratioSelecter = document.getElementById("ratio");
const goalSelector = document.getElementById("goal");
const player = document.getElementById("player");

ratioSelecter.addEventListener("input", () => {
  if (ratioSelecter.valueAsNumber <= goalSelector.valueAsNumber) {
    goalSelector.value = ratioSelecter.valueAsNumber;
    setInnerHTMLValue("#goal-number", goalSelector.valueAsNumber);
  }
  setInnerHTMLValue(
    "#ratio-number",
    `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
  );
});
goalSelector.addEventListener("input", () => {
  if (goalSelector.valueAsNumber >= ratioSelecter.valueAsNumber) {
    ratioSelecter.value = goalSelector.valueAsNumber;
    setInnerHTMLValue(
      "#ratio-number",
      `${ratioSelecter.valueAsNumber} x ${ratioSelecter.valueAsNumber}`
    );
  }
  setInnerHTMLValue("#goal-number", goalSelector.valueAsNumber);
});
