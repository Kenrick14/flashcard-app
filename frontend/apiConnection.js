export async function createCard(question, answer, subject)
{
    const postData = {
        question: question,
        answer: answer,
        subject: subject
    };
    
    try {
        const response = await fetch("http://127.0.0.1:5000/flashcards/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error("Failed to create flashcard");
        }

        const data = await response.json(); // If the API sends a response, parse it
        return data; // Return the response if needed

    } catch (error) {
        console.error("Error creating flashcard:", error);
        return null; // Handle errors gracefully
    }
    
}
