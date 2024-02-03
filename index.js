/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
const gamesContainer = document.getElementById("games-container");
// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
// grab the element with the id games-container

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i=0; i<games.length; i++){
        const game = games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img src="${game.image}" >
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        //const gamesContainer = document.getElementById("games-container");
        gamesContainer.appendChild(gameCard);
    }
    return
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
totalContributions = '$' + totalContributions.toLocaleString('en-US')
var totalCont = document.getElementById("totalContributions");
totalCont.textContent += totalContributions

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalPledged = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
totalPledged = '$' + totalPledged.toLocaleString('en-US')
var totalPled = document.getElementById("totalPledged");
totalPled.textContent += totalPledged

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
var numOfGames = document.getElementById("numberOfGames");
numOfGames.textContent += GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    let listOfUnfunded = GAMES_JSON.filter ( (game) => {
        return game.goal > game.pledged;
    });
    deleteChildElements(gamesContainer);
    addGamesToPage(listOfUnfunded);

    // use filter() to get a list of games that have not yet met their goal

    // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
    let listOfFunded = GAMES_JSON.filter ( (game) => {
        return game.pledged > game.goal;
    });
    deleteChildElements(gamesContainer);
    addGamesToPage(listOfFunded);

    // use filter() to get a list of games that have met or exceeded their goal

    // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
    //addGamesToPage(GAMES_JSON)
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM
}
showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const lowestFundingBtn = document.getElementById("lowestFunding-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
lowestFundingBtn.addEventListener("click", lowestFunding);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unFundedGamesList = GAMES_JSON.filter ( (game) => {
    return game.goal > game.pledged;
});


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of ${totalPledged} has been raised 
for ${GAMES_JSON.length} ${GAMES_JSON.length === 1 ? "game" : "games"}. 
Currently, ${unFundedGamesList.length} ${unFundedGamesList.length === 1 ? "game remains" : "games remain"} unfunded. 
We need your help to fund these amazing games!`

descriptionContainer.textContent += displayStr


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item
for (let i=0; i<2; i++){
    let {name, pledged, goal, backers, image} = sortedGames[i];
    var h3 = document.createElement("h3")
    var p = document.createElement("p")
    var img = document.createElement("img")
    h3.setAttribute('style', 'white-space: pre;');
    p.setAttribute('style', 'white-space: pre;', 'text-align: center;', 'vertical-align: middle;', 'display: table-cell;')
    h3.textContent = name;
    p.textContent = `Amount Raised: ${pledged}` + 
    `\r\nGoal: ${goal}` + `\r\nBackers: ${backers}`;
    img.src = image;
    i === 0 ? (firstGameContainer.appendChild(h3), firstGameContainer.appendChild(p), firstGameContainer.appendChild(img))
    : (secondGameContainer.appendChild(h3), secondGameContainer.appendChild(p), secondGameContainer.appendChild(img))
}

//Challenge 7 New Feature: Add a button/event listener to toggle highest priority games needing funding
let lowestFundingList = [...sortedGames].reverse()
lowestFundingList = lowestFundingList.filter ( (game) => { 
    return game.goal > game.pledged;
});
function lowestFunding(){
    deleteChildElements(gamesContainer);
    addGamesToPage(lowestFundingList);
}