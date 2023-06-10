const Suits = ["H","S","C","D"]
const Values = ["A","2","3","4","5","6","7","8","9","10","11","12","13"]

class Card { 
    constructor (suit, value) {
        this.suit = suit;
        this.value = value;
    }
    get fullvalue () {
        return this.suit + this.value.toString();
    }
    to_Heart () {
        this.suit = "Heart" 
    }
}

export default class Deck {
    constructor (deck = freshDeck()) {
        this.deck = deck
    }

    shuffle () {
        for (let i = this.deck.length - 1; i > 0; i --) {
            const newIndex = Math.floor(Math.random() * (i+1));
            const oldValue = this.deck[newIndex];
            this.deck[newIndex] = this.deck[i];
            this.deck[i] = oldValue
        }
    }

    get print_deck() {
        for (let i = 0; i < this.deck.length; i++) {
            console.log(this.deck[i])
        }
    }

    deal() {
        return this.deck.pop()
    }
}

function freshDeck() {
    return Suits.flatMap(suit => {
        return Values.flatMap(value => {
            return new Card(suit,value)
        })
    })
}
