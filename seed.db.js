const { addNewProduct } = require('./services/products/products.service')
const customerRegistrationService = require('./services/customer/registration.service')

async function seedItems() {
  const products = [
    {
      name: 'Black Tea',
      price: 2.89,
      imageURL: 'images/black.jpeg',
      itemDescription: 'Black tea has health benefits.',
      stock: 100
    },
    {
      name: 'Green Tea',
      price: 4.89,
      imageURL: 'images/green.jpeg',
      itemDescription: 'Green tea leaves are not fermented. They are steamed and then heated to remove moisture.',
      stock: 200
    },  
    {
      name: 'Herbal Tea',
      price: 3.89,
      imageURL: 'images/herbal.jpeg',
      itemDescription: 'Herbal teas are not actually teas because they are not made of tea leaves.',
      stock: 150
    }
  ]
  
  products.map(product => addNewProduct(product))  
}

async function seedCustomers() {
  const users = [
    {
      email: 'jdoe@mail.com',
      password: '12345678',
      isAdmin: false
    },
    {
      email: 'admin101@mail.com',
      password: 'admin123',
      isAdmin: true
    },
    {
      email: 'marysmith@mail.com',
      password: '12345678',
      isAdmin: false
    }
  ]
  users.map(user => customerRegistrationService(user))
}

module.exports = {
  seedItems,
  seedCustomers
}