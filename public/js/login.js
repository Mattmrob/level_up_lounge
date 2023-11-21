// hides loginblock when on login page (you dont need to go there if you are there, and its just confusing)
document.querySelector('.loginBlock').style.display = 'none';

// login account page toggle starts
let toggle = 1;

document.querySelector('#accSignup').addEventListener('click', () => {

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
    document.querySelector("#usernamelbl").innerHTML = 'Your username must be between 6 and 18 characters!';
    document.querySelector("#usernamelbl").style.color = 'red';
    console.log("namelength bad");
    return;  
  } else {
    document.querySelector("#usernamelbl").innerHTML = 'Your username is valid';
    document.querySelector("#usernamelbl").style.color = 'green';
    console.log("namelength good");
  }

  if (email) {
    document.querySelector("#emaillbl").innerHTML = 'Your email is valid.... probably?';
    document.querySelector("#emaillbl").style.color = 'green';
    console.log("email good");
  }

    // Validate password
    if (!isPasswordLengthValid(password)) {
      document.querySelector("#passwordlbl").innerHTML = 'Password must be at least 8 characters long';
      document.querySelector("#passwordlbl").style.color = 'red';
      console.log("passwordlength bad");
      return;
    }
  
    if (!isPasswordNumberValid(password)) {
      document.querySelector("#passwordlbl").innerHTML = 'Password must include at least one number';
      document.querySelector("#passwordlbl").style.color = 'red';
      console.log("passwordnums bad");
      return;
    }
  
    if (!isPasswordSpecialCharacterValid(password)) {
      document.querySelector("#passwordlbl").innerHTML = 'Password must include at least one special character';
      document.querySelector("#passwordlbl").style.color = 'red';
      console.log("password needs special char");
      return;
    } else {
      document.querySelector("#passwordlbl").innerHTML = 'Your Password is valid';
      document.querySelector("#passwordlbl").style.color = 'green';
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
      console.log(response.statusText);
    }
  }
  return false;
};

// function to validate if email is valid
const isEmail = (password) => {
  // \w+ checks for 1-n word characters (numbers or letter)
  // @ is the '@' symbol
  // \. escapes . functionality to find '.' literal
  // \w{2,3} checks for exactly 2-3 word characters
  // /D matches from the end
  const emailRegex = /\w+@\w+\.\w{2,3}/;
  return emailRegex.test(password);
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
