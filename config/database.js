const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('empleados','root','123456',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;