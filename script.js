const numberButtons = document.querySelectorAll('[data-number]');
const opreationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton =document.querySelector('[data-all-clear]');

const currentScreen = document.querySelector('[data-operant-current]');

class Calculator {
    constructor(currentScreen){
        this.currentScreen = currentScreen;
        this.clear();
    }
    clear(){
        this.current = "";
        this.operaion = null;
    }
    delete(){
        this.current = this.current.tosting().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.'&& this.current.include('.'))
        return;
        this.current = this.current.tosting() + number.tosting();
    }
    flushOperator(operation){
        if(this.current !== ""){
            this.compute();
        }
        this.operation = operation;
    }
    compute(){
        let computation;
        const previous = parseFloat(this.current);
        const current1 = parseFloat(this.current);

        if(isNaN(previous) || isNaN(current1))return;
        switch(this.operaion){
            case "+":
                computation = previous + current1;
            break;
            case "-":
                computation = previous - current1;
            break;
            case "*":
                computation = previous * current1;
            break;
            case "÷":
                computation = previous / current1;
            break;
            default:
                return;
        }
        this.current = computation;
        this.operaion = undefined;
    }
    updateDisplay(){
        this.currentScreen.innerText = this.current;
    }
}

const calculator = new Calculator{
    currentScreen
};
numberButtons.forEach((button)=>{
    button.addEventListener("click", () =>){
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    }
})
