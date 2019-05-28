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

async function deleteProductById(id) {
  return Item.destroy({
    where: {
      id
    }
  })
}

module.exports = {
  addNewProduct,
  // addProducts,
  getAllProducts,
  deleteProductById
}
