
const mysql = require('mysql');
let connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: '',
  // plugin: 'mysql_native_password'
});

// connection.connect();

// getting all data back from the databases
function getAllOrderRecords() {
  connection.query('SELECT * FROM orders', (e, s, fields) => {
    if (e) {
      throw e;
    } else {
      console.log('The solution is: ', s);
    }
  });
}

getAllOrderRecords();

const addRecord = function (visitTimeStamp, username, email, password, addrline1, addrline2, city, state, shipzip, phone, ccnum, expdate, cvv, billzip, callback) {
  let queryScript = `INSERT INTO orders (visitTimeStamp, username, email, password, addrline1, addrline2, city, state, shipzip, phone, ccnum, expdate, cvv, billzip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  connection.query(queryScript, [visitTimeStamp, username, email, password, addrline1, addrline2, city, state, shipzip, phone, ccnum, expdate, cvv, billzip], callback);
}

// // Testing addRecord
// let exampleValues = ["Wed Jul 11 2018", "jens_leerssen", 'notarealaccount@gmail'];

let exampleValues = ["Wed", "jens_leerssen", "jens.leerssen@email.com", "password1", "14 Holten Avenue", "Apt 16B", "Newport", "RI", "02840", "415-555-1212", "1234567890123456", '2018-10-06', 201, "01394-4560"];

addRecord(...exampleValues, function(e,s){
  if (e) {
    console.log("error: " + e, null);
  } else {
    getAllOrderRecords((e,s) => console.log(e,s));
  }
});

// connection.end();

module.exports = { addRecord, getAllOrderRecords }