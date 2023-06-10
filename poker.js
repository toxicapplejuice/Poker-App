import Deck from "./deck.js"

//deals an array of two cards to each player 
export function deal_hand(num_of_players, action_list) {
    let deck = new Deck() 
    deck.shuffle()

    for (let i = 0; i < num_of_players; i++) {
        action_list[i].hands.push(deck.deal())
        action_list[i].hands.push(deck.deal())
    }
    return (deck,action_list)
}