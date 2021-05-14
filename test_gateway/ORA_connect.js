const oracledb = require('oracledb');

try   
      {
        oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_10'});
      } 
      
      catch (err)  
                    {
                       console.error('Whoops!');
                       console.error(err);
                       process.exit(1);
                    }


oracledb.autoCommit = true; 

async function run() {

                         let pool;

                         try {
                                 pool = await oracledb.createPool({
                                 user          : "SYSTEM",
                                 password      : "PMPdsp111",
                                 connectString : "localhost/XE",
                                 poolIncrement : 0,
                                 poolMax       : 4,
                                 poolMin       : 4
                                 });
                                 

                          let connection 
                          
                          try {
                                connection = await pool.getConnection();
                                console.log('Сonnection was established\n');
                                let result = await connection.execute(`SELECT * FROM SYSTEM."OR_test" WHERE "OR_Number_Int" = ${22}`,[], {outFormat: oracledb.OUT_FORMAT_OBJECT});
                                console.log("Result is:", result);
                                //console.log("Result is:", result.rows[0].OR_Number_Int);
                              }

                              catch(err) {
                                          console.log('Error in processing:\n', err);
                                         }
                                         
                              finally {
                                          if (connection) {
                                              try {
                                                      await connection.close();
                                                      console.log('Сonnection was closed\n');
                                                  } 
                                                  
                                              catch(err) {
                                                             console.log('Error in closing connection:\n', err);
                                                         }
                                          }
                                        }

                             } catch (err) {
                                        console.error(err.message);
                                           } 
                                           
                              finally {
                                        await pool.close();
                                      }

                      }
run();          