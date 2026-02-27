let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
let clearBtn = document.getElementById("clear");
let equalsBtn = document.getElementById("equals");
let toggleBtn = document.getElementById("themeToggle");


if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "Dark Mode";
} else {
    toggleBtn.textContent = "Light Mode";
}

clearBtn.addEventListener("click", () => {
    display.value = "";
});

equalsBtn.addEventListener("click", () => {
    try {
        const expression = display.value;
        const result = eval(expression);

        animateResult(result);
        addToHistory(expression, result);

    } catch {
        display.value = "Error";
    }
});

let historyList = document.getElementById("historyList");
function addToHistory(expression, result) {

    let li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;

    historyList.prepend(li);
}

function animateResult(finalValue) {
    let startTime = null;
    const duration =350;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;

        let progress = currentTime - startTime;
        let percent = Math.min(progress / duration, 1);
        let currentValue = percent * finalValue;

        display.value = Number(currentValue.toFixed(2));
        if (percent < 1) {
            requestAnimationFrame(animate);
        } else {
            display.value = finalValue;
        }
    }

    requestAnimationFrame(animate);
}


toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "Light Mode";
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        animateToDisplay(button, value);
    });
});

function animateToDisplay(button, value) {

    const displayRect = display.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const flyingNumber = document.createElement("span");
    flyingNumber.textContent = value;

    flyingNumber.style.position = "fixed";   
    flyingNumber.style.left = buttonRect.left + buttonRect.width / 2 + "px";
    flyingNumber.style.top = buttonRect.top + buttonRect.height / 2 + "px";
    flyingNumber.style.transform = "translate(-50%, -50%)";
    flyingNumber.style.fontSize = "20px";
    flyingNumber.style.fontWeight = "bold";
    flyingNumber.style.color = "orange";
    flyingNumber.style.transition = "all 0.5s ease";
    flyingNumber.style.pointerEvents = "none";

    document.body.appendChild(flyingNumber);

    setTimeout(() => {
        flyingNumber.style.left = displayRect.left + displayRect.width - 30 + "px";
        flyingNumber.style.top = displayRect.top + displayRect.height / 2 + "px";
        flyingNumber.style.opacity = "0";
        flyingNumber.style.transform = "translate(-50%, -50%) scale(0.5)";
    }, 10);

    setTimeout(() => {
        flyingNumber.remove();
        display.value += value;
    }, 500);
}

let historyPanel = document.getElementById("historyPanel");
let historyButton = document.getElementById("historyButton");
let closeHistory = document.getElementById("closeHistory");

historyButton.addEventListener("click", () => {
    historyPanel.classList.add("show");
});
closeHistory.addEventListener("click", () => {
    historyPanel.classList.remove("show");
});


var i = 0;
var txt = 'Calculator';

function typeWriter() {
    if (i < txt.length) {
    document.querySelector("#title").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

    typeWriter();


   