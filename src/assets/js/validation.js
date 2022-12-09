const validation = () => {
  // get all Fields
  const form = document.querySelector('.form');
  const inputs = {
    username: document.getElementById('username'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    cPassword: document.getElementById('c-password'),
  };

  const showError = (input, message) => {
    const inputGroup = input.parentElement.parentElement;
    inputGroup.className = 'input-group error';
    const errorMsg = inputGroup.querySelector('.error-msg');
    errorMsg.textContent = message;
  };

  const checkRequired = (inputs, next) => {
    for (const key in inputs) {
      const input = inputs[key];
      if (input.value.trim() === '') {
        showError(input, 'This field is required');
      }
    }

    // next();
  };

  const checkEmail = input => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(input.value.trim()) === false) {
      showError(input, 'Email is not invalid');
    }
  };

  // event
  form.addEventListener('submit', e => {
    e.preventDefault();

    // checkRequired
    checkRequired(inputs, checkEmail);
    // checkUsername
    // checkEmail
    // checkPassword
    // api call
  });
};

validation();

// let data = {};
// const inputs = document.querySelectorAll('.input-group .input');

// inputs.forEach(input => {
//   data = { ...data, [input.name]: input.value };
// });

// for (const key in data) {
// }
