
/* ==================================
   STUDENT ACTIVITY PORTAL
   ================================== */

// List of available activities
const activityList = [
    "Coding Workshop",
    "Sports Day",
    "Hackathon",
    "Technical Seminar",
    "Cultural Event",
    "Project Expo"
];

// Load saved data from localStorage
let registeredActivities =
    JSON.parse(localStorage.getItem("registeredActivities")) || [];

let completedActivities =
    JSON.parse(localStorage.getItem("completedActivities")) || [];


// ==================================
// UPDATE DASHBOARD
// ==================================

function updateDashboard() {
    document.getElementById("totalActivities").textContent =
        activityList.length;

    document.getElementById("registeredActivities").textContent =
        registeredActivities.length;

    document.getElementById("completedActivities").textContent =
        completedActivities.length;
}


// ==================================
// REGISTER FOR AN ACTIVITY
// ==================================

function registerActivity(activityName) {

    // Prevent duplicate registration
    if (registeredActivities.includes(activityName)) {
        alert("You are already registered for " + activityName);
        return;
    }

    // Save registration
    registeredActivities.push(activityName);

    localStorage.setItem(
        "registeredActivities",
        JSON.stringify(registeredActivities)
    );

    // Update dashboard and button
    updateDashboard();
    updateRegisterButtons();

    alert("Successfully registered for " + activityName + "!");
}


// Change button text for registered activities
function updateRegisterButtons() {

    document.querySelectorAll(".activity-card button").forEach(button => {

        const match = button.getAttribute("onclick")?.match(
            /registerActivity\('([^']+)'\)/
        );

        if (!match) return;

        const activityName = match[1];

        if (registeredActivities.includes(activityName)) {
            button.textContent = "Registered";
            button.disabled = true;
        } else {
            button.textContent = "Register";
            button.disabled = false;
        }
    });
}


// ==================================
// EDIT PROFILE
// ==================================

function editProfile() {

    const currentName =
        document.getElementById("studentName").textContent;

    const currentEmail =
        document.getElementById("studentEmail").textContent;

    const newName = prompt("Enter your name:", currentName);

    // Cancel or empty input
    if (newName === null || newName.trim() === "") {
        return;
    }

    const newEmail = prompt("Enter your email:", currentEmail);

    if (newEmail === null || newEmail.trim() === "") {
        return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
        alert("Please enter a valid email address.");
        return;
    }

    // Update profile on screen
    document.getElementById("studentName").textContent =
        newName.trim();

    document.getElementById("studentEmail").textContent =
        newEmail.trim();

    // Save profile
    localStorage.setItem("studentName", newName.trim());
    localStorage.setItem("studentEmail", newEmail.trim());

    alert("Profile updated successfully!");
}


// Load saved profile details
function loadProfile() {

    const savedName = localStorage.getItem("studentName");
    const savedEmail = localStorage.getItem("studentEmail");

    if (savedName) {
        document.getElementById("studentName").textContent = savedName;
    }

    if (savedEmail) {
        document.getElementById("studentEmail").textContent = savedEmail;
    }
}


// ==================================
// SUBMIT FEEDBACK
// ==================================

document.getElementById("feedbackForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const feedback = {
            activity: document.getElementById("activity").value,
            rating: document.getElementById("rating").value,
            comments: document.getElementById("comments").value.trim(),
            date: new Date().toLocaleString()
        };

        // Keep previous feedback instead of overwriting it
        const savedFeedback =
            JSON.parse(localStorage.getItem("feedback")) || [];

        savedFeedback.push(feedback);

        localStorage.setItem(
            "feedback",
            JSON.stringify(savedFeedback)
        );

        alert("Feedback submitted successfully!");

        this.reset();
    }
);


// ==================================
// INITIALIZE APPLICATION
// ==================================

loadProfile();
updateDashboard();
updateRegisterButtons();