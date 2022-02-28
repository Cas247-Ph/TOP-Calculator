const display1 = document.querySelector(".history");
const display2 = document.querySelector(".result");
const numpad = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operation");
const equals = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const backSpace = document.querySelector(".backspace");

let display1num = '';
let display2num = '';
let displayresult = null;
let lastOperation = '';
let dotExist = false;
let newNum = false;
let lastNum = '';
let storeNum = '';
let oneOperator = '';
//keypad takes nums while clearing the first set of numbers
//after an operator is added.
numpad.forEach(number =>{
    number.addEventListener('click',(e)=>{
        if(newNum){
            display2.innerText = '';
            display2num = '';
            newNum = false;
        }
        if(e.target.innerText === '.' && !dotExist){
            dotExist = true;
        }else if(e.target.innerText === '.' && dotExist){
            return;
        }
        display2num += e.target.innerText;
        display2.innerText = display2num;
    })
})

//takes in an operator while making sure there is a first set of numbers
//also operates the previous result with new display.
operators.forEach(operations =>{
    operations.addEventListener('click',(e)=>{
        if(!display2num) return;
        dotExist = false;
        const operationName = e.target.innerText;
        if(display1num && display2num && lastOperation){  
            operate();
        }else{
            displayresult = parseFloat(display2num)
        }
        clearDisplay(operationName);
        lastOperation = operationName;
        console.log(display1num +'/'+ display2num+'/'+displayresult)
    })
})
//gives record of operations.
function clearDisplay(name = ''){
    display1num += display2num+ '' + name + '';
    display1.innerText = display1num;
    display2.innerText = displayresult;
    newNum = true;
    display2num='';
}

//operational logic
function operate(){
    if(lastOperation === 'x'){
        displayresult = parseFloat(displayresult) * parseFloat(display2num);
    } else if(lastOperation === '+'){
        displayresult = parseFloat(displayresult) + parseFloat(display2num);
    } else if(lastOperation === '-'){
        displayresult = parseFloat(displayresult) - parseFloat(display2num);
    } else if(lastOperation === '/'){
        displayresult = parseFloat(displayresult) / parseFloat(display2num);
    } else if(lastOperation === '%'){
        displayresult = parseFloat(displayresult) % parseFloat(display2num);
    }
}

//operates 2 variables plus displays an equal sign.
equals.addEventListener('click',(e)=>{
    if(!display1num || !display2num) return;
    dotExist = false;
    operate();
    clearDisplay();
    display1.innerText += '=';
    display2.innerText = displayresult;
    display2num = displayresult;
    display1num = '';
})

clearAll.addEventListener('click',(e)=>{
    display1num = '';
    display2num = '';
    display1.innerText = '0';
    display2.innerText = '0';
    displayresult = '';
})

backSpace.addEventListener('click',(e)=>{
    display2.innerText = '';
    display2num = '';
})

window.addEventListener('keydown',(e)=>{
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
        ){
            clickButton(e.key)
    } else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%' 
    ){
        clickOperations(e.key);
    } else if(e.key === '*'){
        clickOperations('x')
    } else if(e.key === 'Enter' || e.key === '='){
        clickEqual();
    }
})

function clickButton(key){
    numpad.forEach(button=>{
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickOperations(key){
    operators.forEach(button=>{
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(key){
    equals.click();
}