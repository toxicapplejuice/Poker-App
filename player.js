export default class Player {
    constructor(name, buyin) {
        this.name = name
        this.stack = buyin
        this.in_table = false
        this.in_hand = true
        this.power = null 
        this.bet = null
        this.hands = []
        this.position = null
    }

    // get has_power() {
    //     return this.power 
    // }

    // get in_hand() {
    //     return this.in_hand
    // }

    // get bet() {
    //     return this.bet
    // }

    // get stack() {
    //     return this.stack
    // }

    has_power() {
        return this.power
    }

    remove_power() {
        this.power = false 
    }
    
    is_in_hand() {
        return this.in_hand
    }

    // set changePower() {
    //     this.power = !this.power
    // }
}