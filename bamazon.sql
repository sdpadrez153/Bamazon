DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Monster", "Food and Drink", 31.99, 100),
  ("Red Bull", "Food and Drink", 47.99, 200),
  ("Destiny 2", "Video Games", 49.99, 20),
  ("Call of Duty", "Video Games", 39.99, 5),
  ("Cup of Noodels", "Food and Drink", 10.99, 200),
  ("Under Armour Shirt", "Clothing", 19.99, 25),
  ("RVCA Hat", "Clothing", 25.99, 100),
  ("Gladiator", "Movies", 19.99, 100),
  ("Printer Paper", "Computer Supplies", 19.99, 35),
  ("Printer Ink", "Computer Supplies", 29.9, 100);

  CREATE TABLE departments(
  department_id INT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  primary key(department_id)
);

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES 
  ("Video Games", 200),
  ("Food and Drink", 100),
  ("Clothing", 300),
  ("Movies", 35),
  ("Computer Supplies", 100);
