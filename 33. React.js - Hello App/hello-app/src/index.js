import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

// --- ES6 Spread Operators ---
const citrus = ["Lime", "Lemon", "Orange"];
const fruits = ["Apple", ...citrus, "Banana", "Coconut"];
// console.log(fruits);

const fullName = {
  fName: "James",
  lName: "Bond"
};
const user = {
  ...fullName,
  fullName,
  id: 1,
  username: "jamesbond007"
};
// console.log(user);
