// get all Fields
const form = document.querySelector('.form');
const inputs = {
  username: document.getElementById('username'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  cPassword: document.getElementById('c-password'),
};
const regex = {
  email: {
    pattern: /^[A-Za-z0-9+_.-]+@(.+)$/,
    errorMsg: 'Email is not valid',
  },
  username: {
    pattern: /^[a-zA-Z][a-zA-Z0-9]{3,13}[a-zA-Z]$/,
    errorMsg:
      'Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end',
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    errorMsg: 'Password minimum eight characters, at least one letter and one number',
  },
};

// logic
function areAllFieldsHaveContent(inputs) {
  let emptyFields = 0;

  for (const key in inputs) {
    const input = inputs[key];
    if (input.value.trim() === '') {
      showError(input, 'This field is required');
      emptyFields++;
    }
  }

  return emptyFields === 0;
}

function isVaLidPattern(regex, input) {
  if (regex.pattern.test(input.value.trim()) === true) {
    return true;
  }

  showError(input, regex.errorMsg);
  return false;
}

function showError(input, message) {
  const inputGroup = input.parentElement.parentElement;
  inputGroup.className = 'input-group error';
  const errorMsg = inputGroup.querySelector('.error-msg');
  errorMsg.textContent = message;
}

function clearErrors(inputs) {
  for (const key in inputs) {
    const input = inputs[key];
    input.addEventListener('change', () => {
      const inputGroup = input.parentElement.parentElement;
      inputGroup.className = 'input-group';
      const errorMsg = inputGroup.querySelector('.error-msg');
      errorMsg.textContent = '';
    });
  }
}

function areTwoPasswordsTheSame(pass1, pass2) {
  if (pass1.toLowerCase() === pass2.toLowerCase()) {
    return true;
  }

  showError(inputs.cPassword, 'Password and confirmation password should be the same');
  return false;
}

// event
form.addEventListener('submit', e => {
  e.preventDefault();

  // clearErrors
  clearErrors(inputs);

  // checkRequired
  if (areAllFieldsHaveContent(inputs) === true) {
    let check1 = isVaLidPattern(regex.username, inputs.username);
    let check2 = isVaLidPattern(regex.email, inputs.email);
    let check3 = isVaLidPattern(regex.password, inputs.password);
    let check4 = areTwoPasswordsTheSame(inputs.password, inputs.cPassword);

    if (check1 && check2 && check3 && check4) {
      // api call
      console.log('api call');
    }
  }
});
