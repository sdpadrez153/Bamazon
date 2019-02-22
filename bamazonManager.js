var mysql = require("mysql");
var inquirer = require("inquirer");

// Set up connection to MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Connect to database
connection.connect(function (err) {
    // If theres an error, throw
    if (err) {
        throw err;
    }

    start();
});

function start() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "Menu:",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.choice) {
                case "View Products for Sale":
                    displayTable();
                    break;

                case "View Low Inventory":
                    displayLowInventory();
                    break;

                case "Add to Inventory":
                    addNewInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}

function displayTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);

        start(res);
    });
}

function displayLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);

        start(res);
    });
}

function addNewInventory() {
    inquirer
        .prompt([{
            name: "restock",
            type: "input",
            message: "Enter the ID of the product you would like to incease its inventory: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the amount of this product you would like to add: "
        }
        ])
        .then(function (answer) {
            var get = "SELECT * FROM products WHERE ?";
            connection.query(get, {
                item_id: answer.productToRestock
            }, function (err, res) {
                var query = "UPDATE products SET ? WHERE ?";
                connection.query(query,
                    [
                        {
                            stock_quantity: parseFloat(res[0].stock_quantity) + parseFloat(answer.quantity)
                        },
                        {
                            item_id: answer.productToRestock
                        }
                    ],
                    function (err, res) {
                        if (err) {
                            throw err;
                        }
                        
                        start();
                    });
            });
        });
}

function addNewProduct() {
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "Enter the name of the new product you would like to add: "
        },
        {
            name: "department",
            type: "input",
            message: "Enter the name of the department this product belongs to: "
        },
        {
            name: "price",
            type: "input",
            message: "Enter the price of this product: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the amount of this product you would like to add: "
        }
        ])
        .then(function (answer) {
            var query = "INSERT INTO products SET ?";
            connection.query(query,
                {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: parseInt(answer.price),
                    stock_quantity: parseInt(answer.quantity)
                },
                function (err, res) {
                    if (err) {
                        throw err;
                    }
                });
            
                start();
        });
}