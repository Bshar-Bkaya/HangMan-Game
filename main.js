// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((l) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(l);
  span.appendChild(theletter);
  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "java", "go", "R", "mysql", "python"],
  movies: ["up", "prison break"],
  people: ["Albert Einstein", "Alexander", "cleopatra", "Bashar Bkaya"],
  countries: ["Syria", "palastine", "yemen", "egypt", "qatar"],
  woman: ["Royan"],
};

// Get Random Property
let allkes = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allkes.length);
let randomPropName = allkes[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];

// Set Categories
document.querySelector(".category span").textContent = randomPropName;

// Select Letters Guess
let lettersGuess = document.querySelector(".letters-guess");
// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValue.toLowerCase());
// Create Span Depend On Word
lettersAndSpace.forEach((e) => {
  // Create Empty Span
  let span = document.createElement("span");
  // If letter Is Space
  if (e === " ") {
    // Add Class To The Span
    span.className = "with-space";
  }
  // Appent span to lettersGuess
  lettersGuess.appendChild(span);
});

// Select Guess Spans
let spans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;
let numberOfCorrectLetters = 0;
let theDraw = document.querySelector(".hangman-draw");

// Prepar Audio
let fail = document.querySelector(".fail");
let success = document.querySelector(".success");
let finishWin = document.querySelector(".finished-winner");
let finishFail = document.querySelector(".finished-fail");

let numberOfLettersInRandomString = randomValue.replaceAll(" ", "").length;

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let clickedLetter = e.target.textContent.toLowerCase();
    lettersAndSpace.forEach((l, i) => {
      if (l == clickedLetter) {
        theStatus = true;
        numberOfCorrectLetters++;
        [...spans].map((span, ind) => {
          if (ind === i) {
            span.textContent = l;
          }
        });
      }
    });
    // the letter is wrong
    if (theStatus === false) {
      wrongAttempts++;
      // Play fail Sound
      fail.play();
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts == 8) {
        endGame();
        finishFail.play();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      success.play();
      if (numberOfCorrectLetters == numberOfLettersInRandomString) {
        winner();
        finishWin.play();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End Game Function
function endGame() {
  // create popup div
  let div = document.createElement("div");
  // create span
  let span = document.createElement("span");
  // Create Text
  let text;
  if (randomValue === "Royan") {
    text = document.createTextNode(
      `Game Over, The Word Is : ${randomValue} 🤣🤣😂`
    );
  } else {
    text = document.createTextNode(`Game Over, The Word Is : ${randomValue}`);
  }

  // Append Text To span
  span.appendChild(text);
  // Append span To div
  div.appendChild(span);
  // Add Class To Div
  div.className = "popup";
  // Append To The Body
  document.body.appendChild(div);
  span.addEventListener("click", function () {
    window.location.reload();
  });
}

// WinnerFunction
function winner() {
  // create popup div
  let div = document.createElement("div");
  // create span
  let span = document.createElement("span");
  // Append Msg Winner To span
  span.innerText = "You Are Winner 🎈🥳🏋🏼‍♀️🎉🎈";
  // Append span To div
  div.appendChild(span);
  // Add Class To Div
  div.className = "winner";
  // Append To The Body
  document.body.appendChild(div);
  span.addEventListener("click", function () {
    window.location.reload();
  });
}
