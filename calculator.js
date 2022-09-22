// Object for holding global values as well as functions for interacting with those values
const CALCULATOR = {
    display: "0",
    startAgain: true,
    runningTotal: null,
    operator: null,
    checkDecimal: function(){ // function for checking for the presence of a specific character
        const index = this.display.indexOf(".");
        if(index === -1){
            return true;
        } else {
            return false;
        }
    },
};

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => button.addEventListener('click', handleClick));

const displayDiv = document.querySelector('.numbers');

function handleClick(e){
    const target = e.target;
    const key = target.innerText;
    console.log(`You clicked ${key}`);
    switch (key) {
        case "C":
            clear();
            break;
        case "+/-":    
            break;
        case "%":
            break;
        case "/":
            break;
        case "7":
            updateDisplay(key)
            break;
        case "8":
            updateDisplay(key)
            break;         
        case "9":
            updateDisplay(key)
            break;     
        case "*":
            handleOperator('*');
            break;     
        case "4":
            updateDisplay(key)
            break;         
        case "5":
            updateDisplay(key)
            break;             
        case "6":
            updateDisplay(key)
            break;     
        case "-":
            break;     
        case "1":
            updateDisplay(key)
            break;     
        case "2":
            updateDisplay(key)
            break;         
        case "3":
            updateDisplay(key)
            break;             
        case "+":
            break;     
        case "0":
            updateDisplay(key)
            break;         
        case ".":
            if(CALCULATOR.checkDecimal()){
                updateDisplay(key)
            }
            break;             
        case "=":
            break;             
        default:
            break;
    }
};

function clear(){
    CALCULATOR.display = "0";
    CALCULATOR.operator = null;
    CALCULATOR.runningTotal = null;
    CALCULATOR.startAgain = true;
    displayDiv.innerText = "0";
}

function updateDisplay(char){
    if(char === "."){
        CALCULATOR.display += char;
    } else if(CALCULATOR.startAgain){
        CALCULATOR.display = char;
        CALCULATOR.startAgain = false; 
    } else {
        CALCULATOR.display += char;
    }
    displayDiv.innerText = CALCULATOR.display;
}

function handleOperator(operator){
    const isInt = CALCULATOR.checkDecimal();
    let value = 0;
    if(isInt){
        value = parseInt(CALCULATOR.display);
    } else {
        value = parseFloat(CALCULATOR.display);
    }

    if(CALCULATOR.runningTotal === null){
        CALCULATOR.runningTotal = value;
        
    } else {
        CALCULATOR.runningTotal = operate(CALCULATOR.runningTotal, value, operator);
    }
    CALCULATOR.operator = operator;
    CALCULATOR.display = CALCULATOR.runningTotal;
    CALCULATOR.startAgain = true;
    displayDiv.innerText = CALCULATOR.display;
}

function operate(x, y, operator){
    switch (operator) {
        case "*":
            return x * y;
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "/":
            if (y = 0){
                return "Error";
            } else {
                return x / y;
            }
        default:
            break;
    }
}
