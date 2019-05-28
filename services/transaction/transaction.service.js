const { Customer, Item, Transaction } = require('../../models')

async function createNewTransaction(payload) {
  console.log(payload)
  try {
    const customer = await Customer.findOne({ where: { email: payload.customer }})
    const transaction = await Transaction.create({
      CustomerId: customer.id,
      ItemId: payload.productId,
      total: payload.total
    })
    const savedTransaction = await Transaction.findByPk(transaction.id, {
      include: [ Customer, Item ]
    })
    const result = {
      id: savedTransaction.id,
      customerEmail: savedTransaction.Customer.email,
      productName: savedTransaction.Item.name,
      productPrice: savedTransaction.total,
      productImage: savedTransaction.Item.imageURL
    }
    return result 
  } catch(err) {
    return new Error(err.message)
  }
}

module.exports = { createNewTransaction }