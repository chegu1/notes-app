const express = require('express');
const chalk = require('chalk');
const dbConnection = require('./utils/database');
const config = require('config');
const glob = require('glob');
const path = require('path');
const PORT = config.PORT;
const winston = require('./utils/winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//setting environment
if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'localhost'
}

//Importing all routes into the application
glob(
    path.dirname(require.main.filename) + '/routes/*.js',(err,files)=>{
        if(files && files.length){
            files.forEach((file,index)=>{
                console.log(chalk.white.bold.inverse(`route ${index} ${file}`))
                require(file)(app)

            })
        }else {
            console.log(chalk.red.bold("no files was found"))
        }
    }
)

//homeroute
app.get('/',(req,res)=>{
    res.status(200).json({ 
        appname:"notes app",
        port:`${PORT}`,
        env: `${process.env.NODE_ENV}`
    })
})

app.use(morgan('combined', {stream: winston.stream}));
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(chalk.blue.bold(`[+] application is running on port number ${PORT}`));
    console.log(chalk.blue.bold(`[+] appliation is running on ${process.env.NODE_ENV}`));
})