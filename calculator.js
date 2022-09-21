// Object for holding global values as well as functions for interacting with those values
const CALCULATOR = {
    display: "",
    x: 0,
    y: 0,
    operator: null,

    getValue: function(){
        return this.display;
    },
    setValue: function(input){
        this.value = input;
    },
    checkValue: function(input){ // function for checking for the presence of a specific character
        const index = this.display.indexOf(input);
        if(index !== -1){
            return true;
        } else {
            return false;
        }
    },
    setX: function(input){
        this.x = input;
    },
    setY: function(input){
        this.y = input;
    },
    setOperator: function(input){
        this.operator = input;
    },
    getX: function(){
        return this.x;
    },
    getY: function(){
        return this.y;
    },
    getOperator: function(){
        return this.operator;
    },
};