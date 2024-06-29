const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            resetCalculator();
        } else if (value === 'DEL') {
            deleteLastDigit();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            setOperator(value);
        } else {
            inputDigit(value);
        }
    });
});

function resetCalculator() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    display.value = '0';
}

function deleteLastDigit() {
    if (shouldResetDisplay) return;

    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || '0';
}

function inputDigit(digit) {
    if (shouldResetDisplay) {
        currentInput = digit;
        shouldResetDisplay = false;
    } else {
        currentInput = display.value === '0' ? digit : display.value + digit;
    }
    display.value = currentInput;
}

function setOperator(nextOperator) {
    if (firstOperand === null && !isNaN(parseFloat(currentInput))) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        calculate();
    }
    operator = nextOperator;
    shouldResetDisplay = true;
}

function calculate() {
    if (firstOperand === null || operator === null || shouldResetDisplay) return;

    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        case '%':
            result = firstOperand % secondOperand;
            break;
    }

    display.value = String(result);
    firstOperand = result;
    operator = null;
    shouldResetDisplay = true;
}