// Load Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// Load Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://vaibhav:Password@cluster0.igylh.mongodb.net/bookservice?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", () => console.log("Error connecting to MongoDB"));
db.once("open", () => console.log("Connected to MongoDB"));

// Load Model
require("./Book");
const Book = mongoose.model("Book");

app.get("/", (req, res) => {
    res.send("This is our main endpoint!");
});

app.get("/books", (req, res) => {
   Book.find().then((books) => {
    res.json(books);
    }).catch(err => {
        if(err){
            throw err;
        }
    }
    );
});

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book);
        }else{
            res.sendStatus(404);
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    });
});

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send("Book removed with success!");
    }
    ).catch(err => {
        if(err){
            throw err;
        }
    }
    );
    
});

app.post("/book", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };
  // create new book with newBook object
  var book = new Book(newBook);
  book
    .save()
    .then(() => {
      console.log("New Book created!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("A new book created with success!");
});

app.listen(4545, () =>
  console.log("Up and runnning ! -- This is our Books service running...")
);
