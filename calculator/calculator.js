const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const fourBasicOperations = ["+", "-", "×", "÷"];

const showDisplayText = (input) => {
  const display = document.querySelector("#input");
  const lastChar = display.innerText.slice(-1);

  if (
    numbers.includes(input) ||
    (fourBasicOperations.includes(input) && numbers.includes(lastChar))
  ) {
    display.innerText += input;
  }
};

const onclickNumberButton = (e) => {
  const clickedNumberValue = e.target.innerText;
  if (numbers.includes(clickedNumberValue)) showDisplayText(clickedNumberValue);
};

const onclickOperationButton = (e) => {
  const clickedOperationValue = e.target.innerText;
  if (fourBasicOperations.includes(clickedOperationValue)) {
    showDisplayText(clickedOperationValue);
  }
};

const clearButton = () => {
  const display = document.querySelector("#input");
  display.innerText = ""; // 입력창 초기화
};

const deleteButton = () => {
  const display = document.querySelector("#input");
  display.innerText = display.innerText.slice(0, -1);
};

const multiplyDividePriority = (formula) => {
  let newFormula = [];
  let i = 0;

  while (i < formula.length) {
    if (formula[i] === "×" || formula[i] === "÷") {
      let left = parseFloat(newFormula.pop());
      let right = parseFloat(formula[i + 1]);
      let result;

      if (formula[i] === "×") {
        result = left * right;
      } else if (formula[i] === "÷") {
        result = left / right;
      }

      newFormula.push(result);
      i += 2;
    } else {
      newFormula.push(formula[i]);
      i++;
    }
  }

  return newFormula;
};

const addMinusPriority = (formula) => {
  let result = parseFloat(formula[0]);

  for (let i = 1; i < formula.length; i += 2) {
    let operator = formula[i];
    let nextNumber = parseFloat(formula[i + 1]);

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "-") {
      result -= nextNumber;
    }
  }
  return result;
};

const calculate = (expression) => {
  let formula = multiplyDividePriority(expression);
  let result = addMinusPriority(formula);
  return result;
};

const parseExpression = (expression) => {
  return expression.split(/([+\-×÷])/).filter((item) => item.trim() !== "");
};

const equalButton = () => {
  const display = document.querySelector("#input");
  const answer = document.querySelector("#total");
  let expression = display.innerText;

  if (!expression) return;

  let formula = parseExpression(expression);
  let result = calculate(formula);

  answer.innerText = result;
};

document.querySelector(".equal-button").addEventListener("click", equalButton);
document.querySelectorAll(".number-button").forEach((button) => {
  button.addEventListener("click", onclickNumberButton);
});
document.querySelector(".ac-button").addEventListener("click", clearButton);
document.querySelectorAll(".four-basic-operations").forEach((button) => {
  button.addEventListener("click", onclickOperationButton);
});

document
  .querySelector(".delete-button")
  .addEventListener("click", deleteButton);

document.addEventListener("keydown", (event) => {
  if (numbers.includes(event.key) || fourBasicOperations.includes(event.key)) {
    showDisplayText(event.key);
  }
});
