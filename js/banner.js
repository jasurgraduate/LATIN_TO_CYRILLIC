document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('userCountCanvas');
    const ctx = canvas.getContext('2d');
  
    // Function to fetch and update the user count
    const updateUserCount = () => {
      // Get the current count from localStorage, default to 0 if not present
      let userCount = parseInt(localStorage.getItem('userCount'), 10) || 0;
      
      // Increment the count
      userCount += 1;
  
      // Store the updated count back in localStorage
      localStorage.setItem('userCount', userCount);
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Set the font properties
      ctx.font = '19px Trebuchet';
      ctx.fillStyle = 'wheat';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      // Draw the user count number
      ctx.fillText(userCount, canvas.width / 2, canvas.height / 2);
    };
  
    // Update user count on page load
    updateUserCount();
  });
  