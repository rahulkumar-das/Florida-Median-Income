
// Function to handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('Youremail').value,
        message: document.getElementById('message').value,
        rating: parseInt(document.getElementById('rating').value) // Convert rating to integer
    };

    // Perform Create operation
    createContact(formData);

    // Clear form fields after submission
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('Youremail').value = '';
    document.getElementById('message').value = '';
    document.getElementById('rating').value = ''; // Clear rating field

    // Refresh the reviews list
    displayReviews();
});

// Array to store reviews
var reviews = [];

// Create operation function
function createContact(contactData) {
    // Push the new contact data into the reviews array
    reviews.push(contactData);
}

// Function to display reviews
function displayReviews() {
    var reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = ''; // Clear previous content

    // Check if there are any reviews
    if (reviews.length > 0) {
        // Show the "Reviews" heading
        document.getElementById('reviewsHeading').style.display = 'block';

        // Iterate through the reviews array and display each review
        reviews.forEach(function(review, index) {
            var listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" id="review${index}" value="${index}">
                <label for="review${index}">${review.firstName} ${review.lastName}: ${review.message} (Rating: ${review.rating})</label>
            `;
            reviewsList.appendChild(listItem);
        });
    } else {
        // Hide the "Reviews" heading if there are no reviews
        document.getElementById('reviewsHeading').style.display = 'none';
    }
}

// Function to handle review deletion
function deleteReviews() {
    // Get all checked checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // Convert NodeList to Array and sort it in descending order to delete items safely
    var selectedIndexes = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value)).sort((a, b) => b - a);
    
    // Remove reviews from the array based on selected indexes
    selectedIndexes.forEach(index => {
        reviews.splice(index, 1);
    });
    
    // Refresh the reviews list
    displayReviews();
}

// Call displayReviews function initially to show any existing reviews
displayReviews();
