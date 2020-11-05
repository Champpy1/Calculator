const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deletesButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const currentScreenTextElement = document.querySelector
('[data-operant-current]');
const previousScreenTextElement = document.querySelector
('[data-operant-previous]');

class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement)
    {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    clear() 
    {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() 
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) 
    {
        if(number === '.' && this.currentOperand.includes('.'))
        return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    flushOperator(operation) 
    {
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() 
    {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(previous) || isNaN(current)) return;
        switch(this.operation){
            case "+":
                computation = previous + current;
            break;
            case "-":
                computation = previous - current;
            break;
            case "x":
                computation = previous * current;
            break;
            case "÷":
                computation = previous / current;
            break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay()
    {
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }
}


const cal = new Calculator (
    currentScreenTextElement,
    previousScreenTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        cal.appendNumber(button.innerText);
        cal.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        cal.flushOperator(button.innerText);
        cal.updateDisplay();
    });
})

equalsButton.addEventListener("click" ,() => {
    cal.compute();
    cal.updateDisplay();
});

allClearButton.addEventListener("click" ,() => {
    cal.clear();
    cal.updateDisplay();
});

deletesButton.addEventListener("click" ,() => {
    cal.delete();
    cal.updateDisplay();
});











