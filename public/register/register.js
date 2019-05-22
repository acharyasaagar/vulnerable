(function () {
  const registerBtn = document.getElementById('btn-register')

  registerBtn.addEventListener('click', handleRegistration)
  
  function handleRegistration(e) {
    e.preventDefault()
    let payload = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    if ( !(validateEmail(payload.email) && validatePassword(payload.password))) {
      const errorAlertElement = document.getElementById('emailPasswordValidationErrorAlert')
      errorAlertElement.classList.remove('d-none')
      setTimeout(function() {
        errorAlertElement.classList.add('fade-out')
      }, 2000)
      setTimeout(function () {
        errorAlertElement.classList.add('d-none')
        errorAlertElement.classList.remove('fade-out')
      }, 3000)
      throw new Error('Invalid email and password')
    }
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => console.log(data))
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
}())
