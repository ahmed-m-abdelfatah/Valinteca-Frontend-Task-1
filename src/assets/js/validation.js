function validation() {
  if (window.location.href.includes('register.html')) {
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
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        errorMsg:
          'Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
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

    async function apiReq() {
      let reqBody = {};
      for (const key in inputs) {
        const current = inputs[key];
        reqBody = { ...reqBody, [current.name]: current.value };
      }

      try {
        let res = await fetch('https://goldblv.com/api/hiring/tasks/register', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(reqBody),
        });

        const data = await res.json();
        console.log('data', data.id.length);

        if (res.ok) {
          // save to local storage
          if (data.id.length > 0) {
            localStorage.setItem('userObj', JSON.stringify(data));

            // got to home page
            window.location.href = './home.html';
          }
        } else {
          throw data;
        }
      } catch (error) {
        // show error from api
        console.log('error from api', error);

        if (error?.errors) {
          const allErrors = error.errors;

          for (const key in allErrors) {
            if (Object.hasOwnProperty.call(inputs, key)) {
              const errorMsg = allErrors[key];
              const element = inputs[key];
              showError(element, errorMsg.join(', '));
            }
          }
        }
      }
    }

    function test() {
      const data = {
        username: 'ahmed',
        email: 'ahmed@ahmed',
        password: 'Ahmed@123',
        password_confirmation: 'Ahmed@123',
      };

      for (const key in data) {
        const el = document.getElementsByName(key);
        el[0].value = data[key];
      }
    }
    test();

    // event
    form.addEventListener('submit', async e => {
      e.preventDefault();

      // clearErrors
      clearErrors(inputs);

      // checkRequired
      let check1 = isVaLidPattern(regex.username, inputs.username);
      let check2 = isVaLidPattern(regex.email, inputs.email);
      let check3 = isVaLidPattern(regex.password, inputs.password);
      let check4 = areTwoPasswordsTheSame(inputs.password.value, inputs.cPassword.value);
      let check5 = areAllFieldsHaveContent(inputs);

      if (check1 && check2 && check3 && check4 && check5) {
        await apiReq();
      }
    });
  }
}
validation();
