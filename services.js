// This removes any pagination logic and shows all cards
document.addEventListener('DOMContentLoaded', function() {
  // Get all the cards
  const cards = document.querySelectorAll('.card');
  
  // Make sure all cards are visible
  cards.forEach(card => {
      card.style.display = 'block';
  });
  
  // Hide the navigation buttons
  const buttonContainer = document.querySelector('.button-container');
  if (buttonContainer) {
      buttonContainer.style.display = 'none';
  }
  
  // If you want to keep the prev/next buttons but disable them:
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = true;
});

document.getElementById('submitReview').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const reviewText = event.target.reviewText.value;
    const reviewerName = event.target.reviewerName.value;
    const rating = event.target.rating.value;
    const currentDate = new Date().toLocaleDateString(); // Get current date

    // Create a new review element
    const newReview = document.createElement('div');
    newReview.classList.add('review');

    // Add HTML content for the new review
    newReview.innerHTML = `
        <div class="review-header">
            <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
            <cite>- ${reviewerName}</cite>
        </div>
        <p>"${reviewText}"</p>
        <span class="review-date">Posted on: ${currentDate}</span>
    `;

    // Append the new review to the reviews container
    document.querySelector('.reviews-container').appendChild(newReview);

    // Reset the form
    event.target.reset();
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




