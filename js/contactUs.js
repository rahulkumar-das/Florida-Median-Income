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
            listItem.classList.add('review-item'); // Add a class for styling
            
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', `review${index}`);
            checkbox.setAttribute('value', index);
            
            var label = document.createElement('label');
            label.setAttribute('for', `review${index}`);
            label.textContent = `${review.firstName} ${review.lastName}: 
                                 ${review.message} (Rating: ${review.rating})`;
            
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            
            reviewsList.appendChild(listItem);
        });
        
        
        // Show the "Delete Selected" button
        document.getElementById('delete_button').style.display = 'inline';
        toggleUpdateButtonVisibility();
    } else {
        // Hide the "Reviews" heading if there are no reviews
        document.getElementById('reviewsHeading').style.display = 'none';
        // Hide the "Delete Selected" button
        document.getElementById('delete_button').style.display = 'none';
        toggleUpdateButtonVisibility();
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

function updateReview() {
    // Get all checked checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Check if exactly one review is selected
    if (checkboxes.length !== 1) {
        alert('Please select exactly one review to update.');
        return;
    }

    // Get the index of the selected review
    var selectedIndex = parseInt(checkboxes[0].value);

    // Get the selected review element
    var selectedReviewElement = document.querySelector('input[type="checkbox"]:checked').nextElementSibling;

    // Create input fields for inline editing
    var updatedReviewHTML = `
        <input type="text" id="updatedFirstName" placeholder="First Name" value="${reviews[selectedIndex].firstName}">
        <input type="text" id="updatedLastName" placeholder="Last Name" value="${reviews[selectedIndex].lastName}">
        <input type="email" id="updatedEmail" placeholder="Email" value="${reviews[selectedIndex].email}">
        <textarea id="updatedMessage" placeholder="Message">${reviews[selectedIndex].message}</textarea>
        <input type="number" id="updatedRating" placeholder="Rating (1 to 5)" min="1" max="5" value="${reviews[selectedIndex].rating}">
    `;

    // Replace the selected review with input fields for editing
    selectedReviewElement.innerHTML = updatedReviewHTML;
    toggleSaveButtonVisibility();
    
}

// Function to save updated review
// Function to save updated review
function saveUpdatedReview() {
    // Get the index of the selected review
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length !== 1) {
        alert('Please select exactly one review to update.');
        return;
    }
    var selectedIndex = parseInt(checkboxes[0].value);

    // Get updated values from input fields
    var updatedFirstName = document.getElementById('updatedFirstName').value;
    var updatedLastName = document.getElementById('updatedLastName').value;
    var updatedEmail = document.getElementById('updatedEmail').value;
    var updatedMessage = document.getElementById('updatedMessage').value;
    var updatedRating = parseInt(document.getElementById('updatedRating').value);

    // Update the review
    reviews[selectedIndex].firstName = updatedFirstName;
    reviews[selectedIndex].lastName = updatedLastName;
    reviews[selectedIndex].email = updatedEmail;
    reviews[selectedIndex].message = updatedMessage;
    reviews[selectedIndex].rating = updatedRating;

    // Refresh the reviews list
    displayReviews();
}



// Function to cancel update and revert to original review
function cancelUpdate() {
    // Get the selected review element
    var selectedReviewElement = document.querySelector('input[type="checkbox"]:checked').nextElementSibling;

    // Restore the original review content
    var selectedIndex = parseInt(document.querySelector('input[type="checkbox"]:checked').value);
    var originalReviewContent = `
        ${reviews[selectedIndex].firstName} ${reviews[selectedIndex].lastName}: 
        ${reviews[selectedIndex].message} (Rating: ${reviews[selectedIndex].rating})
    `;

    selectedReviewElement.innerHTML = originalReviewContent;
    toggleSaveButtonVisibility();
}

// Call displayReviews function initially to show any existing reviews
displayReviews();
toggleSaveButtonVisibility();
toggleUpdateButtonVisibility();

function toggleSaveButtonVisibility() {
    var saveButton = document.getElementById('save_button');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Check if there is exactly one selected review and whether it is being edited
    if (checkboxes.length === 1 && isEditingReview()) {
        saveButton.style.display = 'inline';
    } else {
        saveButton.style.display = 'none';
    }
}

// Helper function to check whether a review is being edited
function isEditingReview() {
    var selectedReviewElement = document.querySelector('input[type="checkbox"]:checked').nextElementSibling;
    return selectedReviewElement.querySelector('input') !== null;
}

// Function to toggle the visibility of the "Update Selected" button
function toggleUpdateButtonVisibility() {
    var updateButton = document.getElementById('update_button');
    
    // Check if there are any reviews present in the list
    if (reviews.length > 0) {
        updateButton.style.display = 'inline';
    } else {
        updateButton.style.display = 'none';
    }
}
