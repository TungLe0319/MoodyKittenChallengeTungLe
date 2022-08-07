let kittens = [];

loadKittens();
drawKittens(); //NOTE stops page refresh from hiding storedkittens
setKittenMood(id);

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
  let kittenName = form.name.value;
  let currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
  };

  if (currentKitten) {
    alert("you already have this cat!");
    form.reset();
    return; // STOPS THE FUNCTION HERE
  }

  kittens.push(kitten);
  saveKittens();
  form.reset();
  console.log(kitten);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("Kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("Kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 * NOTE when doing templates must use backslash ``
 */
function drawKittens() {
  kittenCard = document.getElementById("kittens");
  kittenTemplate = "";
  kittens.forEach((kitten) => {
    kittenTemplate += `
    <div id="catImage" class="container-fluid cardEmo m-2    p-2 align-items-center text-center  ">
    <img src="moody-logo.png"  alt="Moody Kittens" class="m-5 w-50  ">

    <div class="d-grid gap-2 d-md-block">
    <button class=" m-2 btn btn-warning" type="button" onclick="pet('${kitten.id}')" >Pet</button>
    <button class="m-2 btn btn-danger " type="button" onclick="catnip('${kitten.id}') ">Catnip</button>
  </div>
    
   <h3>Name: ${kitten.name}</h3>
   <h3>Mood: ${kitten.mood}</h3>
   <div class=""> <h3>Affection: ${kitten.affection}</h3></div>
   
  
    
    <button  type="button" class="btn-cancel" onclick="clearKittens('${kitten.id}')">
    <i class="fa-solid fa-shield-cat fa-2xl"></i>
    </button>
    </div>
    
    `;
  });
  kittenCard.innerHTML = kittenTemplate;
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
  // stops pet function once it hits 0
  if (currentKitten.affection <= 0) {
    return;
  }

  if (rNum > 0.5) {
    currentKitten.affection++;
  }
  if (rNum < 0.5) {
    currentKitten.affection--;
  }

  saveKittens();
  setKittenMood(currentKitten);
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);
  currentKitten.affection = 5;
  currentKitten.mood = "Tolerant";
  saveKittens();
  setKittenMood(currentKitten);
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(id) {
  let currentKitten = findKittenById(id);
  if (currentKitten.affection > 9) {
    document.getElementById("catImage").className += "kitten happy";
    currentKitten.mood = "Happy";
  }
  if (currentKitten.affection == 5) {
    document.getElementById("catImage").className += "kitten tolerant";
    currentKitten.mood = "Tolerant";
  }
  if (currentKitten.affection < 4) {
    document.getElementById("catImage").className += "kitten angry";
    currentKitten.mood = "Angry";
  }
  if (currentKitten.affection <= 1) {
    document.getElementById("catImage").className += "kitten gone";
    currentKitten.mood = "Gone FOREVER";
  }
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  kittens.splice(kittenIndex, 1);
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log("Good Luck, Take it away");
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
