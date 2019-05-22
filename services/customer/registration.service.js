const models = require('../../models')
const { Customer } = models

module.exports = async function (customer) {
  return Customer.create(customer)
}