

// Function to display error messages
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.color = 'red';
    setTimeout(() => errorElement.remove(), 3000)


}

// Function to clear error messages
function clearErrors(formId) {
    const form = document.getElementById(formId);
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Function to get accounts from local storage
function getAccounts() {
    const accounts = localStorage.getItem('accounts');
    return accounts ? JSON.parse(accounts) : [];
}

// Function to clear form fields
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
}



// Login form validation
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors('loginForm');

    let hasErrors = false;

    // Validate email
    const userName = document.getElementById('userName').value;
    if (userName.trim() === '') {
        displayError('userNameError', 'Username is required.');
        hasErrors = true;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (password.trim() === '') {
        displayError('loginPasswordError', 'Password is required.');
        hasErrors = true;
    }

    if (!hasErrors) {
        const accounts = getAccounts();
        const account = accounts.find(acc => acc.userName === userName && acc.password === password);
        const wrongPassword = accounts.find(acc => acc.userName === userName && acc.password !== password);
        const user = accounts.find(acc => acc.userName === userName)

        if (account) {
            const email = account.email;
            const phone = account.phone;

            localStorage.setItem('loggedInUser', JSON.stringify({ userName, password, email, phone }));

            alert('Login successful!');
            clearForm('loginForm');

            // window.location.href = 'index.html';

        } else if (!user) {
            alert("You don't have an account, Sign up")
            // location.href = 'signup.html'

        } else if (wrongPassword) {
            alert('Incorrect password.');

        }

    }
});