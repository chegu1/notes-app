const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const URL = config.mongoURI;

const connection = 
        mongoose
        .connect(URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then((resp)=>{
            console.log(chalk.blue.bold("[+] database connected successfully"))
        })
        .catch((err)=>{
            console.log("error in connection")
        })

module.exports = connection;