const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const closeButton = document.getElementById("close-btn");

closeButton.addEventListener("click", (hideQuestion = () => {

}))

cardButton.addEventListener("click", (saveCard = () => {
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("invisible");
        return;
    }
    else {
        makePost();
        errorMessage.classList.add("invisible");
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