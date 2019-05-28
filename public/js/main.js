(function() {
  const logoutBtn = document.getElementById('btn-logout')

  logoutBtn.addEventListener('click', handleLogout)

  function handleLogout(e) {
    fetch('http://localhost:3000/logout', {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok) {
        window.location.replace('/static')
      } 
    })
  }
})()