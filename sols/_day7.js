const reader = require('../reader')

reader.getInput('inputs/input7.txt').then((input) => {
    const bagRegex = /\w+ \w+ bags/
    const innerBagRegex = /\d \w+ \w+ bag/g
    const rules = {}
    for (const line of input) {
        const bagName = line.match(bagRegex)[0].slice(0, -5).replace(' ', '_')
        let innerBags = line.match(innerBagRegex)
        if (innerBags == null) innerBags = []
        else {
            innerBags = innerBags.map((val) => {
                return {
                    name: val.slice(2, -4).replace(' ', '_'),
                    num: parseInt(val.charAt(0)),
                }
            })
        }
        rules[bagName] = innerBags
    }
    const goal = 'shiny_gold'

    const contains = (bag, targetBag) => rules[bag].reduce((found, { name }) => found || name == targetBag || contains(name, targetBag), false) ? 1 : 0
    console.log(`Solution found: ${Object.keys(rules).reduce((total, bag) => total + contains(bag, goal), 0)}`)

    const bagsIn = (bag) => rules[bag].reduce((total, { name, num }) => total + num * count(name), 0) + 1
    console.log(`Solution found: ${bagsIn(goal) - 1}`)
})
