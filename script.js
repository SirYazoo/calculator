function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Can't divide by 0!";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error: Unknown operator";
    }
}

const display = document.getElementById('display');
let displayValue = '';
let firstNumber = null;
let operator = null;
let secondNumber = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
    display.textContent = value;
}

function clear() {
    displayValue = '';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    shouldResetDisplay = false;
    updateDisplay('0');
}

function inputDigit(digit) {
    if (shouldResetDisplay) {
        displayValue = '';
        shouldResetDisplay = false;
    }

    displayValue += digit;
    updateDisplay(displayValue);
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        secondNumber = displayValue;
        const result = operate(operator, firstNumber, secondNumber);
        updateDisplay(result);
        firstNumber = result;
    } else {
        firstNumber = display.textContent;
    }

    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (firstNumber === null || operator === null || displayValue === '') return;

    secondNumber = displayValue;
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    operator = null;
    shouldResetDisplay = true;
}

document.querySelectorAll('.buttons button').forEach(button => {
    const value = button.textContent;

    if (!isNaN(value)) {
        button.addEventListener('click', () => inputDigit(value));
    } else if (value === 'C') {
        button.addEventListener('click', clear);
    } else if (value === '=') {
        button.addEventListener('click', calculate);
    } else {
        button.addEventListener('click', () => setOperator(value));
    }
});
