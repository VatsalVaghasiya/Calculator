let currValue = ""
let prevValue = ""
let operatorValue = ""
let total = 0
let inputData = ""
let storage = JSON.parse(localStorage.getItem("History")) || []
let storeCurr = ""
let history = ""

function numberBtn(number) {
    if (!currValue.includes(".")) {
        currValue += number
    }
    else if (number != ".") {
        currValue += number
    }

    document.getElementById('calculation').value = `${prevValue} ${operatorValue} ${currValue}`
    inputData = document.getElementById('calculation').value
    console.log(inputData);

}

function operatorBtn(operator) {
    operatorValue = operator
    if (inputData.includes("+", "-", "*", "/") && operatorValue == "%") {
        percentageCalculation()
    }
    else if (operatorValue == "%") {
        if (currValue != ""){
            prevValue = currValue
        }
        calculate()
    }
    else {
        if(prevValue !== "" && currValue === ""){
            document.getElementById('calculation').value = `${prevValue} ${operatorValue}`
        }
        else if (prevValue !== '') {
            if (currValue != "") {
                calculate();
            }
        }
        
        if (total == 0) {
            prevValue = currValue;
        }

        currValue = ""
        document.getElementById('calculation').value = `${prevValue} ${operatorValue}`
    }
}

function percentageCalculation() {
    let inputDataValue = [...inputData]
    let firstIndex = inputDataValue.indexOf(" ")
    let secondIndex = inputDataValue.lastIndexOf(" ")
    let slicedPrev = inputDataValue.slice(0, firstIndex).join("")
    let slicedCurr = inputDataValue.slice(secondIndex + 1).join("")

    let newOperatorValue = inputDataValue.slice(firstIndex + 1, secondIndex).toString()
    console.log(newOperatorValue);

    if (newOperatorValue == "+") {
        total = parseFloat(slicedPrev) + parseFloat(slicedCurr / 100 * slicedPrev)
    }
    if (newOperatorValue == "-") {
        total = parseFloat(slicedPrev) - parseFloat(slicedCurr / 100 * slicedPrev)
    }
    if (newOperatorValue == "*") {
        total = parseFloat(slicedPrev) * parseFloat(slicedCurr / 100)
    }
    if (newOperatorValue == "/") {
        total = parseFloat(slicedPrev) / parseFloat(slicedCurr / 100)
    }
    const fullCalculation = `${prevValue} ${newOperatorValue} ${currValue}${operatorValue} = ${total}`
    storage.push(fullCalculation)
    prevValue = total
    currValue = ""
    inputData= ""
    document.getElementById('calculation').value = total
    localStorage.setItem("History", JSON.stringify(storage))
    history = storage.map(item => `<div> ${item} </div>`).join("")
    document.getElementById("history").innerHTML = history
}

function calculate() {
    if (currValue === "") {
        if (operatorValue == "+" || operatorValue == "-" || operatorValue == "*" || operatorValue == "/") {
            storeCurr = prevValue
        }
        currValue = storeCurr
    }
    if (prevValue == "" && operatorValue != "" && currValue != ""){
        prevValue = 0
    }
    else if (document.getElementById('calculation').value == ""){
        prevValue = 0
    }

    if (operatorValue == "+") {
        total = parseFloat(prevValue) + parseFloat(currValue)
    }
    if (operatorValue == "-") {
        total = parseFloat(prevValue - currValue)
    }
    if (operatorValue == "x") {
        total = parseFloat(prevValue * currValue)
    }
    if (operatorValue == "/") {
        total = parseFloat(prevValue / currValue)
    }
    if (operatorValue == "%") {
        total = parseFloat(prevValue / 100);
    }
    if (operatorValue == "") {
        total = currValue
    }

    if (prevValue == "" && currValue == ""){
        storage.push("0 =")
    }
    else if(operatorValue == "%"){
        const percentCalculation = `${prevValue} ${operatorValue} = ${total}`
        storage.push(percentCalculation)
    }
    else{
        const fullCalculation = `${prevValue} ${operatorValue} ${currValue} = ${total}`
        storage.push(fullCalculation)
    }
    storeCurr = currValue
    prevValue = total
    currValue = ""
    inputData = ""
    document.getElementById('calculation').value = total
    localStorage.setItem("History", JSON.stringify(storage))
    history = storage.map(item => `<div> ${item} </div>`).join("")
    document.getElementById("history").innerHTML = history

}

function clearInput() {
    document.getElementById('calculation').value = ""
    prevValue = ""
    currValue = ""
    operatorValue = ""
    total = 0
    storeCurr = ""
}

function clearEntry() {
    if (document.getElementById('calculation').value == `${prevValue}`) {
        document.getElementById('calculation').value = ""
        prevValue = 0
    }
    else {
        document.getElementById('calculation').value = `${prevValue} ${operatorValue}`
        currValue = ""
    }
}

function remove() {
    let input = currValue
    document.getElementById("calculation").value = input.slice(0, -1)
    currValue = document.getElementById("calculation").value
    document.getElementById('calculation').value = `${prevValue} ${operatorValue} ${currValue}`
    console.log(input);
}

function clearHistory(){
    localStorage.clear()
    storage = []
    document.getElementById("history").innerHTML = ""
}
