const mysql = require('mysql2')
const config = require('../config.js')


// const db = mysql.createPool(config);
const db = mysql.createConnection(config);
db.on("connection", connection => {
    connection.on("error", err => {
        console.error(new Date(), "MySQL error", err.code);
        //db.end()
    });
    connection.on("close", err => {
        console.error(new Date(), "MySQL close", err);
    });
});
module.exports = db;





