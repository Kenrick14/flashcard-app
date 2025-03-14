document.addEventListener("DOMContentLoaded", () => {
    const subjects = document.getElementById("subjects");

    const subs = ["Math", "English", "History", "Engish", "Kenrick"];
    let selectedSubjects = [];

    subs.forEach(sub => {
        const button = document.createElement("button");
        button.textContent = sub;
        button.classList.add("text-md", "font-medium", "text-white", "p-4", "rounded-md", "bg-gray-500", "cursor-pointer", "m-2");

        button.addEventListener("click", () => {
            if (selectedSubjects.includes(sub)) {
                selectedSubjects = selectedSubjects.filter(s => s !== sub);
                button.classList.remove("bg-purple-500");
                button.classList.add("bg-gray-500");
            } else {
                selectedSubjects.push(sub);
                button.classList.remove("bg-gray-500");
                button.classList.add("bg-purple-500");
            }
        });

        subjects.appendChild(button);
    });
});