let kittens = [];
let currentKitten = {};
let mood = "";
let affection = 5;

// NOTE persists Kittens through page reload
loadKittens();
drawKittens();
setKittenMood(currentKitten);
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault(); //NOTE stops page reload on kitten name submission
  let form = event.target;

  let kittenName = form.name.value;
  currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  if (!currentKitten) {
    currentKitten = {
      id: generateId(),
      name: kittenName,
      mood: "Tolerant",
      affection: 5,
    };
    kittens.push(currentKitten);
    saveKittens();
  } else {
    alert("you already have this cat");
  }
  document.getElementById("welcome").className += "hidden";
  drawKittens();
  setKittenMood(currentKitten); //NOTE here it stops the mood crossing over onto new kittens made.
  form.reset();
  console.log(currentKitten);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
//  */
// NOTE here i am using a good amount of ${} references here. the buttons i need to make sure in template literals to put the Id/type/class/onclick in that order for it to function properly. button onclick is what is setting off the change in the HTML values
// NOTE Remember when making templates i must use BACKTICK `` not single Quotation marks''
function drawKittens() {
  loadKittens();

  let kittenElement = document.getElementById("kittens");
  let kittensTemplate = "";
  kittens.forEach((kitten) => {
    kittensTemplate += `
    <div id="kittens" class=" kittyBox pl-3">
        <span id="grumpyCat" class="grumpy">
          <img  src="/resources/pngaaa.com-2850009.png" alt="GRUMPY CAT" width="200" height="250">
        </span>
<div id="interactions" class="interactButtons d-flex align-center flex-wrap ">

  <button id="catNipButton" type="button" class=""  onclick="catnip('${kitten.id}')" > <img  src="/resources/spray.png" alt="catNip" width="40" height="50">Catnip</button>
     
<button  id="catPetButton type="button" class="m-2" onclick="pet('${kitten.id}')"> <img  src="/resources/pet.png" alt="PetCat" width="50" height="50">Pet </button>

<button id="catFeedButton" type="button"   onclick="feed('${kitten.id}')" >  <img  src="/resources/cat.png" alt="FEED" width="50" height="50">Feed</button>
</div>

<div class="kittenStats  display: inline-block;">
  <div>
   <span>Name :</span>
    <span id="kitten-name">${kitten.name}</span>
  </div>
  
  <div id="kittenMoody" class="mt-1 mb-1">
    <span>Mood :</span>
    <span id="kittenMood" >${kitten.mood}</span>
  </div>
  
  <div>
  <span>Affection :</span>
  <span id="kittenAffection">${kitten.affection}</span>
  </div>

  </div>
  <button class="deleteButton d-flex align-items-center justify-content-center" type="button"onclick="clearKittens('${kitten.id}')"> <i class="fa fa-trash" aria-hidden="true"></i></button>
  </div>
  
  </div>
  

  
      
      `;
  });
  kittenElement.innerHTML = kittensTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
// NOTE returns the value of the array which is kittens, the function name is kitten and matching the kitten.id
function findKittenById(id) {
  return kittens.find((kitten) => (kitten.id = id));
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
  if (currentKitten.affection >= 10) {
    if (rNum > 0.5) {
      currentKitten.affection--;
    }
    return; //NOTE stops the function when condition is met.
  }

  if (rNum > 0.5) {
    currentKitten.affection--;

    saveKittens();
  } else {
    currentKitten.affection--;
    saveKittens();
  }
  setKittenMood(currentKitten);
  console.log("current Affection", currentKitten.affection);
  console.log(rNum);
}

function feed(id) {
  let currentKitten = findKittenById(id);
  let rNum = Math.random();
  if (currentKitten.affection >= 10) {
    if (rNum > 0.5) {
      currentKitten.affection--;
    }
    return; //NOTE stops the function when condition is met.
  }

  if (rNum > 0.5) {
    currentKitten.affection++;

    saveKittens();
  } else {
    currentKitten.affection++;
    saveKittens();
  }
  setKittenMood(currentKitten);
  console.log("current Affection", currentKitten.affection);
}

/**

 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);

  currentKitten.mood = "Tolerant";
  currentKitten.affection = 5;

  saveKittens();
  setKittenMood(currentKitten);
}

// NOTE  TRYING TO SET KITTEN MOOD DEPENDING ON AFFECTION LEVEL, STILL NEED TO DO
// NOTE WAS ABLE TOP ACCESS THE KITTEN IMAGE CLASS AND ADDING IT BELOW USING .className +=
/**
//  * NOTE GOT IT TO WORK HAD TO USE find KittenByID function AND ADD ${kitten.mood} INTO MY TEMPLATE LITERAL
 * Sets the kittens mood based on its affection
// TODO ADD functions into this one that caps the affection off at 10 and 0 
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let currentKitten = findKittenById(kitten);

  if (currentKitten.affection >= 10) {
    document.getElementById("kittens").className += "kitten happy";
    currentKitten.mood = "Happy";
    console.log("happy");
  }
  if (currentKitten.affection <= 5) {
    document.getElementById("kittens").className += "kitten tolerant";
    currentKitten.mood = "Tolerant";
    console.log("tolerant");
  }
  if (currentKitten.affection <= 3) {
    document.getElementById("kittens").className += "kitten angry";

    currentKitten.mood = "Angry";
    console.log("angry");
  }
  if (currentKitten.affection <= 0) {
    document.getElementById("kittens").className += "kitten gone ";
    currentKitten.mood = "grumpyCat";
    alert("you scared him away! remove current kitten! and begin another!");
    console.log("gone");
  }

  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  let kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  var result = confirm("FareTheeWell Sir Kitten");
  if (result) {
  }

  kittens.splice(kittenIndex, 1);
  saveKittens();
  window.location.reload(); //NOTE reloads page so when a new kitten is added it doesn't begin as "GONE"
}

// TODO WANT THE GAME TO END ONCE AFFECTION HITS 10 or 0 MAKING THE CAT HAPPY OR ANGRY if ANGRY THEN GONE IF HAPPY THEN BLUE GLOW AND KITTEN MEOW
/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
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
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens();
