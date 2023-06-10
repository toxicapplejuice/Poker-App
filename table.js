
import Deck from "./deck.js"
import Player from "./player.js"

const button = 0
let small_blind = 1
let big_blind = 2
const seats = 9 
const num_of_players = 3

function start_game() {
    let action_list = create_action_list()
    let sim_number = 0
    while (sim_number < 1) {
        //new deck each iteration and deals hands
        let deck = new Deck() 

        // big blind + 1 equals first to act
        let utg = ((big_blind +1) % num_of_players)
        create_hand(utg, action_list, deck)

        //move blinds
        big_blind = (big_blind +1) % num_of_players 
        small_blind = (small_blind +1) % num_of_players 
        sim_number++;
    }
}

function create_hand(utg, action_list, deck) { 
    let master_pot = 0
    let board = []
    
    master_pot += pre_flop(utg,action_list, deck)
    master_pot += flop(small_blind, action_list, deck, board) 
    master_pot += turn(small_blind, action_list, deck, board)
    master_pot += river(small_blind, action_list, deck, board)

    console.log(master_pot)
    return master_pot   

}

//create poker seats (max 9) with players in them 
function create_action_list () {
    let action_list = []
    // for (let i = 0; i < num_of_players; i++) {
    //     action_list =  [...action_list, new Player(`Player ${i}`)]
    // }  

    action_list = [...action_list, new Player ("Michael", 1000)]
    action_list = [...action_list, new Player ("Grant", 1500)]
    action_list = [...action_list, new Player ("Christian", 2000)]
    return action_list
}

function pre_flop (utg, action_list, deck) {
    console.log("%cThis is Preflop ", "color: red")
    deal_hand(num_of_players,action_list, deck)
    return street(utg,action_list)
}

function flop (small_blind, action_list, deck, board) {
    console.log("%cThis is Flop ", "color: orange")

    // reset power through player list (probably can optimize this down the road for players in hand)
    for (let i = 0; i < num_of_players; i++){
        action_list[i].remove_power()
    }

    //deal 3 cards
    for (let i = 0; i < 3; i++) {
        board.push(deck.deal())
    }

    print_board(board)
    return street(small_blind,action_list)
    
}

function turn (small_blind, action_list, deck, board) {
    console.log("%cThis is Turn ", "color: Green")

    // reset power through player list (probably can optimize this down the road for players in hand)
    for (let i = 0; i < num_of_players; i++){
        action_list[i].remove_power()
    }
    
    //deal one turn card
    board.push(deck.deal())

    print_board(board)
    return street(small_blind,action_list)
    
}

function river (small_blind, action_list, deck, board) {
    console.log("%cThis is River ", "color: Blue")

    // reset power through player list (probably can optimize this down the road for players in hand)
    for (let i = 0; i < num_of_players; i++){
        action_list[i].remove_power()
    }
    
    //deal one river card
    board.push(deck.deal())

    print_board(board)
    return street(small_blind,action_list)
    
}

function deal_hand(num_of_players, action_list, deck) {
    deck.shuffle()
    for (let i = 0; i < num_of_players; i++) {
        action_list[i].hands.push(deck.deal())
        action_list[i].hands.push(deck.deal())
    }
    return deck 
}

function street (first_to_act, action_list, street_name) {
    let current_action = first_to_act
    let pot = 0 

    let outstanding_player = null
    let outstanding_bet = 0
    
    let max_action = num_of_players 
    let counter = 0

    //determine the number of players still in the hand
    let num_of_players_in_hand = 0
    for (let i = 0; i < num_of_players; i++) {
        if (action_list[i].is_in_hand()) {
            num_of_players_in_hand += 1
        }
    }
    // max action equals number of players in hand, add to counter each loop, also check > 1 player in hand 
    while (counter != max_action && num_of_players_in_hand > 1) {

        // first check to see if player is even in the hand 
        if (action_list[current_action].is_in_hand() ) {

            let action = parseInt(prompt (`Hello ${action_list[current_action].name}: you are first to act`))
            action_list[current_action].stack -= action 
            // if player is in the hand then we can evaluate their action 
            if (action > 0){
            //bet, or call
                if (action <= outstanding_bet) {
                    // call action 
                    action_list[current_action].bet = action
                    pot += action 

                    console.log(`Player ${action_list[current_action].name} calls`)
                } else {
                    //raise action 
                    action_list[current_action].bet= action
                    pot += action 
                    console.log(`Player ${action_list[current_action].name} raises`)
                    
                    // need to remove prior power assignment to the prior leader, probably can remove
                    if (outstanding_player != null) {
                        action_list[outstanding_player].power = false
                    }
                    
                    //update outstanding bet and player pointer, this player becomes the point of reference
                    counter = 0
                    outstanding_bet = action
                    outstanding_player = current_action 

                    //probably dont need this power stuff 
                    action_list[current_action].power = true
                }
            } else {

                if (outstanding_bet == 0 ) {
                    //if there is no bet before then the player action counts as a check 
                    console.log(`Player ${action_list[current_action].name} checks`)

                } else {

                    //if there is a bet before then the player counts as a fold 
                    action_list[current_action].in_hand = false
                    num_of_players_in_hand -= 1 
                    console.log(`Player ${action_list[current_action].name} folds`)
                }
            }
        }
        // iterate to next player
        counter +=1
        // console.log(`comparing ${counter} to ${max_action}`)
        current_action = (current_action + 1 ) % num_of_players
        // console.log(`there are ${num_of_players_in_hand} left in the hand`)
    }

    // console.log("This is the master action list")
    // console.log(action_list)
    return pot
    }

function print_board(board) {
    for (let i = 0; i < board.length; i ++){
        console.log(board[i].value,board[i].suit)
    }
}

const deck = new Deck()
start_game()





