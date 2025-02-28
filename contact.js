
    // Function to check if the date is within the next 2 weeks
    function isDateWithinTwoWeeks(date) {
        const today = new Date();
        const twoWeeksFromToday = new Date(today);
        twoWeeksFromToday.setDate(today.getDate() + 14);
        
        return date >= today && date <= twoWeeksFromToday;
    }

    // Function to set the end time based on the start time
    function setEndTime() {
        const startTimeInput = document.getElementById("start-time");
        const endTimeInput = document.getElementById("end-time");

        const startTime = startTimeInput.value;
        if (startTime) {
            const [hours, minutes] = startTime.split(':').map(Number);
            const startDate = new Date();
            startDate.setHours(hours);
            startDate.setMinutes(minutes);

            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 8); // Add 8 hours

            const formattedEndTime = endDate.toTimeString().split(' ')[0].slice(0, 5); // HH:MM format
            endTimeInput.value = formattedEndTime; // Set calculated end time
            endTimeInput.disabled = true; // Disable end time input
        }
    }

    // Function to handle form submission
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const selectedDate = new Date(document.getElementById("date").value);
        const startTime = document.getElementById("start-time").value;

        if (!isDateWithinTwoWeeks(selectedDate)) {
            alert("Please select a date within the next two weeks.");
            return;
        }

        // Gather information for confirmation
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const startTimeValue = document.getElementById("start-time").value;
        const endTimeValue = document.getElementById("end-time").value;
        const streetAddress = document.getElementById("street-address").value;
        const barangay = document.getElementById("barangay").value;
        const municipality = document.getElementById("municipality").value;
        const zip = document.getElementById("zip").value;
        const payment = document.getElementById("payment").value;

        // Show the summary in the confirmation modal
        const confirmationMessage = `
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Service:</strong> ${service}<br>
            <strong>Date:</strong> ${date}<br>
            <strong>Start Time:</strong> ${startTimeValue}<br>
            <strong>End Time:</strong> ${endTimeValue}<br>
            <strong>Street Address:</strong> ${streetAddress}<br>
            <strong>Barangay:</strong> ${barangay}<br>
            <strong>Municipality:</strong> ${municipality}<br>
            <strong>Zip Code:</strong> ${zip}<br>
            <strong>Payment Method:</strong> ${payment}<br>
        `;
        document.getElementById("confirmation-message").innerHTML = confirmationMessage;
        document.getElementById("booking-modal").style.display = "block";

        // Optionally reset the form after submission
        this.reset();
        document.getElementById("end-time").disabled = true; // Re-disable end time input
    });

    // Confirm booking button functionality
    document.getElementById("confirm-button").addEventListener("click", function () {
        // Notify user that booking is being processed
        const confirmationMessage = `Your booking has been submitted. Waiting for approval.`;
        alert(confirmationMessage);
        document.getElementById("booking-modal").style.display = "none";
        
        // Optionally submit the form data to the server here
    });

    // Cancel booking button functionality
    document.getElementById("cancel-button").addEventListener("click", function () {
        // Close the modal without doing anything
        document.getElementById("booking-modal").style.display = "none";
    });

    // Close the modal when the close button is clicked
    document.querySelector(".close-button").addEventListener("click", function () {
        document.getElementById("booking-modal").style.display = "none";
    });

    // Close the modal when the user clicks anywhere outside of the modal
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("booking-modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });


// Add event listener for the logout button
document.getElementById('logout-button').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default link behavior

  // Show a confirmation dialog
  const isConfirmed = confirm("Are you sure you want to log out?");

  if (isConfirmed) {
    // If the user confirmed, log the action to the console
    console.log("User confirmed logout. Logging out...");

    // Display a logout confirmation message in an alert
    alert("You have successfully logged out!");

    // Redirect to login page or home page
    window.location.href = 'index.html'; // Replace with your login page URL
  } else {
    // If the user canceled, log that to the console
    console.log("User canceled logout.");
  }
});

