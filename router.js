const express = require('express')
const url = require('url')

const customerRegistrationService = require('./services/customer/registration.service')
const { authenticateUser, isAuthenticated, logout } = require('./services/customer/authentication.service')
// const { addProducts } = require('./services/products/products.service')
const { getAllProducts, addNewProduct, deleteProductById } = require('./services/products/products.service')
const { createNewTransaction } = require('./services/transaction/transaction.service')
const router = express.Router()

router.route('/register')
  .post(async function(req, res) {
    try {
      const customer = await customerRegistrationService(req.body)
      res.cookie('token', customer.token, {
        expires: new Date(Date.now() + (7 * 24 * 60 * 60604800))
      })
      return res.status(200).json({ data: customer }).end()
    } catch (err) {
      return res.status(400).json({ err: err.message }).end()
    }
  })

router.route('/auth')
  .post(async function(req, res) {
    try {
      const authenticatedUser = await authenticateUser(req.body)
      res.cookie('token', authenticatedUser.token, {
        expires: new Date(Date.now() + (7 * 24 * 60 * 60604800))
      })
      return res.status(200).json({ data: authenticatedUser }).end()
    } catch (err) {
      return res.status(400).json({ err: err.message }).end()
    }
  })

router.route('/logout')
  .delete(logout)

router.route('/products')
  .post(isAuthenticated, async function(req, res) {
    if(req.admin) {
      try {
        const addedProduct = await addNewProduct(req.body)
        if(addedProduct.id) {
          return res.status(200).json({
            message: `Added ${addedProduct.name} to the database`
          }).end()
        }
        throw new Error('Can not add product to the database')
      } catch(err) {
        return res.status(400).json({
          error: err.message
        }).end()
      } 
    } else {
      return res.status(401).json({
        error: 'You are not authorized to perform this action'
      }).end()
    }
  })
  .get(async function(req, res) {
    try {
      const products = await getAllProducts()
      res.status(200).json(products).end()
    } catch(err) {
      res.status(400).json({ error: err.message }).end()
    }
  })

router.route('/products/:id')
  .delete(async function (req, res) {
    try {
      const deletedProduct = await deleteProductById(req.params.id)
      return res.status(200).json({
        message: 'Item deleted successfully'
      }).end()
    } catch (err) {
      return res.status(400).json({ error: err.message}).end()
    }
  })

router.route('/transactions')
  .post(isAuthenticated, async function(req, res) {
    if(req.user.email === req.body.customer) {
      try {
        const newTransaction = await createNewTransaction(req.body)
        if (newTransaction.id) {
          return res.redirect(url.format({
            pathname: '/static/invoice',
            query: newTransaction
          }))
        }
        throw new Error('Error creating transaction for this product!')
      } catch(err) {
        return res.status(400).json({ error: err.message })
      }
    } else {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })

router.route('*')
  .get(function(req, res) {
    res.status(404).json({ error: '404 not found' }).end()
  })

module.exports = router