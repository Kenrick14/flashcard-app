import * as req from "./apiConnection.js";

const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const savedMessage = document.getElementById("saved");
const closeButton = document.getElementById("close-btn");
const newCard = document.getElementById("newcard-btn");
const flashcard = document.getElementById("modal");

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
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hidden");
        return;
    }
    else {
        await req.createCard(tempQuestion, tempAnswer);
        console.log("Card saved");
        savedMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        question.value = "";
        answer.value = "";
    }
}));

