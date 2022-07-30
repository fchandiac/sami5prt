
const {Sequelize, DataTypes} = require('sequelize')
const db = {};
const config = require('../js/config')

db.connection = new Sequelize(config.database,config.user_name,config.password, {
    host: config.host, 
    timezone: config.locale,
    dialect: config.dialect,
    dialectOptions: {
    decimalNumbers: true
    }
});

db.Categories = require('./models/categories')(db.connection, DataTypes);
db.Taxes = require('./models/taxes')(db.connection, DataTypes);
db.Products = require('./models/products')(db.connection, DataTypes);
db.Prices = require('./models/prices')(db.connection, DataTypes);
db.Sales = require('./models/sales')(db.connection, DataTypes);
db.SalesDetails = require('./models/sales_details')(db.connection, DataTypes);
db.Stocks = require('./models/stocks')(db.connection, DataTypes);
db.Orders = require('./models/orders')(db.connection, DataTypes);
db.OrdersDetails = require('./models/orders_details')(db.connection, DataTypes);
db.Deliveries = require('./models/deliveries')(db.connection, DataTypes);


db.Sales.hasMany(db.SalesDetails)
db.SalesDetails.belongsTo(db.Products)
db.SalesDetails.belongsTo(db.Categories)
db.SalesDetails.belongsTo(db.Sales)
db.Products.belongsTo(db.Categories)
db.Products.belongsTo(db.Prices)
db.Stocks.belongsTo(db.Products)
db.OrdersDetails.belongsTo(db.Orders)
db.Deliveries.belongsTo(db.Orders)
db.OrdersDetails.belongsTo(db.Products)





module.exports = db;


