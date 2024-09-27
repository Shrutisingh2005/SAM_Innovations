document.addEventListener('DOMContentLoaded', () => {
    // Elements for menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        openIcon.classList.toggle('hide');
        closeIcon.classList.toggle('hide');
    });

});


//email
document.getElementById('submitButton').addEventListener('click', () => {
    const emailInput = document.getElementById('emailInput');
    const message = document.getElementById('message');
    
    // Clear previous messages
    message.style.display = 'none';
  
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailInput.value)) {
      console.log('Email submitted:', emailInput.value);
      // Here you can add your logic for what happens after submission
      emailInput.value = ''; // Clear the input field
    } else {
      message.textContent = 'Please enter a valid email address.';
      message.style.display = 'block';
    }
});
  
  