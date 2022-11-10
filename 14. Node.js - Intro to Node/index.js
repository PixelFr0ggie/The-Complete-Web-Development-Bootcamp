// console.log("Hello World!");

// const fs = require("fs");
// fs.copyFileSync("file1.txt", "file2.txt");

const superheroes = require('superheroes');
var mySuperHeroName = superheroes.random();
console.log("My Hero: " + mySuperHeroName);

const supervillains = require('supervillains');
var mySuperVillainName = supervillains.random();
console.log("My Villain: " + mySuperVillainName);
