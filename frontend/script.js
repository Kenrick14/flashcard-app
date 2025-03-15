const subjects = document.getElementById("topics");
const subs = {"Math":"../assets/math-bg.png", 
            "English":"../assets/math-bg.png",
            "History":"../assets/math-bg.png",
            "Geography":"../assets/math-bg.png",
            "Art":"../assets/math-bg.png",
            "Music":"../assets/math-bg.png",
            "Technology":"../assets/math-bg.png",
            "Computer Science":"../assets/math-bg.png",
            "Physical Education":"../assets/math-bg.png",
            "Business":"../assets/math-bg.png",
            "jackl":"../assets/math-bg.png",
            "jill":"../assets/math-bg.png",
            "Science":"../assets/math-bg.png",
            "French":"../assets/math-bg.png",
            "Spanish":"../assets/math-bg.png",
            "German":"../assets/math-bg.png",
            "Italian":"../assets/math-bg.png",
            "Chinese":"../assets/math-bg.png",};

Object.entries(subs).forEach(([subject, image]) => {
    const button = document.createElement("div");
    button.textContent = subject; // Set text to subject name
    button.classList.add("w-[30%]","max-w-60","h-30", "text-black","text-3xl","font-bold","flex","bg-cover","bg-left-top", "items-center",
    "justify-center" ,"cursor-pointer", "rounded-md" , "text-center", "hover:bg-gray-700", "transition", "duration-200", "shadow-md");

    button.style.backgroundImage = `url(${image})`;

    button.addEventListener("click", () => {
        window.location.href = `subject.html?subject=${encodeURIComponent(subject)}`;
    });
    
    subjects.appendChild(button);
});
