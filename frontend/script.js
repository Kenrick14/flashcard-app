const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const savedMessage = document.getElementById("saved");
const closeButton = document.getElementById("close-btn");
const newCard = document.getElementById("newcard-btn");
const flashcard = document.getElementById("modal");

closeButton.addEventListener("click", (hideQuestion = () => {
    flashcard.classList.remove("flex");
    flashcard.classList.add("hidden");
    question.value = "";
    answer.value = "";
    errorMessage.classList.add("hidden");
}))

newCard.addEventListener("click", (showFlashCard = () => {
    flashcard.classList.remove("hidden");
    flashcard.classList.add("flex");
    question.value = "";
    answer.value = "";
    errorMessage.classList.add("hidden");
}))

cardButton.addEventListener("click", (saveCard = () => {
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hidden");
        return;
    }
    else {
        makePost();
        savedMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        question.value = "";
        answer.value = "";

    }
}));

function makePost()
{
    const postData = {
        question: question.value,
        answer: answer.value
    };
    
    fetch("http://127.0.0.1:5000/flashcards/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    
}