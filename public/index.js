(function () {
  const loginBtn = document.getElementById('btn-login')

  loginBtn.addEventListener('click', handleLogin)
  
  function handleLogin(e) {
    e.preventDefault()
    let payload = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    if ( !(validateEmail(payload.email) && validatePassword(payload.password))) {
      return showInvalidCredentialsAlert()
    }
    fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if(data.data.token) {
        window.location.assign('products')
      } else {
        showInvalidCredentialsAlert()
      }
    })
    .catch(err => console.log(err))
  }

  function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
  function validatePassword (password) {
    const regex = /[a-zA-Z0-9]{6,30}/ 
    return regex.test(password)
  }
  function showInvalidCredentialsAlert () {
    const errorAlertElement = document.getElementById('emailPasswordValidationErrorAlert')
    errorAlertElement.classList.remove('d-none')
    setTimeout(function() {
      errorAlertElement.classList.add('fade-out')
    }, 2000)
    setTimeout(function () {
      errorAlertElement.classList.add('d-none')
      errorAlertElement.classList.remove('fade-out')
    }, 3000)
  }
}())
