//this file contains JavaScript code for the card flip game

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

