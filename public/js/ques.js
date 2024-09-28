document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Retrieve form data
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const nationality = document.getElementById('nationality').value;
    const preferredLanguage = document.getElementById('preferredLanguage').value;
    const emergencyContact = document.getElementById('emergencyContact').value;

    const highestEducation = document.getElementById('highestEducation').value;
    const universityName = document.getElementById('universityName').value;
    const degree = document.getElementById('degree').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const gpa = document.getElementById('gpa').value;

    const currentJobTitle = document.getElementById('currentJobTitle').value;
    const companyName = document.getElementById('companyName').value;
    const experienceYears = document.getElementById('experienceYears').value;
    const keySkills = document.getElementById('keySkills').value;

    const ethnicity = document.getElementById('ethnicity').value;

    // Log or process form data
    console.log('Form Data:', {
        fullName, dob, email, phone, address, gender, maritalStatus, nationality,
        preferredLanguage, emergencyContact, highestEducation, universityName,
        degree, graduationYear, gpa, currentJobTitle, companyName, experienceYears,
        keySkills, ethnicity
    });

    // Display a success message or proceed with form submission
    alert('Registration form submitted successfully!');
});
