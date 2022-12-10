function home() {
  if (window.location.href.includes('home.html')) {
    // get data from localStorage

    const data = JSON.parse(localStorage.getItem('userObj'));

    if (data && data?.id.length > 0) {
      // show email
      const userEmail = document.getElementById('use-email');
      userEmail.textContent = data.email;

      // perform logout
      const logout = document.getElementById('logout');
      logout.addEventListener('click', () => {
        localStorage.removeItem('userObj');
        window.location.href = './index.html';
      });
    } else {
      window.location.href = './register.html';
    }
  }
}
home();
