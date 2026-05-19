let registrations = [];
let registrationCount = 0;

let feedbacks = [];
let totalRating = 0;

function updateDateTime() {
    let dateTime = document.getElementById("datetime");

    if (dateTime) {
        let now = new Date();
        dateTime.innerHTML = now.toLocaleString();
    }
}

setInterval(updateDateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {

    let registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (e) {

            e.preventDefault();

            let studentName = document.getElementById("studentName").value.trim();
            let email = document.getElementById("email").value.trim();
            let mobile = document.getElementById("mobile").value.trim();
            let regno = document.getElementById("regno").value.trim();
            let event = document.getElementById("event").value;
            let participationType = document.getElementById("participationType").value;
            let teamName = document.getElementById("teamName").value.trim();
            let teamSize = document.getElementById("teamSize").value;
            let teamMembers = document.getElementById("teamMembers").value.trim();

            let message = document.getElementById("message");

            message.className = "";
            message.innerHTML = "";

            let regPattern = /^[A-Z]{3}[0-9]{5}$/;
            let mobilePattern = /^[0-9]{10}$/;

            if (studentName === "") {
                message.classList.add("error");
                message.innerHTML = "Enter student name";
                return;
            }

            if (!email.includes("@")) {
                message.classList.add("error");
                message.innerHTML = "Invalid email";
                return;
            }

            if (!mobilePattern.test(mobile)) {
                message.classList.add("error");
                message.innerHTML = "Invalid mobile number";
                return;
            }

            if (!regPattern.test(regno)) {
                message.classList.add("error");
                message.innerHTML = "Registration number format should be like CS101";
                return;
            }

            if (event === "") {
                message.classList.add("error");
                message.innerHTML = "Select an event";
                return;
            }

            if (event === "Paper Presentation") {
                message.classList.add("error");
                message.innerHTML = "This event is closed";
                return;
            }

            let duplicate = registrations.find(r => r.regno === regno && r.event === event);

            if (duplicate) {
                message.classList.add("error");
                message.innerHTML = "Duplicate registration detected";
                return;
            }

            if (participationType === "Team") {

                if (teamName === "") {
                    message.classList.add("error");
                    message.innerHTML = "Enter team name";
                    return;
                }

                if (teamSize < 2 || teamSize > 4) {
                    message.classList.add("error");
                    message.innerHTML = "Team size must be between 2 and 4";
                    return;
                }

                if (teamMembers === "") {
                    message.classList.add("error");
                    message.innerHTML = "Enter team member details";
                    return;
                }
            }

            let registrationData = {
                studentName,
                email,
                mobile,
                regno,
                event,
                participationType,
                teamName: participationType === "team" ? teamName : "N/A",
                teamSize: participationType === "team" ? teamSize : "1",
                teamMembers: participationType === "team" ? teamMembers : studentName
            };
            registrations.push(registrationData);

            registrationCount++;

            document.getElementById("count").innerHTML = registrationCount;

            message.classList.add("success");
            message.innerHTML = "Registration Successful";

            let participantDetails = document.getElementById("participantDetails");

            if (participationType == "") {
                message.classList.add("error");
                message.innerHTML = "Select Participation Type";
                return;
            }

            if (participationType == "Individual") {
                participantDetails.innerHTML += `
                <div class="card">
                    <h3>${studentName}</h3>
                    <p><strong>Reg No:</strong> ${regno}</p>
                    <p><strong>Event:</strong> ${event}</p>
                    <p><strong>Participation:</strong> ${participationType}</p>
                    <p><strong>Team Members:</strong> ${studentName}</p>
                </div>
            `;
            }




            if (participationType == "Team") {
                participantDetails.innerHTML += `
                <div class="card">
                    <h3>${studentName}</h3>
                    <p><strong>Reg No:</strong> ${regno}</p>
                    <p><strong>Event:</strong> ${event}</p>
                    <p><strong>Participation:</strong> ${participationType}</p>
                    <p><strong>Team Members:</strong> ${teamMembers}</p>
                </div>
            `;
            }
            registrationForm.reset();
        });
    }

    let feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {

        feedbackForm.addEventListener("submit", function (e) {

            e.preventDefault();

            let fbName = document.getElementById("fbName").value.trim();
            let fbRegno = document.getElementById("fbRegno").value.trim();
            let fbEvent = document.getElementById("fbEvent").value;
            let rating = document.getElementById("rating").value;
            let comments = document.getElementById("comments").value.trim();

            let feedbackMessage = document.getElementById("feedbackMessage");

            feedbackMessage.className = "";
            feedbackMessage.innerHTML = "";

            let regPattern = /^[A-Z]{3}[0-9]{5}$/;

            if (!regPattern.test(fbRegno)) {
                feedbackMessage.classList.add("error");
                feedbackMessage.innerHTML = "Invalid registration number";
                return;
            }

            if (fbEvent === "") {
                feedbackMessage.classList.add("error");
                feedbackMessage.innerHTML = "Select an event";
                return;
            }

            if (rating === "") {
                feedbackMessage.classList.add("error");
                feedbackMessage.innerHTML = "Select rating";
                return;
            }

            if (comments.length < 20) {
                feedbackMessage.classList.add("error");
                feedbackMessage.innerHTML = "Comments must contain minimum 20 characters";
                return;
            }

            feedbacks.push({
                fbName,
                fbRegno,
                fbEvent,
                rating
            });

            totalRating += parseInt(rating);

            let average = (totalRating / feedbacks.length).toFixed(2);

            document.getElementById("averageRating").innerHTML = average;

            feedbackMessage.classList.add("success");
            feedbackMessage.innerHTML = "Feedback Submitted Successfully";

            let feedbackSummary = document.getElementById("feedbackSummary");

            feedbackSummary.innerHTML += `
                <div class="card">
                    <h3>${fbName}</h3>
                    <p><strong>Reg No:</strong> ${fbRegno}</p>
                    <p><strong>Event:</strong> ${fbEvent}</p>
                    <p><strong>Rating:</strong> ${rating}</p>
                    <p><strong>Comments:</strong> ${comments}</p>
                </div>
            `;

            feedbackForm.reset();
        });
    }
});