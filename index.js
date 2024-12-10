const express = require('express')
const sequelize =require('./config/database')
const Empleados = require('./modelos/Empleados');
const Productos = require('./modelos/Productos');
const { Sequelize } = require('sequelize');
const cors = require('cors');


const  app = express();

app.use(express.json())

var port = 5000;

const corsRutas = {
    origin:'http://localhost:3000'

}

app.use('/Valor_Promedio',cors(corsRutas));
app.use('/Cantidad_Marca',cors(corsRutas));
app.use('/Valor_TOTAL',cors(corsRutas));


/*
app.get('/suma-salario-departamento',async(req,resp)=>{

    try {
        const result = await Empleados.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('SUM',sequelize.col('SALARY')), 'Salario_Neto']
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
                [sequelize.fn('SUM',sequelize.col('SALARY','JOB_ID')), 'Salario_Neto']
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
                [sequelize.fn('COUNT',sequelize.col('DEPARTMENT_ID')), 'Cantidad_de_Empleados']
            ],
            group:['DEPARTMENT_ID']
        })

        resp.json(result)
        
    } catch (error) {
        resp.status(500).json({error:'Ocurrio un error' + error})
    }
})
*/

//Examen del segundo parcial 



//SELECT categoryCode, AVG(CAST(value AS DECIMAL)) AS average_valueFROM productoGROUP BY categoryCode;
app.get('/Valor_Promedio',async(req,resp)=>{

    try {
        const result = await Productos.findAll({
            attributes:[
                'categoryCode',
                [sequelize.fn('AVG',sequelize.cast(sequelize.col('value'),'DECIMAL')),'average_value']
            ],
            group:['categoryCode'],
        })
        resp.json(result);
    } catch (error) {
        console.log('Error con el valor promedio de productos',error)
        resp.status(500).json({error:'Ocurrio un error' + error})
        
    }
})

app.get('/Cantidad_Marca',async(req,resp)=>{

    try {
        const result = await Productos.findAll({
            attributes:[
                'brandCode',
                [sequelize.fn('COUNT',sequelize.col('brandCode')),'Cantidad_Marcar']
            ],
            group:['brandCode'],
        })
        resp.json(result);
    } catch (error) {
        console.log('Error con la cantidad de procucto por marca',error)
        resp.status(500).json({error:'Ocurrio un error' + error})
        
    }
}) 

app.get('/Valor_TOTAL',async(req,resp)=>{

    try {
        const result = await Productos.findAll({
            attributes:[
                'categoryCode',
                [Sequelize.fn('SUM', Sequelize.cast(Sequelize.fn('REPLACE', Sequelize.col('value'), '$', ''), 'DECIMAL')), 'total_value']
            ],
            group:['categoryCode'],
        })
        resp.json(result);
    } catch (error) {
        console.log('Error con la cantidad de procucto por marca',error)
        resp.status(500).json({error:'Ocurrio un error' + error})
        
    }
}) 

app.listen(port,()=>{
    console.log ('Aplicacion ejecutando en el puerto: ',port)
})


