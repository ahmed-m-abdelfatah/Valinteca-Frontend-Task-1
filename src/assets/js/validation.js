const validation = () => {
  // get all Fields
  const form = document.querySelector('.form');
  const usernameInput = document.querySelectorAll('.input-group .input[name="username"]');
  const emailInput = document.querySelectorAll('.input-group .input[name="email"]');
  const passwordInput = document.querySelectorAll('.input-group .input[name="password"]');
  const cPasswordInput = document.querySelectorAll('.input-group .input[name="password_confirmation"]');

  function checkEmail(input) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(input.value) === false) {
      showError(input, 'Email is not invalid');
    }
  }

  // event
  form.addEventListener('submit', e => {
    e.preventDefault();

    // checkRequired
    // checkUsername
    // checkEmail
    // checkPassword
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
