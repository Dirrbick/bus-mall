'use script';
//calls pic info from html
var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var imageContainer = document.getElementById('random-container');
var voteCount = document.getElementById('voteList');
var roundCount = document.getElementById('countdown');
var mainRemove = document.getElementById('removeMe');
var pictureArray = [];
var pictureArrayContainers = [picOne, picTwo, picThree];
var roundNumber = 25;


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

function showElement(elem) {
  elem.style.display = 'block';
}
function hideElement(elem) {
  elem.style.display = 'none';
}
var previousPictures = [];

function imageGenerator() {
  var currentPictures = [];
  for(var i = 0; i < pictureArrayContainers.length; i ++){
    var randomIndexCurrently = indexAtRandom(pictureArray.length);
    while (currentPictures.includes(randomIndexCurrently) || currentPictures.includes(previousPictures) || previousPictures.includes(randomIndexCurrently)){
      randomIndexCurrently = indexAtRandom(pictureArray.length);
    }
    currentPictures.push(randomIndexCurrently);
    pictureArrayContainers[i].src = pictureArray[randomIndexCurrently].src;
    pictureArrayContainers[i].title = pictureArray[randomIndexCurrently].title;
    pictureArrayContainers[i].alt = pictureArray[randomIndexCurrently].alt;
    pictureArray[randomIndexCurrently].timesViewed++;
    previousPictures = currentPictures;
  }
  // console.table(pictureArray);
  // console.log(newPicArray);
  console.log('after', previousPictures);

}
roundCount.textContent = `You have ${roundNumber} guesses left`;
//event listener will go here
function handleClick(event) {
  roundNumber--;
  roundCount.textContent = `You have ${roundNumber} guesses left`;
  if (roundNumber !== 0){
    var vote = event.target.title;
    for (var i = 0; i < pictureArray.length; i++){
      if(vote === pictureArray[i].title) {
        pictureArray[i].clicked++;
      }
    }
    imageGenerator();
  } else {
    imageContainer.removeEventListener('click', handleClick);
    console.log('I stopped');
    voteTally();
    hideElement(mainRemove);
  }
}


function voteTally() {
  var ulEl = document.createElement('ul');
  for (var i = 0; i < pictureArray.length; i ++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${pictureArray[i].title}: ${pictureArray[i].clicked} clicks & ${pictureArray[i].timesViewed} views`;
    ulEl.appendChild(liEl);
  }
  voteCount.appendChild(ulEl);
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


