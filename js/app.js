'use script';
//calls pic info from html
var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');

var pictureArray = [];
var roundArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'];
//write a constructor function that contains name and file path
// create array that holds number of times a product was clicked
//global variables
//create array that holds number of rounds to possibly change later
//store calculate and visually display the results
//add event.listener "click" function

function PictureObject(src, name) {
  this.src = `../images/${src}.jpg`;
  this.title = name;
  this.alt = name;

  pictureArray.push(this);
}

console.log(new PictureObject('apple-salad', 'pear bisque'));
