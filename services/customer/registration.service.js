const models = require('../../models')
const { Customer } = models

module.exports = async function (customer) {
  const savedCustomer = await Customer.create(customer)
  const tokenPayload = Math.round(Math.random() * 10 * (savedCustomer.id + Date.now()))
    const token = savedCustomer.id + '.' + tokenPayload
    await Customer.update({
      token
      }, {
        where: {
          email: customer.email
        }
      })
    return {
      token,
      id: customer.id,
    }
}