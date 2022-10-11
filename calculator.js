// Object for holding global values as well as functions for interacting with those values
const CALCULATOR = {
    display: "0", //Property for holding the value of what is or should be displayed on "screen"
    startAgain: true, //Property for tracking when the calculator display should overwrite what is there vs add onto it 
    runningTotal: null,//Property for tracking the running total as the user continues to add, subtract, multiply, etc. 
    operator: null,//Property for holding the next operator (*, -, +, etc.) to be used
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

const modeBtn = document.querySelector('.mode');
modeBtn.addEventListener('click', toggleMode);

const displayDiv = document.querySelector('.numbers');

//function to be called when a calculator button is clicked
function handleClick(e){
    const target = e.target;
    const key = target.innerText;

    switch (key) {
        case "C":
            clear();
            break;
        case "+/-":
            toggleNegative();    
            break;
        case "%":
            percentage();
            break;
        case "/":
            if(changeActive("/", target)){
                break;
            }
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
            if(changeActive("*", target)){
                break;
            }
            handleOperator("*");
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
            if(changeActive("-", target)){
                break;
            }
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
            if(changeActive("+", target)){
                break;
            }
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
            if(CALCULATOR.runningTotal !== null){
                const value = convertToNumber();
                clear(`${operate(CALCULATOR.runningTotal, value, CALCULATOR.operator)}`);
            }
            break;             
        default:
            break;
    }
};

//Function for clearing the calculator when the clear button is clicked
function clear(message = "0"){
    deactivate();
    CALCULATOR.operator = null;
    CALCULATOR.runningTotal = null;
    CALCULATOR.startAgain = true;
    changeDisplay(message);//If a message has been passed (such as the results after hitting equal) display that on screen
}

//Function for updating the display; adding to what is already on screen vs replacing it
function updateDisplay(char){
    deactivate(); //If an operator button is active, deactivate it. This way, once you're done entering the next number, you can press the same operator again
    if(CALCULATOR.display.length === 9){
        return;
    }

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

//Function for changing the display; replacing what is on screen vs adding to it
function changeDisplay(value){
    CALCULATOR.display = value;
    displayDiv.innerText = CALCULATOR.display;
}

//Function for converting what is onscreen to a number so functions and evaluations needing actual number values can be performed
function convertToNumber(){
    const isInt = CALCULATOR.checkDecimal();
    let value = 0;
    if(isInt){
        value = parseInt(CALCULATOR.display);
    } else {
        value = parseFloat(CALCULATOR.display);
    }

    return value;
}

//Function to be executed an operator button on the calculator is clicked
function handleOperator(operator){
    const value = convertToNumber();

    if(CALCULATOR.runningTotal === null){
        CALCULATOR.runningTotal = value;
    } else {
        //Use the runningTotal, the current value displayed and the PREVIOUSLY saved operator to update running total
        CALCULATOR.runningTotal = operate(CALCULATOR.runningTotal, value, CALCULATOR.operator);
    }
    
    if(CALCULATOR.runningTotal === "Error"){
        clear("Error");
        return;
    }
    //Update the operator property so that the next time this is run it will use the new operator instead
    CALCULATOR.operator = operator;
    CALCULATOR.startAgain = true;
    changeDisplay(CALCULATOR.runningTotal);
}

//Function for actually doing the math
function operate(x, y, operator){
    console.log('operating!')

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

//Function for when the percentage button is pressed; converts current onscreen value to a percentage
function percentage(){
    const value = convertToNumber();
    changeDisplay(`${value / 100}`); // String interpolation is needed so indexOf can be used when checkDecimal() is called
}

//Function for when the positive/negatitve button is pressed; toggles onscreen value to negative or positve
function toggleNegative(){
    let value = CALCULATOR.display;
    if(value === "0"){
        return;
    }else if(value.indexOf('-') === -1){
        changeDisplay(`-${CALCULATOR.display}`);
    } else {
        changeDisplay(`${CALCULATOR.display.slice(1)}`);
    }
}

//Function for removing the active class from a calculator button
function deactivate(){
    const active = document.querySelector('.active');
    if (active){
        active.classList.remove('active');
    }
}

//Function that adds the active class to a button (to change it's CSS appearance) and if another button is active, make it inactive
function changeActive(operator, target){
    const active = document.querySelector('.active');
    if(active){
        active.classList.remove('active');
        CALCULATOR.operator = operator;
        console.log('Changing Active!')
        target.classList.add('active');
        return true;
    }
    target.classList.add('active');
    return false; 
}

//Function for toggling between light and dark display modes
function toggleMode(){
    document.body.classList.toggle('dark-body');
    modeBtn.classList.toggle('light-mode');
    modeBtn.classList.toggle('dark-mode');

    const buttons = document.querySelectorAll('.num-btn');
    for (const button of buttons) {
        button.classList.toggle('light-btn');
        button.classList.toggle('dark-btn');
    }

    const screen = document.querySelector('.screen');
    screen.classList.toggle('light-screen');
    screen.classList.toggle('dark-screen');
}