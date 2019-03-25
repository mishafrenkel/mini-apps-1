
DROP DATABASE IF EXISTS sales;

CREATE DATABASE sales;

USE sales;

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
  id INTEGER NOT NULL AUTO_INCREMENT,
  visitTimeStamp VARCHAR(120),
  username VARCHAR(25),
  email VARCHAR(50),
  password VARCHAR(50),
  addrline1 VARCHAR(120),
  addrline2 VARCHAR(120),
  city VARCHAR(25),
  state CHAR(2),
  shipzip VARCHAR(10),
  phone VARCHAR(25),
  ccnum VARCHAR(25),
  expdate DATE,
  cvv INT,
  billzip VARCHAR(10),
  PRIMARY KEY (id)
);

INSERT INTO orders (visitTimeStamp, username, email, password, addrline1, addrline2, city, state, shipzip, phone, ccnum, expdate, cvv, billzip)
VALUES("Wed Jul 11 2018 20:27:03 GMT-0700 (Pacific Daylight Time)", "jens_leerssen", "jens.leerssen@email.com", "password1", "14 Holten Avenue", "Apt 16B", "Newport", "RI", "02840", "415-555-1212", "1234567890123456", '2018-10-06', 201, "01394-4560");
