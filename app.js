// require mongoose library to run
const mongoose = require("mongoose");

// initiate new connection from mongoose
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ----------------------------------------------------------------------------------------------------------
// declaring the schema for the object "fruits"
const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  }, // type and validation
  review: String
});
// initiating model
const Fruit = mongoose.model("Fruit", fruitsSchema);
// inserting new documents
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Nice taste"
});
// save the documents
// fruit.save();


// ----------------------------------------------------------------------------------------------------------
// PERSON
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruits: fruitsSchema //connection to fruits schema
});

const Person = mongoose.model("Person", personSchema);

// NEW FRUITS
const mango = new Fruit({
  name: "Mango",
  rating: 9,
  review: "Nice sweet taste"
});
// mango.save();

// INSERT NEW PERSON
const person = new Person({
  name: "Julia",
  age: 28,
  favFruits: mango
});
// person.save();


// ----------------------------------------------------------------------------------------------------------
// UPDATE WITH FRUITS SCHEMA
Person.updateOne(
  {name: "Ali"},
  {favFruits: mango},
  function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully updated person favFruits!");
    }
});

// const orange = new Fruit({
//   name: "Orange",
//   rating: 8,
//   review: "Nice taste"
// });
// const lemon = new Fruit({
//   name: "Lemon",
//   rating: 7,
//   review: "Nice taste"
// });
// const pear = new Fruit({
//   name: "Pear",
//   rating: 5,
//   review: "Nice taste"
// });

// Fruit.insertMany([orange,lemon,pear], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Insert successfully");
//   }
// });

// FIND & DISPLAY
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    // Arrays of objects to single/each object
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// UPDATE
// Fruit.updateOne(
//   {_id:"60d9f32cc1368f477c9a476f"},
//   {name:"Rambutan"},
//   function(err){
//     if (err){
//       console.log(err);
//     }else{
//       console.log("Successfully update!");
//     }
//   }
// );

// DELETE
// Fruit.deleteOne(
//   {name:"Lemon"},
//   function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Successfully delete!");
//     }
//   }
// );
// DELETE ALL
// Fruit.deleteMany(
//   {name:"John"},
//   function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Successfully delete all!");
//     }
//   }
// );

// find all through documents
const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  // Find some documents
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};