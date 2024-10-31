let display = document.getElementById("display")
let stored = document.getElementById("stored");
let buttons = document.querySelectorAll("button");
const MAX_LENGTH = 10;

let floatDotAdded = false;
let canOverwrite = true;
let isCalculated = false;
let displayValue = "";

let result = 0;
let operationType = "";


//God forgive me for this bullshit below 

window.addEventListener("DOMContentLoaded", (event)=>{
    display.value = displayValue;
    stored.value = "";
    console.log(buttons);
})

function appendToDisplay(input){
    if(floatDotAdded && input === ".") return;
    if(!canOverwrite){
        clearDisplay(false);
        canOverwrite = true;
    }   
    if(isCalculated){
        clearDisplay(true);
        canOverwrite = true;
        isCalculated = false;
    }
    if(displayValue.length < MAX_LENGTH){
        if (!floatDotAdded && input === ".")floatDotAdded = true;
        displayValue += input;
        display.value = displayValue;
    }
    
}
function changeOperation(input){
    if(stored.value === "" && displayValue ==="")return;
    if(stored.value ==="" && displayValue !== ""){
        result = Number(display.value);
        stored.value += displayValue;
    }else{
        storeToResult();
    }
    operationType = input;
    
    canOverwrite = false;
    
    if(isCalculated){
        
        stored.value = String(result) + input;
    }
    isCalculated = false;

    let storedValue = stored.value;
    let lastChar = storedValue.charAt(storedValue.length -1);
    console.log(`last character: ${lastChar}`)
    if(lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/"){
        
        storedValue = storedValue.substring(0, storedValue.length -1);
        storedValue+= input;
        stored.value = storedValue;
    }else{
        stored.value += input;
        
    }
    console.log(operationType);
}
function calculate(nums, operators){
    if(operationType ===""){
        result = Number(display.value);
        stored.value = "";
    }
    storeToResult();
   
    isCalculated = true;
    canOverwrite = false;
    
    operationType = "";
    console.log(`result after: ${result}`);
    displayValue = String(result);
    if(displayValue.length > 10) displayValue = displayValue.slice(0, 10);
    display.value = displayValue;
}
function clearDisplay(force){
    floatDotAdded = false;
    displayValue = "";
    display.value = displayValue;
    if(force){
        stored.value = "";
        operationType = "";
        result = 0;

    }
}
function storeToResult(){
    console.log (`current operation: ${operationType}`);
    console.log(`current result ${result}, displayValue: ${displayValue}`)
    if(operationType === "+") result += Number(displayValue);
    if(operationType === "-") result -= Number(displayValue);
    if(operationType === "*") result *= Number(displayValue);
    if(operationType === "/") result /= Number(displayValue);
    stored.value += displayValue;
    displayValue = "";
    display.value = displayValue;

    console.log(`result after: ${result}`);
}
function CE(){
    if(displayValue.length>0){
        if(displayValue.charAt(displayValue.length-1) === "." ) floatDotAdded = false;
        displayValue = displayValue.substring(0, displayValue.length -1);
        display.value = displayValue;
    }
}

document.addEventListener("keypress", event=>{
    if(event.key === "0") {animateOnClick(13, "keyPressed", 100); appendToDisplay("0")};
    if(event.key === "1") {animateOnClick(9, "keyPressed", 100); appendToDisplay("1")};
    if(event.key === "2") {animateOnClick(10, "keyPressed", 100); appendToDisplay("2")};
    if(event.key === "3") {animateOnClick(11, "keyPressed", 100); appendToDisplay("3")};
    if(event.key === "4") {animateOnClick(5, "keyPressed", 100); appendToDisplay("4")};
    if(event.key === "5") {animateOnClick(6, "keyPressed", 100); appendToDisplay("5")};
    if(event.key === "6") {animateOnClick(7, "keyPressed", 100); appendToDisplay("6")};
    if(event.key === "7") {animateOnClick(1, "keyPressed", 100); appendToDisplay("7")};
    if(event.key === "8") {animateOnClick(2, "keyPressed", 100); appendToDisplay("8")};
    if(event.key === "9") {animateOnClick(3, "keyPressed", 100); appendToDisplay("9")};
    if(event.key === "+") {animateOnClick(0, "keyPressed-func", 100); changeOperation("+")};
    if(event.key === "-") {animateOnClick(4, "keyPressed-func", 100); changeOperation("-")};
    if(event.key === "*") {animateOnClick(8, "keyPressed-func", 100); changeOperation("*")};
    if(event.key === "/") {animateOnClick(12, "keyPressed-func", 100); changeOperation("/")};
})
document.addEventListener("keydown", event=>{
    if(event.key === "Enter") {
        animateOnClick(15, "keyPressed-func", 100);
        calculate();
    }
    if(event.key === "Backspace"){
        animateOnClick(18, "keyPressed-func",100);
        CE();     
    }
    if(event.key === "Escape") {
        animateOnClick(17, "keyPressed-func", 100);
        clearDisplay(true);
    }
    console.log(event.key);

})

function animateOnClick(buttonID, className, timeout){
    buttons[buttonID].classList.add(className);
    console.log("ENTER PRESSED");
    setTimeout(()=>{buttons[buttonID].classList.remove(className); console.log("ENTER FINISHED")}, timeout);
}