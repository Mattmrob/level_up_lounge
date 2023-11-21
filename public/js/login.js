// login account page toggle starts
let toggle = 1;

document.querySelector('#accSignup').addEventListener('click', () => {

  console.log("it worked");

  if (toggle === 1) {
    document.querySelector('#hideSignup').style.display = 'initial';
    toggle = 0;
  } else if (toggle === 0) {
    document.querySelector('#hideSignup').style.display = 'none';
    toggle = 1
  };

});
// login account page toggle ends

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const password2 = document.querySelector('#password-signup2').value.trim();


  // Validate username length (between 6 and 18 characters)
  if (name.length < 6 || name.length > 18) {
    alert('Username must be between 6 and 18 characters long');
    return;  
  }

    // Validate password
    if (!isPasswordLengthValid(password)) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    if (!isPasswordNumberValid(password)) {
      alert('Password must include at least one number');
      return;
    }
  
    if (!isPasswordSpecialCharacterValid(password)) {
      alert('Password must include at least one special character');
      return;
    }

    // check passwords match
    if (password !== password2) {
      document.querySelector("#reEnterPw").innerHTML = 'Your Passwords do not match!';
      document.querySelector("#reEnterPw").style.color = 'red';
    return;
    } else {
      document.querySelector("#reEnterPw").innerHTML = 'Your Passwords Matched';
      document.querySelector("#reEnterPw").style.color = 'green';
    }

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// Function to validate if the password is at least 8 characters long
const isPasswordLengthValid = (password) => {
  return password.length >= 8;
};

// Function to validate if the password includes at least one number
const isPasswordNumberValid = (password) => {
  const numberRegex = /\d/;
  return numberRegex.test(password);
};

// Function to validate if the password includes at least one special character
const isPasswordSpecialCharacterValid = (password) => {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  return specialCharRegex.test(password);
};

// Function to validate if the password meets all criteria
const isPasswordValid = (password) => {
  const isLengthValid = isPasswordLengthValid(password);
  const isNumberValid = isPasswordNumberValid(password);
  const isSpecialCharValid = isPasswordSpecialCharacterValid(password);

  return isLengthValid && isNumberValid && isSpecialCharValid;
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
