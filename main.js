const question = "Ce qui ne se ...... pas se perd !";
const answer = "partage";
let currentAnswer = "";

document.querySelector("#question-text").innerHTML = question;

const slotsContainer = document.querySelector(".answer-slots");
const lettersContainer = document.querySelector("#letters-grid");

targetSlots();
targetLetters();

function targetSlots() {
    slotsContainer.innerHTML = "";
    for (let i = 0; i < answer.length; i++) {
        const slotElement = document.createElement("div");
        slotElement.className = "slot";
        slotElement.dataset.slotIndex = i;
        slotsContainer.appendChild(slotElement);
    }
}

function targetLetters() {
    lettersContainer.innerHTML = "";
    currentAnswer = "";

    const answerLetters = answer.toUpperCase().split("");
    const randomLetters = [];
    const rest = 15 - answer.length;
    for (let i = 0; i < rest; i++) {
        randomLetters.push(getRandomLetter());
    }
    
    const allLetters = [...answerLetters, ...randomLetters];
    allLetters.sort(() => Math.random() - 0.5);

    for (let letter of allLetters) {
        const letterBtn = document.createElement("button");
        letterBtn.className = "letter-btn";
        letterBtn.innerText = letter;
        
        letterBtn.addEventListener("click", function () {
            if (currentAnswer.length >= answer.length) return;
            
            currentAnswer += letter;
            const slotIndex = currentAnswer.length - 1;
            document.querySelector(`[data-slot-index="${slotIndex}"].slot`).innerHTML = letter;
            letterBtn.classList.add("used");
            letterBtn.disabled = true;
            
            checkGameStatus();
        });
        
        lettersContainer.append(letterBtn);
    }
}

function checkGameStatus() {
    if (currentAnswer === answer.toUpperCase()) {
        setTimeout(() => alert("yuhuu Correct answer! ✅🎉"), 300);
    } else if (currentAnswer.length === answer.length) {
        setTimeout(() => alert(" oops Try again!😬⚡ ❌"), 300);
    }
}
slotsContainer.addEventListener("click", function () {
    if (currentAnswer.length > 0) {
        const lastLetter = currentAnswer[currentAnswer.length - 1];
        currentAnswer = currentAnswer.slice(0, -1);
        document.querySelector(`[data-slot-index="${currentAnswer.length}"].slot`).innerHTML = "";
        const buttons = document.querySelectorAll(".letter-btn");
        for (let btn of buttons) {
            if (btn.innerText === lastLetter && btn.classList.contains("used")) {
                btn.classList.remove("used");
                btn.disabled = false;
                break;
            }
        }
    }
});

function getRandomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

window.onload = function() {
  alert("🎉 Best of luck🚀");
};
