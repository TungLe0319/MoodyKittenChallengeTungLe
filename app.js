let kittens = [];
let kitten = {};
let mood = '';
let affection = 5;
loadKittens();
drawKittens(); //NOTE stops page refresh from hiding storedkittens

setKittenMood(kitten); //NOTE persists mood/img through page reload
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault(); //NOTE stops page refresh on name submission
  let form = event.target;
  let kittenName = form.name.value; //The Name the User is inputing.
  let currentKitten = kittens.find((kitten) => kitten.name == kittenName);

  // NOTE another way to write this could be an !conditional i think
  if (!currentKitten) {
    if (kittens.length >= 4) {
      alert(
        'Try taking care of the kittens you have first before taking on more!'
      );
      form.reset();
      return;
    }

    let kitten = {
      id: generateId(),
      name: form.name.value,
      mood: 'Tolerant',
      affection: 5,
    };
    kittens.push(kitten);
    drawKittens();
  } else {
    alert("you can't have two of the same kittens at once, try another name!");
    form.reset();
    return;
  }

  saveKittens();
  form.reset();
  drawKittens();
  console.log(kittens);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem('Kittens', JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem('Kittens'));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 * NOTE when doing templates must use backslash ``
 * NOTE SOMETHING IN THIS FUNCTION ISN'T ALLOWING ME TO HAVE BUTTONS SPECIFIC TO
//  * NOTE clearbutton div I want to somehow get it to stay at the bottom right corner of the container
 */
function drawKittens() {
  let kittenCard = document.getElementById('kittens');
  let kittenTemplate = '';
  kittens.forEach((kitten) => {
    kittenTemplate += `
    <div id="card2" class=" container cardEmo m-3 p-2 text-center  position-relative ${kitten.mood}Card w-25  ">
    <div id="catImage" class=" kitten ${kitten.mood}  ${kitten.mood}Mood" >
    <img src="./resources/grumpy.png" alt="CatIMAGE" class="m-3 w-50">
    </div>
    

    <div id="playButtons" class="  d-md-block interactButtons ">
    <button id="feedBtn" class="  btn btn-info interactButton " type="button" onclick="feed('${kitten.id}')" >Feed</button>
    <button class=" m-2 btn btn-warning interactButton " type="button" onclick="pet('${kitten.id}')" >Pet</button>
    <button class=" btn btn-danger text-dark interactButton " type="button" onclick="catnip('${kitten.id}') ">Catnip</button>
    </div>
    <div id="kittenStats" class="  m-1 p-1   ">  
    <div class="cardName">Name: ${kitten.name}</div>
   <div class="cardName ">Mood: ${kitten.mood}</div>
   
   <div class="cardName  "> Affection:<span class="${kitten.mood}Text"> ${kitten.affection}</span></div>
   </div>

  
    <div class=" position-absolute bottom-0 end-0 ">
    <button id="clearButton" type="button" class="btn-cancel" onclick="clearKittens('${kitten.id}')">
  
    <i class="fa-solid fa-shield-cat fa-lg"></i>
    </button>
    </div>
    </div>
    
    `;
  });
  kittenCard.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * NOTE changing the comparion == to ===instead solved the problem of buttons affecting only one element kitten
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((kitten) => kitten.id === id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id);
  let rNum = Math.random();

  //Caps button at 10
  if (currentKitten.affection == 10) {
    return;
  }

  // Caps button at 0
  if (currentKitten.affection == 0) {
    return;
  }

  if (rNum >= 0.7) {
    currentKitten.affection--;
    setKittenMood(currentKitten);
    saveKittens();
  } else {
    currentKitten.affection++;
    setKittenMood(currentKitten);
    saveKittens();
  }
  // if (rNum < 0.5) {
  //   currentKitten.affection++;
  //   setKittenMood(currentKitten);
  //   saveKittens();
  // }
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function feed(id) {
  let currentKitten = findKittenById(id);
  let rNum = Math.random();

  //Caps button at 0
  if (currentKitten.affection == 10) {
    return;
  }

  //Caps button at 0
  if (currentKitten.affection == 0) {
    return;
  }

  if (rNum >= 0.7) {
    currentKitten.affection++;
    setKittenMood(currentKitten);
    saveKittens();
  } else {
    currentKitten.affection--;
    setKittenMood(currentKitten);
    saveKittens();
  }

  // if (rNum > 0.5) {
  //   currentKitten.affection--;
  //   setKittenMood(currentKitten);
  //   saveKittens();
  // }
  // if (rNum < 0.5) {
  //   currentKitten.affection--;
  //   setKittenMood(currentKitten);
  //   saveKittens();
  // }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);

  //Caps button at 0
  if (currentKitten.affection == 0) {
    return;
  }

  currentKitten.affection = 5;
  currentKitten.mood = 'Tolerant';
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * NOTE i messed up assuming i should've switched the param kitten to id instead,broke the buttons properly affecting the correct kitten. next time just go with what is given to me before changing code.
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById('catImage').classList.remove(kitten.mood);
  if (kitten.affection >= 10) {
    kitten.mood = 'happy';
  }
  if (kitten.affection == 5) {
    kitten.mood = 'tolerant';
  }
  if (kitten.affection <= 3) {
    kitten.mood = 'angry';
  }
  if (kitten.affection == 0) {
    kitten.mood = 'gone';
  }
  document.getElementById('catImage').classList.add(kitten.mood);
  document.getElementById('card2').className += kitten.mood;
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 * NOTE possibly using the find index for the buttons will solve the problem of secondary cards affecting the first one
 */
function clearKittens(id) {
  kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  kittens.splice(kittenIndex, 1);
  saveKittens();
  drawKittens(); //NOTE resets the page and removes the kittens without delay
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById('welcome').remove();
  document.getElementById('nameInput').classList.remove('hidden');
  document.getElementById('kittens').classList.toggle('hidden');
  loadKittens();
  drawKittens();
}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    '-' +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens();
