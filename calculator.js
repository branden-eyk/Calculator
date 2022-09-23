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
            percentage();
            break;
        case "/":
            handleOperator("/");
            break;
        case "7":
            updateDisplay(key);
            break;
        case "8":
            updateDisplay(key);
            break;         
        case "9":
            updateDisplay(key);
            break;     
        case "*":
            handleOperator('*');
            break;     
        case "4":
            updateDisplay(key);
            break;         
        case "5":
            updateDisplay(key);
            break;             
        case "6":
            updateDisplay(key);
            break;     
        case "-":
            handleOperator("-");
            break;     
        case "1":
            updateDisplay(key);
            break;     
        case "2":
            updateDisplay(key);
            break;         
        case "3":
            updateDisplay(key);
            break;             
        case "+":
            handleOperator("+");
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

function clear(message = "0"){
    CALCULATOR.operator = null;
    CALCULATOR.runningTotal = null;
    CALCULATOR.startAgain = true;
    changeDisplay(message);
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

function changeDisplay(value){
    CALCULATOR.display = value;
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
        //Use the runningTotal, the current value displayed and the PREVIOUSly saved operator to update running total
        CALCULATOR.runningTotal = operate(CALCULATOR.runningTotal, value, CALCULATOR.operator);
    }
    
    if(CALCULATOR.runningTotal === "Error"){
        clear("Error");
        return;
    }

    CALCULATOR.operator = operator;
    CALCULATOR.startAgain = true;
    console.log(`Start again is now ${CALCULATOR.startAgain}`);
    changeDisplay(CALCULATOR.runningTotal);
}

function operate(x, y, operator){
    console.log(`${operator}`);
    switch (operator) {
        case "*":
            return x * y;
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "/":
            if (y === 0){
                return "Error";
            } else {
                return x / y;
            }
        default:
            break;
    }
}

function percentage(){
    const isInt = CALCULATOR.checkDecimal();
    const value = CALCULATOR.display;
    
    if(isInt){
        changeDisplay(`${parseInt(value) / 100}`);
    } else {
        changeDisplay(`${parseFloat(value) / 100}`);
    }
}
