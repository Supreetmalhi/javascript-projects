const Calculator = {
  displayValue: '0',
  firstOperand: null,
  waitSecondOperand: false,
  operator: null
};

function inputDigit(digit) {
  const { displayValue, waitSecondOperand } = Calculator;
  if (waitSecondOperand === true) {
    Calculator.displayValue = digit;
    Calculator.waitSecondOperand = false;
  } else {
    Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (Calculator.waitSecondOperand === true) return;
  if (!Calculator.displayValue.includes(dot)) {
    Calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = Calculator;
  const valueOfInput = parseFloat(displayValue);
  if (operator && Calculator.waitSecondOperand) {
    Calculator.operator = nextOperator;
    return;
  }
  if (firstOperand == null) {
    Calculator.firstOperand = valueOfInput;
  } else if (operator) {
    const valueNow = firstOperand || 0;
    let result = performCalculation[operator](valueNow, valueOfInput);
    result = Number(result).toFixed(9);
    result = (result*1).toString();
    Calculator.displayValue = parseFloat(result);
    Calculator.firstOperand = parseFloat(result);
  }
  Calculator.waitSecondOperand = true;
  Calculator.operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function calculatorReset() {
  Calculator.displayValue = '0';
  Calculator.firstOperand = null;
  Calculator.waitSecondOperand = false;
  Calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = Calculator.displayValue;
}

window.onload = function onLoad() {
  updateDisplay();

  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if(!target.matches('button')) {
      return;
    }
    if(target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
    if(target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
    if(target.classList.contains('all-clear')) {
      calculatorReset();
      updateDisplay();
      return;
    }
    inputDigit(target.value);
    updateDisplay();
  })
}
