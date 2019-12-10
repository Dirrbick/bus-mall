'use strict';
//calls pic info from html
var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var imageContainer = document.getElementById('random-container');
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
  this.src = `images/${src}.jpg`;
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
    while (currentPictures.includes(randomIndexCurrently) || previousPictures.includes(randomIndexCurrently)){
      randomIndexCurrently = indexAtRandom(pictureArray.length);
    }
    currentPictures.push(randomIndexCurrently);
    pictureArrayContainers[i].src = pictureArray[randomIndexCurrently].src;
    pictureArrayContainers[i].title = pictureArray[randomIndexCurrently].title;
    pictureArrayContainers[i].alt = pictureArray[randomIndexCurrently].alt;
    pictureArray[randomIndexCurrently].timesViewed++;
  }
  previousPictures = currentPictures;

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
        var storageString = JSON.stringify(pictureArray);
        localStorage.setItem('voting', storageString);
      }
    }
    imageGenerator();
  } else {
    imageContainer.removeEventListener('click', handleClick);
    hideElement(mainRemove);
    populateChart();
  }
}
//Create chart
var titleLabel = [];
var viewLabel = [];
var clicksLabel = [];


function tableData () {
  titleLabel = [];
  viewLabel = [];
  clicksLabel = [];
  for (var i = 0 ; i < pictureArray.length; i++) {
    titleLabel.push(pictureArray[i].title);
    viewLabel.push(pictureArray[i].timesViewed);
    clicksLabel.push(pictureArray[i].clicked);
  }
}
function populateChart (){
  tableData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: titleLabel,
      datasets: [{
        label: 'Times Clicked',
        backgroundColor: 'rgb(238,130,238)',
        borderColor: 'rgb(0, 0, 0)',
        data: clicksLabel,
      },
      {
        label: 'Times Viewed',
        backgroundColor: 'rgb(212, 175, 55)',
        borderColor: 'rgb(0,0,0)',
        data: viewLabel,
      }],
    },
    // Configuration options go here
    options: {},
  });
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



imageContainer.addEventListener('click', handleClick);

//local storage info gets stored


function onPageLoad(){
  if (localStorage.voting){
    var getCharacter = localStorage.getItem('voting');
    pictureArray = JSON.parse(getCharacter);
    imageGenerator();
  } else {
    createPictureList();
    imageGenerator();
  }
}

onPageLoad();
