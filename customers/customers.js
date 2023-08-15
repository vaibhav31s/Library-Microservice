const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
mongoose.connect(
    "mongodb+srv://vaibhav:Password@cluster0.igylh.mongodb.net/customerservice?retryWrites=true&w=majority" 
)

const db = mongoose.connection
db.on("error", () => console.log("Error connecting to MongoDB"));
db.once("open", () => console.log("Connected to MongoDB - Customer Service"));

require('./models/Customer')
const Customer = mongoose.model('Customer')

app.use(express.json())

app.post('/customer', (req, res) => {
    console.log(req.body)
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    var customer = new Customer(newCustomer)
    customer.save().then(() => {
        console.log("New customer created")
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
    res.send("A new customer created with success")
})

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.sendStatus(404)
        }
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("Customer removed with success")
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})



app.listen(5555, () => {
    console.log('Server is running on port 5555')
}
)