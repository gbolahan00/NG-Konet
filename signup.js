// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//Function to validate phone number
function validatePhoneNumber(phoneNumber) {
    const re = /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?[\d-.()\s]{3,15}$/;
    return re.test(phoneNumber);
}


// Function to display error messages
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    // console.log(errorElement)


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

// Function to add an account
function saveAccount(account) {
    const accounts = getAccounts();
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));

}


// Function to clear form fields
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
}



// Sign-up form validation
document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors('signUpForm');

    let hasErrors = false;


    // Validate name
    const fullName = document.getElementById('fullName').value;
    if (fullName.trim() === '') {
        displayError('fullNameError', 'FullName is required.');
        hasErrors = true;
    }

    // Validate userName
    const userName = document.getElementById('userName').value;
    if (userName.trim() === '') {
        displayError('userNameError', 'Username is required.');
        hasErrors = true;
    }



    // Validate email
    const email = document.getElementById('signUpEmail').value;

    if (!validateEmail(email)) {
        displayError('signUpEmailError', 'Invalid email format.');
        hasErrors = true;
        console.log(email);
    }

    // Validate phone number
    const phone = document.getElementById('phone').value;
    if (!validatePhoneNumber(phone)) {
        displayError('phoneError', 'Enter a valid phone number.');
        hasErrors = true;
        console.log(phone);
    }

    const address = document.getElementById('address').value;
    if (address.trim() === '') {
        displayError('addressError', 'Address is required.');
        hasErrors = true;
    }

    // Get referal
    const referal = document.getElementById('referal').value;

    // Validate password
    const password = document.getElementById('signUpPassword').value;
    if (password.length < 8) {
        const passwordhint = document.getElementById('passwordhint')
        passwordhint.style.display = 'none'
        displayError('signUpPasswordError', 'Password must be at least 8 characters.');
        hasErrors = true;
    }

    // Validate confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword !== password) {
        const confirmPasswordhint = document.getElementById('confirmPasswordhint')
        confirmPasswordhint.style.display = 'none'
        displayError('confirmPasswordError', 'Passwords do not match.');
        hasErrors = true;
    }

    // Validate terms checkbox
    const checkbox = document.getElementById('checkbox').checked;
    if (!checkbox) {
        displayError('checkboxError', 'You must agree to the terms and conditions.');
        hasErrors = true;
    }

    const users = JSON.parse(localStorage.getItem('accounts')) || [];



    const userExists = users.some(accounts => accounts.userName === userName)
    if (userExists) {
        displayError('userNameError', 'Username has already been taken.');


    }

    const emailExists = users.some(accounts => accounts.email === email)
    if (emailExists) {
        displayError('signUpEmailError', 'Email already exists. Please use a different email.');



    } else if (!hasErrors) {
        const account = {
            fullName: fullName,
            userName: userName,
            email: email,
            phone: phone,
            address: address,
            referal: referal,
            password: password
        };

        // localStorage.clear()

        saveAccount(account);

        localStorage.setItem('loggedInUser', JSON.stringify({ userName, email, phone, password, }));

        console.log(phone);

        clearForm('signUpForm');

        alert('Sign-up successful!');




        // window.location.href = 'index.html';


    }

});
