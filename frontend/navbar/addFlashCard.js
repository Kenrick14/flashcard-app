import * as req from "../apiConnection.js";

const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const savedMessage = document.getElementById("saved");
const closeButton = document.getElementById("close-btn");
const newCard = document.getElementById("newcard-btn");
const flashcard = document.getElementById("modal");
const otherSubject = document.getElementById("other-sub");

closeButton.addEventListener("click", (() => {
    flashcard.classList.remove("flex");
    flashcard.classList.add("hidden");
    question.value = "";
    answer.value = "";
    errorMessage.classList.add("hidden");
}))


newCard.addEventListener("click", (() => {
    flashcard.classList.remove("hidden");
    flashcard.classList.add("flex");
    question.value = "";
    answer.value = "";
    errorMessage.classList.add("hidden");
}))

cardButton.addEventListener("click", (async () => {
    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();
    let selectedSubject = selectedButton ? selectedButton.textContent : otherSubject.value.trim();

    if (!tempQuestion || !tempAnswer || !selectedSubject) {
        errorMessage.classList.remove("hidden");
        return;
    }
    else {
        await req.createCard(tempQuestion, tempAnswer, selectedSubject);
        console.log("Card saved");
        savedMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        question.value = "";
        answer.value = "";
        otherSubject.value = "";
        resetCard();
    }
}));

function resetCard() {
    document.querySelectorAll("#subjects button").forEach(btn => {
        btn.disabled = false; // Re-enable all buttons
        btn.classList.remove("bg-purple-500");
        btn.classList.add("bg-gray-500");
        btn.classList.remove("opacity-50", "cursor-not-allowed");
    });
    otherSubject.disabled = false;
    otherSubject.classList.remove("opacity-50", "cursor-not-allowed");
    otherSubject.placeholder = "Type your subject here...";
}

const subjects = document.getElementById("subjects");
const subs = ["Math", "English", "History", "Science"];
let selectedButton = null; // Track the currently selected button

subs.forEach(sub => {
    const button = document.createElement("button");
    button.textContent = sub;
    button.classList.add("mb-4", "text-md", "font-medium", "text-white","p-2", "rounded-md", "bg-gray-500", "cursor-pointer", "m-2");

    otherSubject.addEventListener("input", () => {
        if (otherSubject.value.trim() !== "") {
            document.querySelectorAll("#subjects button").forEach(btn => {
                btn.disabled = true;
                btn.classList.add("opacity-50", "cursor-not-allowed");
            });
        }else{
            document.querySelectorAll("#subjects button").forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("opacity-50", "cursor-not-allowed");
            });
        }
    });

    button.addEventListener("click", () => {
        if (selectedButton === button) {
              // If clicking the same button, re-enable all buttons
              selectedButton = null;
              button.classList.remove("bg-purple-500");
              button.classList.add("bg-gray-500");
              document.querySelectorAll("#subjects button").forEach(btn => {
                  btn.disabled = false; // Re-enable all buttons
                  btn.classList.remove("opacity-50", "cursor-not-allowed");
                  otherSubject.disabled = false;
                  otherSubject.classList.remove("opacity-50", "cursor-not-allowed");
                  otherSubject.placeholder = "Type your subject here...";
              });
          } else {
              // Disable all buttons except the clicked one
              document.querySelectorAll("#subjects button").forEach(btn => {
                 if (btn !== button) {
                      btn.disabled = true;
                      btn.classList.add("opacity-50", "cursor-not-allowed");
                      otherSubject.disabled = true;
                      otherSubject.classList.add("opacity-50", "cursor-not-allowed");
                      otherSubject.placeholder = "Field disabled";
                  }
              });
  
              // Mark this button as selected
              if (selectedButton) {
                  selectedButton.classList.remove("bg-purple-500");
                  selectedButton.classList.add("bg-gray-500");
              }
              selectedButton = button;
              button.classList.remove("bg-gray-500");
              button.classList.add("bg-purple-500");
          }
      });

    subjects.appendChild(button);
});


