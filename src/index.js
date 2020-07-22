
/**
 * Basic entering of age on the prompt box.
 */
function onClick() {
  var age = prompt ("Enter your age");
  console.log(age);
  var h1 = document.createElement('h1');
  var text = document.createTextNode('your age is' + age + 'years');
  h1.setAttribute('id', 'age');
  h1.appendChild(text);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('age').remove();
}

/**
* Generating cat GIFs on clicking the cat generator button
 * @return cat gif on every click
 */
function generateCatGif() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-generator');
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

/**
 * Rock Paper Scissor Game
 * The user selects either rock, paper, scissors
 * from the images on the screen, and the bot selects
 * the same by generating it randomly.
 * Decide the winner of the game, and display the finalmessage
 * on the screen.
 * @param yourChoice
 * @return The result of the game
 */
function rpsGame(yourChoice) {
    var element = document.getElementById(yourChoice.id);
    console.log(element);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    botChoice= numberToChoice(randInt());
    console.log(botChoice)
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if(yourScore === 0) {
    return {'message': 'You lost', 'color' : 'red'};
  } else if(yourScore === 0.5) {
    return {'message': 'You tied', 'color' : 'yellow'};
  } else {
      return {'message': 'You won', 'color' : 'green'};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humandiv = document.createElement('div');
  var botdiv = document.createElement('div');
  var message = document.createElement('div');

  humandiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice]+ "' height=150 width=150";
  botdiv.innerHTML = "<img src='" + imageDatabase[botImageChoice]+ "' height=150 width=150";
  message.innerHTML = "<h1 style='color': " + finalMessage['color'] + "; font-size: 60px; padding: 30px; ' >" + finalMessage['message'];

  document.getElementById('flex-box-rps-div').appendChild(humandiv);
  document.getElementById('flex-box-rps-div').appendChild(message);
  document.getElementById('flex-box-rps-div').appendChild(botdiv);
}

/**
 * Blackjack Game
 * The Hit, Standy and Deal buttons are used to
 * generate the cards and calculate the scores.
 * The scores decides the winner and updates
 * the score, and display the results.
 * @return The result of the game
 */
let blackjackGame = {
  'you' : {'scorespan' : 'your-blackjack-result', 'div' : 'your-box', 'score' : 0  },
  'dealer': {'scorespan': 'dealer-blackjack-result', 'div': 'dealer-score', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  'cardMaps' : {'2' : 2, '3' : 3, '4' : 4, '5': 5, '6' : 6, '7': 7, '8': 8, '9': 8, '10': 10, 'K': 10
    , 'J': 10, 'Q': 10, 'A': [1,11]},
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');

if (document.querySelector('flex-blackjack-hit')) {
  document.querySelector('flex-blackjack-hit').addEventListener('click', blackjackHit);
}
if (document.querySelector('flex-blackjack-deal')) {
  document.querySelector('flex-blackjack-deal').addEventListener('click', blackjackDeal);
}

if (document.querySelector('flex-blackjack-standby')) {
  document.querySelector('flex-blackjack-standy').addEventListener('click', blackjackStandBy);
}
function blackjackHit() {
  let card = randomCard();
  console.log(card);
  showCard(YOU, card);
  updateScore(card, YOU);
  showScore(YOU);
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function blackjackStandBy() {
  let card = randomCard();
  showCard(DEALER, card);
  updateScore(card, DEALER);
  showScore(DEALER);
}
function showCard(activePlayer, card) {
  if(activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(YOU['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  let yourImages = document.querySelector('your-box').querySelectorAll('img');
  for(let i=0; i<yourImages.length(); i++) {
      yourImages[i].remove();
  }
  let dalerImages = document.querySelector('dealer-score').querySelectorAll('img');
  for(let i=0; i<yourImages.length(); i++) {
    dealerImages[i].remove();
  }

  YOU['score'] = 0;
  DEALER['score'] = 0;

  document.querySelector('your-blackjack-result').textContent = 0;
  document.querySelector('dealer-blackjack-result').textContent = 0;
}

function updateScore(card, activePlayer) {
  if(card === 'A') {
    if(activePlayer['score'] + blackjackGame['cardMaps'][card][1] <=21 ) {
      activePlayer['score'] += blackjackGame['cardMaps'][card][1];
    }
    else {
      activePlayer['score'] += blackjackGame['cardMaps'][card][0];
    }
  }
  else {
    activePlayer['score'] += blackjackGame['cardMaps'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scorespan']).style.color = red;
    console.log(activePlayer['scorespan'])
  }
  else {
    document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    console.log(activePlayer['score']);
  }
}