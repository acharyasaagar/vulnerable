const models = require('../../models')

const { Item } = models

async function getAllProducts() {
  const allProducts = await Item.findAll()
  return allProducts
}

async function addNewProduct(product) {
  const addedProduct = Item.create(product)
  return addedProduct
}

// async function addProducts() {
//   const products = [
//     {
//       name: 'Black Tea',
//       price: 2.89,
//       imageURL: 'images/black.jpeg',
//       itemDescription: 'Black tea has health benefits.',
//       stock: 100
//     },
//     {
//       name: 'Green Tea',
//       price: 4.89,
//       imageURL: 'images/green.jpeg',
//       itemDescription: 'Green tea leaves are not fermented. They are steamed and then heated to remove moisture.',
//       stock: 200
//     },  
//     {
//       name: 'Herbal Tea',
//       price: 3.89,
//       imageURL: 'images/herbal.jpeg',
//       itemDescription: 'Herbal teas are not actually teas because they are not made of tea leaves.',
//       stock: 150
//     }
//   ]
  
//   products.map(product => addNewProduct(product))  
// }

module.exports = {
  addNewProduct,
  // addProducts,
  getAllProducts
}
