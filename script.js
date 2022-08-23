//this file contains JavaScript code for the card flip game

//storing audio objects in variables for game sounds
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');

function flipCardWhenClicked() {
	//code below runs in response to a click
	cardObject.element.onclick = function() {
		//if card is flipped, return
		if (cardObject.element.classList.contains("flipped") {
		    return;
		    }
		clickAudio.play();
		//adding the flipped class after a card is clicked
		cardObject.element.classList.add("flipped");
		//500 ms for card flip transition to complete and call onCardFlipped
		setTimeout(function() {
			//below code runs after 500ms
			onCardFlipped(cardObject);
		}, 500);
	};
}

function setUpGame() {
	let cardObjects = createCards(document.getElementByID("card-container"), shuffleCardImageClasses());
	if (cardObjects != null) {
		for (let i=0; i < cardObjects.Length; i++) {
			flipCardWhenClicked(cardObject[i]);
		}
	}
}
	
function createNewCard() {
	let cardElement = document.createElement("div");
	cardElement.classList.add("card");
  cardElement.innerHTML=`<div class="card-down"></div>
		<div class="card-up"></div>`;
	return cardElement;
}

function appendNewCard(parentElement) {
	let cardElement = createNewCard();
	parentElement.appendChild(cardElement);
	return cardElement;
}

function shuffleCardImageClasses() {
	const cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"]
  	let result = _.shuffle(cardClasses) // (_.shuffle) from underscore.js
  	return result
}

function createCards(parentElement, shuffledImageClasses) {
	
  var cardObject = []
  for (let i = 0; i<12; i++) {
	  let card = appendNewCard(parentElement)
          card.classList.add(shuffledImageClasses[i])
          cardObject.push({
            index: i,
            element: card,
            imageClass: shuffledImageClasses[i],
	  })
  }
  return cardObject
}

function doCardsMatch(cardObject1, cardObject2) {

  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  }
  else {
    return false;
  }
}
let counters = {};

function incrementCounter(counterName, parentElement) {

  if (counters[counterName] === undefined) {
  counters[counterName] = 0;
  }
  
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}
let lastCardFlipped = null;

//This function performs the "heavy lifting" for the card flip game
function onCardFlipped(newlyFlippedCard) {

incrementCounter("flips", document.getElementById("flip-count"));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  incrementCounter("matches", document.getElementById("match-count"))
  lastCardFlipped.element.classList.add("border-glow");
  newlyFlippedCard.element.classList.add("border-glow");

  if (counters["matches"] ==6) {
    winAudio.play();
  }
  else {
    matchAudio.play();
  }
  lastCardFlipped = null;
}

function resetGame() {

  let cardContainer = document.getElementById("card-container")

  //while loop goes through and idetifies if cardContainer has a child and all children from the cardContainer <div>
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
}
  //(**other possible method of looping to search for children in the cardContainer <div> and removing them**)
  // let i = 0
  // while (i<=12) {
  //   if (cardContainer.hasChildNodes === true) {
  //     cardContainer.removeChild(cardContainer.firstChild)
  //   }
  //   i++
  // }

  //storing flip-count and match-count in a variable and setting innerHTML = 0 to reset the count
  var flips = document.getElementById("flip-count")
  var matches = document.getElementById("match-count")
  flips.innerHTML = 0;
  matches.innerHTML = 0;

  //resetting counter to empty object
  counters = {};
	
  //set lastCardFlipped back to null
  lastCardFlipped = null;

 setUpGame();

}

