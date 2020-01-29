let startBtn = document.querySelector("#start");
let nextBtn = document.querySelector("#next");

let random = Math.floor(Math.random() * (52));
let playerHand = [26];
let computerHand = [26];
let turnCount = 0;
let playerScore = 0;
let computerScore = 0;


startBtn.addEventListener("click", playDeck, false);
nextBtn.addEventListener("click", nextHand, false);

// Load Deck and deal out 26 cards to each hand
function playDeck() {
    Deck.cardArray.length = 0;
    Deck.loadDeck();
    let i;
    let random;

    for (i = 0; i < 26; i++) 
    {
        random = Math.floor(Math.random() * (52));
        while (Deck.cardArray[random].inuse === true) 
        {
            random = Math.floor(Math.random() * (52));
        }
        playerHand[i] = Deck.cardArray[random];
        Deck.cardArray[random].inuse = true;

        random = Math.floor(Math.random() * (52));
        while (Deck.cardArray[random].inuse === true) 
        {
            random = Math.floor(Math.random() * (52));
        }
        computerHand[i] = Deck.cardArray[random];
        Deck.cardArray[random].inuse = true;
    }

    // initialize html elements for gui
    document.getElementById("pHand").innerHTML = "";
    document.getElementById("cHand").innerHTML = "";
    document.getElementById("winner").innerHTML = "";            
    document.getElementById("turnCount").innerHTML = "Turn Count: " + turnCount;
    document.getElementById("playerScore").innerHTML = "Player Score: " + playerScore;
    document.getElementById("computerScore").innerHTML = "Computer Score: " + computerScore;
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("next").style.visibility = "visible";
}

// on click funtion for next button
function nextHand(){    
    let playerCard = playerHand[0];         //take first card from player array
    let computerCard = computerHand[0];     //take first card from computer array
    turnCount++;
    document.getElementById("pHand").innerHTML = checkRank(playerCard) + " of " + checkSuit(playerCard);        //show player card
    document.getElementById("cHand").innerHTML = checkRank(computerCard) + " of " + checkSuit(computerCard);    //show computer card
    document.getElementById("turnCount").innerHTML = "Turn Count: " + turnCount;
     
    playerHand.shift();         //remove first card from array causing next card to be in [0] position
    computerHand.shift()


    //change color of text depending on suit
    if (playerCard.suit == 3 || playerCard.suit == 4)
    {
        document.getElementById("pHand").style.color = "red";
    }
    else if (playerCard.suit == 1 || playerCard.suit == 2)
    {
        document.getElementById("pHand").style.color = "black";
    }

    if (computerCard.suit == 3 || computerCard.suit == 4)
    {
        document.getElementById("cHand").style.color = "red";
    }
    else if (computerCard.suit == 1 || computerCard.suit == 2)
    {
        document.getElementById("cHand").style.color = "black";
    }


    // win/loss logic
    if (playerCard.rank > computerCard.rank)
       {
        document.getElementById("winner").innerHTML = "You <strong>WON</strong> this hand!"
        playerScore++;
        document.getElementById("playerScore").innerHTML = "Player Score: " + playerScore;
        }
    else if (computerCard.rank > playerCard.rank) 
    {
        document.getElementById("winner").innerHTML = "You <strong>LOST</strong> this hand!";
        computerScore++;
        document.getElementById("computerScore").innerHTML = "Computer Score: " + computerScore;
    }
    else if (playerCard.rank == computerCard.rank) 
    {
        if (playerCard.suit > computerCard.suit)
        {
            document.getElementById("winner").innerHTML = "You <strong>WON</strong> this hand!";
            playerScore++;
            document.getElementById("playerScore").innerHTML = "Player Score: " + playerScore;
        }
        else if (computerCard.suit > playerCard.suit)
        {
            document.getElementById("winner").innerHTML = "You <strong>LOST</strong> this hand!";
            computerScore++;
            document.getElementById("computerScore").innerHTML = "Computer Score: " + computerScore;
        }
    }

    // end game conditions/ restarting the game/ clearing previous game stats
    if (turnCount == 26 || playerHand.length == 0 || computerHand.length == 0) 
    {
        if (playerScore > computerScore)
        {
            alert("YOU WON!!! Press deal to play again!")
            document.getElementById("winner").innerHTML = "Great job! You <strong>WON</strong> the game!";
            document.getElementById("start").style.visibility = "visible";
            document.getElementById("next").style.visibility = "hidden";
            turnCount = 0;
            playerScore = 0;
            computerScore = 0;
        }
        else if (computerScore > playerScore)
        {
            alert("YOU LOST!!! Press deal to play again!")
            document.getElementById("winner").innerHTML = "Sorry you <strong>LOST</strong>!";            
            document.getElementById("start").style.visibility = "visible";
            document.getElementById("next").style.visibility = "hidden";
            turnCount = 0;
            playerScore = 0;
            computerScore = 0;
        }
    }

}

// change suit value to string
function checkSuit(aCard)
{
    let suit;
    if (aCard.suit == 1)
    {
        suit = "Spades";
    }
    else if (aCard.suit == 2)
    {
        suit = "Clubs";
    }
    else if (aCard.suit == 3)
    {
        suit = "Diamonds";
    }
    else if (aCard.suit == 4)
    {
        suit = "Hearts";
    }
    
    return suit;
}

// change rank value to string
function checkRank(aCard)
{
    let rank;
    if (aCard.rank == 11)
    {
        rank = "Jack";
    }
    else if (aCard.rank == 12)
    {
        rank = "Queen";
    }
    else if (aCard.rank == 13)
    {
        rank = "King";
    }
    else if (aCard.rank == 14)
    {
        rank = "Ace";
    }
    else {
        rank = aCard.rank;
    }
    
    return rank;
}