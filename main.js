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
  //если не число, разрешать работать с полученным результатом, иначе выводим новое значение
  const tmp = /\D/.test(item);
  if (!flag && tmp) {
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
    index === 0 ? `${num * -1}` : `${input.value.slice(0, index)}${num * -1}`;
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
  let result = calculate(input.value);
  labelSolution.innerText =
    result == "Infinity"
      ? "Делить на ноль нельзя!"
      : result == "Error"
      ? "Неправильное выражение!"
      : input.value + "=";
  labelSolution.style.visibility = "visible";
  input.value =
    result == "Infinity" || result == "Error"
      ? input.value
      : Math.round(result * 1000) / 1000;
  flag = false;
}
function calculate(str) {
  const arr = str.match(/(\-?\d+\.?(\d)*|([-+*/]?))/g);
  //проверяем input.value на корректность
  let err = test(arr, str);
  if (err) return "Error";
  let newValue;
  for (let i = 0; i < arr.length - 1; ) {
    newValue =
      i === 0 ? +arr[i] : getCurrentValue(+newValue, arr[i], arr[i + 1]);
    i = /\-?\d+\.?(\d)*/.test(arr[i]) ? (i += 1) : (i += 2);
  }
  return newValue;
}
function getCurrentValue(num1, op, num2) {
  if (!["+", "-", "/", "*"].includes(op)) {
    return num1 + +op;
  }
  switch (op) {
    case "+":
      return num1 + +num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      break;
  }
}
function test(arr, str) {
  let err = 0;
  const lastCharNotNumber = /\D/.test(str[str.length - 1]);
  if ([...arr].join("").length !== str.length) {
    err = 1;
  }
  if (lastCharNotNumber) {
    err = 2;
  }
  return err;
}
function getEventKey(e) {
  let itemCorrect = /^(\d+|([-*+/\.])?)$/g.test(e.key); // числа или матем.знаки
  if (itemCorrect) {
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
