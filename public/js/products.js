(function(){
  const buyProductButtonsNodeList = document.querySelectorAll('[data-product_id]')
  const buyProductButtonsArray = Array.from(buyProductButtonsNodeList)

  const deleteProductButtonsNodeList = document.querySelectorAll('[data-delete_product_id]')
  const deleteProductButtonsArray = Array.from(deleteProductButtonsNodeList)

  buyProductButtonsArray.forEach(btn => {
    btn.addEventListener('click', handleProductPurchase)
  })

  deleteProductButtonsArray.forEach(btn => {
    btn.addEventListener('click', handleProductDeletion)
  })
  function handleProductDeletion(e) {
    const productId = e.target.dataset.delete_product_id
    fetch(`/products/${productId}`, {
      method: 'DELETE'
      })
      .then(res => {
        if(res.ok) {
          window.alert('Item deleted successfully!')
          window.location.reload()
        } else {
          throw new Error('Error deleting the item')
        }
      })
      .catch(err => alert(err.message))
  }

  function handleProductPurchase(e) {
    const productId = e.target.dataset.product_id
    const customer = document.getElementById('user-email').innerHTML
    const total = e.target.previousElementSibling.previousElementSibling.innerHTML
    const postPayload = {
      productId,
      customer,
      total
    }
    fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postPayload)
    })
    .then(res => {
      if(res.ok) {
        window.location.replace(res.url)
      }
    })
  }
}())