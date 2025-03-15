const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");

if (subject) {
    document.getElementById("subject-title").textContent = subject;
}