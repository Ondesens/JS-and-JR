function calculate(str) {

    let expressionParts = str.split(/([+\-*/])/);

    for (let i = 1; i < expressionParts.length; i += 2) {

        if (expressionParts[i] === '*' || expressionParts[i] === '/') {

            const left_num = Number(expressionParts[i - 1]);
            const right_num = Number(expressionParts[i + 1]);

            let result;

            if (expressionParts[i] === '*') {
                result = left_num * right_num;
            } else {
                if (right_num === 0) return "Деление на 0";
                result = left_num / right_num;
            }

            expressionParts.splice(i - 1, 3, result.toString());
            i -= 2;
        }
    }

    let result = Number(expressionParts[0]);

    for (let i = 1; i < expressionParts.length; i += 2) {

        const operator = expressionParts[i];
        const number = Number(expressionParts[i + 1]);

        if (operator === '+') result += number;
        if (operator === '-') result -= number;
    }

    return result;
}


const buttons = document.querySelectorAll('.calculator_key button[data-value]');
const input = document.querySelector('.calculator_input');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const equal = document.querySelector('.equal');
const ans = document.querySelector('.ans');
const open = document.getElementById("openHistory");
const modal = document.getElementById("historyModal");
const close = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");

let lastResult = "";
let historyData = [];


buttons.forEach(btn => {
    btn.addEventListener('click', () => {

        const value = btn.dataset.value;

        // запрет двух операторов подряд
        if (/[+\-*/]$/.test(input.value) && /[+\-*/]/.test(value)) return;

        // запрет двух точек подряд
        if (value === "." && input.value.endsWith(".")) return;

        // нельзя начинать с + * /
        if (input.value === "" && /[+*/]/.test(value)) return;

        input.value += value;
    });
});


ans.addEventListener('click', () => {
    input.value += lastResult;
});


clear.addEventListener('click', () => {
    input.value = "";
});


del.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
});


equal.addEventListener('click', () => {

    if (!input.value) return;

    const expression = input.value;
    const result = calculate(expression);

    lastResult = result;
    input.value = result;


    historyData.unshift(`${expression} = ${result}`);

});

open.addEventListener("click", () => {
    History();
    modal.style.display = "block";
});

close.addEventListener("click", () => {
    modal.style.display = "none";
});

function History() {
    if (historyData.length === 0) {
        historyList.innerHTML = "<p>Пока пусто</p>";
        return;
    }
    historyList.innerHTML = historyData.map(h => `<p>${h}</p>`).join("");
}