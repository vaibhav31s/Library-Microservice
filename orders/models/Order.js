const mongoose = require('mongoose');

mongoose.model("Order", {
    // title, description, price, date, image
    CustomerID : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    BookID : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    initialDate : {
        type : Date,
        require : true
    },
    deliveryDate : {
        type : Date,
        require : true
    }
}
        
)

module.exports = mongoose.model("Order");
