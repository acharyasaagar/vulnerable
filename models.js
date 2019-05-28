const Sequelize = require('sequelize')
const Model = Sequelize.Model
const { database, username, password, host, dialect } = require('./config')

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
})

class Customer extends Model {}
class Item extends Model {}
class Transaction extends Model {}

Customer.init({
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize
})

Item.init({
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemDescription: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize
})

Transaction.init({
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  sequelize
})

Customer.hasMany(Transaction)
Item.belongsToMany(Transaction,  { through: 'ItemTransaction'})
Transaction.belongsToMany(Item,  { through: 'ItemTransaction'})

module.exports = {
  sequelize,
  Customer,
  Item,
  Transaction,
}