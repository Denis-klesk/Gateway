const { request } = require('express');
const sql = require('mssql')

const config = {
    user: 'sa',
    password: 'PMPdsp111',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'TestDB',
    options: {
        enableArithAbort: true,
        encrypt: true
      },
      pool: {
        max: 3,
        min: 0,
        idleTimeoutMillis: 30000
}}

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.connect(err => {
    err ? console.error(err) : console.log("MSSQL Connection Successful!");
});


(async () => {
    await poolConnect; // ensures that the pool has been created
    try {
    const request = pool.request(); // or: new sql.Request(pool)
    const result = await request.query(`SELECT * FROM MS_test WHERE MS_Number_Int = ${11}`);
    console.log(result);
    await pool.close();
        } 
    catch (err) {
                 console.log(err);    // ... error checks
                }
  }


)();

return sql.close();