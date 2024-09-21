// scripts/form-validation.js
document.getElementById("contactForm").addEventListener("submit", function (e) {
    let valid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Validate Name
    const name = document.getElementById('name').value;
    if (name.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters long.';
        valid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Validate Phone
    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9\-+() ]{7,15}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number.';
        valid = false;
    }

    // Validate Message
    const message = document.getElementById('message').value;
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters long.';
        valid = false;
    }

    // If not valid, prevent form submission
    if (!valid) {
        e.preventDefault();
    }
});
