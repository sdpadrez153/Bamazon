var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }

    displayTable();
});

function displayTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        start();
    });

}

function start() {
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "Enter the ID of the product you would like to buy: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the amount of this product would you like: "
        }
        ])
        .then(function (answer) {
            purchase(answer.productToBuy, answer.quantity);
        });
}

function purchase(id, amount) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, { item_id: id }, function (err, res) {
        if (err) {
            console.log("ID is invalid!");
            throw err;
        }
        if (res[0].stock_quantity <= 0) {
            console.log("Insufficient quantity!");
        } else {
            var total = (parseFloat(amount) * parseFloat(res[0].price));
            console.log("Your total cost is: $" + total);
            var updateQuery = "UPDATE products SET ? WHERE ?";
            connection.query(updateQuery,
                [
                    {
                        stock_quantity: res[0].stock_quantity-amount
                    },
                    {
                        item_id: id
                    }
                ],
                function (err, res) {
                    if (err) {
                        throw err;
                    }
                });
        }
        displayTable();
    });
}