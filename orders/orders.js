const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://vaibhav:Password@cluster0.igylh.mongodb.net/orderservice?retryWrites=true&w=majority" 
)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to DB to Orders!");
});

require('./models/Order')
const Order = mongoose.model('Order')


app.post("/order", (req, res) => {
    console.log(req.body);
    var newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate 
    }
    var order = new Order(newOrder);
    order.save().then(() => {
        console.log("New Order Created!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new order created with success!");
})
app.get("/orders", (req, res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        if(err){

            throw err;
        }
    })
})
app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
        fetch("http://localhost:5555/customer/" + order.CustomerID).then((response) => {
            response.json().then((data) => {
                var orderObject = {customerName: data.name, bookTitle: ''}
                fetch("http://localhost:4545/book/" + order.BookID).then((response) => {
                    response.json().then((data) => {
                        orderObject.bookTitle = data.title;
                        res.json(orderObject);
                    })
                })
            })
        })           
        }else{
            res.send("Invalid orderID");
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.listen(7777, () => {
    console.log('Server started on 7777 port');
});

app.get('/', (req, res) => {
    res.send('Hello World');
}
);
