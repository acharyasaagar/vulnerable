const express = require('express')

const customerRegistrationService = require('./services/customer/registration.service')
const { authenticateUser, isAuthenticated, logout } = require('./services/customer/authentication.service')

const router = express.Router()

router.route('/register')
  .post(async function(req, res) {
    try {
      const customer = await customerRegistrationService(req.body)
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

router.route('*')
  .get(function(req, res) {
    res.status(404).json({ error: '404 not found' }).end()
  })

module.exports = router