let kittens = [];
let currentKitten = {};
let mood = "";
let affection = 5;
// NOTE persists Kittens through page reload
drawKittens();
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
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
  }

  drawKittens();
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
 */
function drawKittens() {
  loadKittens();

  let kittenElement = document.getElementById("kittens");
  let kittensTemplate = "";
  kittens.forEach((kitten) => {
    kittensTemplate += `
    <div id="kittens" class=" kittyBox">
        <span id="grumpyCat" class="grumpy">
          <img  src="/pngaaa.com-2850009.png" alt="GRUMPY CAT" width="200" height="250">
        </span>
<div class="interactButtons dflex align-center flex-wrap ">
  <button id="catNipButton" type="button" class=""  onclick="catnip('${kitten.id}')" > <img  src="/spray.png" alt="catNip" width="40" height="40">Catnip</button>
     
<button  type="button" class="m-2" onclick="pet('${kitten.id}')"> <img  src="/pet.png" alt="PetCat" width="50" height="50">Pet </button>

<button type="button"   onclick="feed('${kitten.id}')" >  <img  src="/cat.png" alt="FEED" width="50" height="50">Feed</button>
</div>

<div class="kittenStats  display: inline-block;">
  <div>
   <span>Name:</span>
    <span id="kitten-name">${kitten.name}</span>
  </div>
  
  <div id="kittenMoody">
    <span>Mood:</span>
    <span id="kittenMood" >${kitten.mood}</span>
  </div>
  
  <div>
  <span>Affection:</span>
  <span id="kittenAffection">${kitten.affection}</span>
  <button class="deleteButton" type="button"onclick="clearKittens('${kitten.id}')"> <i class="fa fa-trash" aria-hidden="true"></i></button>
</div>
  </div>
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
  if (rNum > 0.5) {
    currentKitten.affection++;

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

/**
//  * TODO MAKE CAPNIP TURN OFF AFTER it's LESS THAN 4 
TODO STILL NEED TO MAKE GAME END AT 10
TODO DISABLE BUTTONS ONCE CAT IS GONE
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);

  let rNum = Math.random();

  if (rNum > 0.5) {
    currentKitten.affection += 5;
    saveKittens();
  } else {
    currentKitten.affection += 0;
  }
}

// NOTE  TRYING TO SET KITTEN MOOD DEPENDING ON AFFECTION LEVEL, STILL NEED TO DO
/**
//  * NOTE GOT IT TO WORK HAD TO USE find KittenByID function AND ADD ${kitten.mood} INTO MY TEMPLATE LITERAL
 * Sets the kittens mood based on its affection
// TODO ADD functions into this one that caps the affection off at 10 and 0 
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let currentKitten = findKittenById(kitten);
  if (currentKitten.affection >= 10) {
    currentKitten.mood = "Happy";
    document.getElementById("kittens").className += "kitten happy";
    console.log("happy");
  }
  if (currentKitten.affection <= 5) {
    console.log("tolerant");
    document.getElementById("kittens").className += "kitten tolerant";
    currentKitten.mood = "Tolerant";
  }
  if (currentKitten.affection <= 3) {
    console.log("angry");
    document.getElementById("kittens").className += "kitten angry";
    currentKitten.mood = "Angry";
  }
  if (currentKitten.affection <= 0) {
    console.log("gone");
    document.getElementById("kittens").className += "kitten gone";
    currentKitten.mood = "Gone";
    alert(
      "you scared him away forever! remove current kitten! and begin another!"
    );
  }

  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  let kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  var result = confirm("Are you sure you want to lose this kitten?");
  if (result) {
  }

  if (kittenIndex == -1) {
    throw new Error("Invalid Kitten ID");
  }
  kittens.splice(kittenIndex, 1);
  saveKittens();
}

// TODO WANT THE GAME TO END ONCE AFFECTION HITS 10 or 0 MAKING THE CAT HAPPY OR ANGRY if ANGRY THEN GONE IF HAPPY THEN BLUE GLOW AND KITTEN MEOW
/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
  document.getElementById("kittens").classList.remove("hidden");
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
