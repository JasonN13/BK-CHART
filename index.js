const express = require('express')
const sequelize =require('./config/database')
const Empleados = require('./modelos/Empleados');


const  app = express();

app.use(express.json())

var port = 5000;

app.get('/suma-salario-departamento',async(req,resp)=>{

    try {
        const result = await Empleados.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('SUM',sequelize.col('SALARY')), 'Salario Neto']
            ],
            group:['DEPARTMENT_ID']
        })

        resp.json(result)
        
    } catch (error) {
        resp.status(500).json({error:'Ocurrio un error' + error})
    }
})
//select DEPARTMENT_ID,JOB_ID, SUM(salary) from empleado group by DEPARTMENT_ID,JOB_ID;
app.get('/Nombre-Departamento-Salario',async(req,resp)=>{

    try {
        const result = await Empleados.findAll({
            attributes:[
                'DEPARTMENT_ID',
                'JOB_ID',
                [sequelize.fn('SUM',sequelize.col('SALARY','JOB_ID')), 'Salario Neto']
            ],
            group:['DEPARTMENT_ID','JOB_ID']
        })

        resp.json(result)
        
    } catch (error) {
        resp.status(500).json({error:'Ocurrio un error' + error})
    }
})

//select DEPARTMENT_ID, Count(*) from empleado group by DEPARTMENT_ID;
app.get('/Empleados-Departamento',async(req,resp)=>{

    try {
        const result = await Empleados.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('COUNT',sequelize.col('DEPARTMENT_ID')), 'Cantidad de Empleados']
            ],
            group:['DEPARTMENT_ID']
        })

        resp.json(result)
        
    } catch (error) {
        resp.status(500).json({error:'Ocurrio un error' + error})
    }
})


app.listen(port,()=>{
    console.log ('Aplicacion ejecutando en el puerto: ',port)
})