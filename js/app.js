'use script';
//calls pic info from html
var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var imageContainer = document.getElementById('random-container');

var pictureArray = [];
var roundArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'];
////write a constructor function that contains name and file path
// create array that holds number of times a product was clicked
//global variables
//create array that holds number of rounds to possibly change later
//store calculate and visually display the results
//add event.listener "click" function

function PictureObject(src, name) {
  this.src = `../images/${src}.jpg`;
  this.title = name;
  this.alt = name;
  //create array to keep track of clicks and times seen
  this.clicked = 0;
  this.timesViewed = 0;

  pictureArray.push(this);
}

function indexAtRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function imageGenerator() {
  var firstPicture = indexAtRandom(pictureArray.length);
  picOne.src = pictureArray[firstPicture].src;
  picOne.title = pictureArray[firstPicture].title;
  picOne.alt = pictureArray[firstPicture].alt;

  pictureArray[firstPicture].timesViewed ++;

  var secondPicture = indexAtRandom(pictureArray.length);
  while(secondPicture === firstPicture) {
    secondPicture = indexAtRandom(pictureArray.length);
  }
  picTwo.src = pictureArray[secondPicture].src;
  picTwo.title = pictureArray[secondPicture].title;
  picTwo.alt = pictureArray[secondPicture].alt;

  pictureArray[secondPicture].timesViewed ++;

  var thirdPicture = indexAtRandom(pictureArray.length);
  while (thirdPicture === secondPicture || thirdPicture === firstPicture) {
    thirdPicture = indexAtRandom(pictureArray.length);
  }
  picThree.src = pictureArray[thirdPicture].src;
  picThree.title = pictureArray[thirdPicture].title;
  picThree.alt = pictureArray[thirdPicture].alt;

  pictureArray[thirdPicture].timesViewed ++;

  console.table(pictureArray);

}

//event listener will go here
function handleClick(event) {
  var vote = event.target.title;
  for(var i = 0; i < pictureArray.length; i++) {
    if(vote === pictureArray[i].title) {
      pictureArray[i].clicked++;
    }
  }
  imageGenerator();

}

function createPictureList() {
  new PictureObject('bag', 'R2D2 Bag');
  new PictureObject('banana', 'Banana Cutter');
  new PictureObject('bathroom', 'Bathroom Tech Stand');
  new PictureObject('boots', 'Toad Rain Boots');
  new PictureObject('breakfast', 'Breakfast In One');
  new PictureObject('bubblegum', 'Meatball BubbleGum');
  new PictureObject('chair', 'The Round Chair');
  new PictureObject('cthulhu', 'Eye of Cthulhu');
  new PictureObject('dog-duck', 'Dog Duck Mix');
  new PictureObject('dragon', 'Dragon Meat');
  new PictureObject('pen', 'Silverware Pen');
  new PictureObject('pet-sweep', 'Pet Mops');
  new PictureObject('scissors', 'Pizza Scissors');
  new PictureObject('shark', 'Shark Sleeping Bag');
  new PictureObject('sweep', 'Baby Broom');
  new PictureObject('tauntaun', 'TaunTaun Sleeping Bag');
  new PictureObject('unicorn', 'Canned Unicorn Meat');
  new PictureObject('usb', 'Kraken USB');
  new PictureObject('water-can', 'Self Watering Coffee Mug');
  new PictureObject('wine-glass', 'Egg Shaped Wine Glass');
}



createPictureList();
imageContainer.addEventListener('click', handleClick);
imageGenerator();


