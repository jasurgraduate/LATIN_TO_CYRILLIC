// cursor.js

// Function to focus the cursor on the Latin text area
function focusLatinTextArea() {
    document.getElementById('latin_textarea').focus();
}

// Add event listener to focus on the Latin text area when the page loads
document.addEventListener('DOMContentLoaded', focusLatinTextArea);
