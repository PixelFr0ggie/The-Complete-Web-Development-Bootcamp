const mongoose = require('mongoose');

// ----------

// mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true });
//
const fruitSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit({
  _id: 6,
  name: "Pineapple",
  rating: 9,
  review: "Great fruit."
});

// pineapple.save();

// const peach = new Fruit({
//   _id: 5,
//   name: "Peach",
//   rating: 10,
//   review: "Peaches are delicious"
// });
//
// peach.save();

const apple = new Fruit({
  _id: 1,
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

// apple.save();

// const kiwi = new Fruit( {
//   _id: 2,
//   name: "Kiwi",
//   rating: 7,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit( {
//   _id: 3,
//   name: "Orange",
//   rating: 7,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit( {
//   _id: 4,
//   name: "Banana",
//   rating: 7,
//   review: "Weird texture"
// });

// Fruit.insertMany( [kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

// Fruit.find(function(err, fruits) {
//
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(fruits);
//
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
//
//   mongoose.connection.close();
//
// });

// Fruit.updateOne({_id: 5}, {name: "Peach"}, function(err) {
//
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
//
// });

// Fruit.deleteOne({_id: 5}, function(err) {
//
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
//
// });

// ----------

mongoose.connect("mongodb://localhost:27017/peopleDB", { useNewUrlParser: true });

const personSchema = new mongoose.Schema( {
  _id: Number,
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const john = new Person({
//   _id: 1,
//   name: "John",
//   age: 37,
// });

// john.save();

// const jack = new Person({
//   _id: 4,
//   name: "Jack",
//   age: 12,
//   favouriteFruit: pineapple
// });
//
// jack.save();

Person.updateOne( {name: "John"}, {favouriteFruit: apple}, function(err) {

  if (err) {
  console.log(err);
  } else {
    console.log("Successfully updated the document");
  }

});










