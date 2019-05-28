const models = require('../../models')

const { Customer } = models

function checkPassword(password, payload) {
  return password === payload
}

async function authenticateUser(user) {
  try {
    const { email } = user
    const foundUser = await Customer.findOne({
      where: {
        email
      }
    })
    if(!foundUser.id) throw new Error('Invalid email and password')
    const shouldLogIn = checkPassword(foundUser.password, user.password)
    if(!shouldLogIn) throw new Error('Invalid email and password')
    const tokenPayload = Math.round(Math.random() * 10 * (foundUser.id + Date.now()))
    const token = foundUser.id + '.' + tokenPayload
    await Customer.update({
      token
      }, {
        where: {
          email
        }
      })
    return {
      token,
      id: user.id,
    }
  } catch(err) {
    return err
  }
}

async function isAuthenticated(req, res, next) {
  if(!req.cookies.token) return res.status(401).json({ error: 'Unauthorized'}).end()
  const tokenInReq = req.cookies.token
  const userId = tokenInReq.split('.')[0]
  const user = await Customer.findByPk(userId)
  const tokenInDb = user.token
  if(tokenInDb === tokenInReq) {
    req.user = user
    return next()
  }
}

// async function isAuthenticatedAsAdmin(req, res, next) {
//   if(!req.cookies.token) return res.status(401).json({ error: 'Unauthorized'}).end()
//   const tokenInReq = req.cookies.token
//   const userId = tokenInReq.split('.')[0]
//   const user = await Customer.findByPk(userId)
//   const tokenInDb = user.token
//   if(tokenInDb === tokenInReq && user.isAdmin) {
//     req.admin = user
//     next()
//   }
// }


async function logout(req, res) {
  try {
    if(!req.cookies.token) return res.end()
    const tokenInReq = req.cookies.token
    const userId = tokenInReq.split('.')[0]
    const user = await Customer.update({
      token: null
      }, {
        where: {
          id: userId
        }
      })
    res.clearCookie('token', req.cookies.token)
    return res.status(200).end() 
  } catch (err) {
    return res.status(400).json({ error: err.message }).end()
  }

}

module.exports = {
  authenticateUser,
  isAuthenticated,
  // isAuthenticatedAsAdmin,
  logout
}