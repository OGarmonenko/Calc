const buttonsNumber = document.querySelectorAll(".button_item");
const buttonsOperator = document.querySelectorAll(".button_operator");
const input = document.querySelector(".input_calc");
const labelSolution = document.querySelector(".solution_calc");
let flag = true;

for (let buttonNumber of buttonsNumber) {
  buttonNumber.addEventListener("click", setInputValue);
}
for (let buttonOperator of buttonsOperator) {
  buttonOperator.addEventListener("click", setInputValue);
}
document.querySelector(".button_eval").addEventListener("click", getSolution);
document.querySelector(".button_sign").addEventListener("click", changeSign);
document.querySelector(".button_C").addEventListener("click", deleteAll);
document.querySelector(".button_CE").addEventListener("click", deleteEnd);
document.addEventListener("keydown", getEventKey);

function setInputValue(e) {
  labelSolution.style.visibility = "hidden";
  let tmp = e.target.value;
  flag = setInput(tmp, flag);
}
function setInput(item, flag) {
  console.log("item", item);
  if (!flag && /\D/.test(item)) {
    flag = true;
  }
  input.value = flag ? input.value + item : "" + item;
  return true;
}
function changeSign() {
  const tmp = input.value.match(/\d+\.?(\d)*/g);
  const num = tmp[tmp.length - 1];
  const index = input.value.lastIndexOf(`${num}`);
  const newValue =
    index === 0 ? `${num * -1}` : input.value.slice(0, index) + `(${num * -1})`;
  input.value = newValue;
}
function deleteEnd() {
  labelSolution.style.visibility = "hidden";
  let newValue = input.value.slice(0, -1);
  input.value = newValue;
}
function deleteAll() {
  labelSolution.style.visibility = "hidden";
  input.value = "";
}
function getSolution() {
  let result = eval(input.value);
  labelSolution.innerText =
    result == "Infinity" ? "Делить на ноль нельзя!" : input.value + "=";
  labelSolution.style.visibility = "visible";
  input.value =
    result == "Infinity" ? input.value : Math.round(result * 1000) / 1000;
  flag = false;
}
function getEventKey(e) {
  if (/^(\d+|([-*+/\.])?)$/g.test(e.key)) {
    labelSolution.style.visibility = "hidden";
    let tmp = e.key;
    flag = setInput(tmp, flag);
  } else if (e.key === "Enter" || e.key === "=") {
    getSolution();
  } else if (e.key === "Backspace") {
    deleteEnd();
  } else if (e.key === "Escape") {
    deleteAll();
  }
}
