(function(){
  fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
      data.map(product => {
        const card = renderCard(product.name, product.itemDescription, product.imageURL, product.price)
        document.getElementById('products').appendChild(card)
      })
    })
    .catch(err => {
      console.log(err)
    })

    function renderCard(cardTitle, cardText, imgSrc, price) {
      const cardDiv = document.createElement('div')
      cardDiv.setAttribute('class', 'card m-3')
      cardDiv.setAttribute('style', 'width: 20rem')
      const img = document.createElement('img')
      img.setAttribute('src', imgSrc)
      img.setAttribute('class', 'card-img-top')
      cardDiv.appendChild(img)
      const cardBodyDiv = renderCardBody(cardTitle, cardText, price)
      cardDiv.appendChild(cardBodyDiv)
      return cardDiv
    }

    function renderCardBody(cardTitle, cardText, price) {
      const h5 = document.createElement('h5')
      h5.setAttribute('class', 'card-title')
      const h5Text = document.createTextNode(cardTitle)
      h5.appendChild(h5Text)
      const h6 = document.createElement('h6')
      const priceText = document.createTextNode(price+' €')
      h6.appendChild(priceText)
      h6.setAttribute('class', 'card-subtitle mb-2')
      const p = document.createElement('p')
      p.setAttribute('class', 'card-text')
      const pText = document.createTextNode(cardText)
      p.appendChild(pText)
      const a = document.createElement('a')
      a.setAttribute('href', '#')
      a.setAttribute('class', 'btn btn-primary btn-block')
      const btnText = document.createTextNode('Buy')
      a.appendChild(btnText)
      const div = document.createElement('div')
      div.setAttribute('class', 'card-body')
      div.appendChild(h5)
      div.appendChild(h6)
      div.appendChild(p)
      div.appendChild(a)
      return div
    }
}())