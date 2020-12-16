const reader = require('../reader')

reader.getInput('inputs/input16.txt').then((input) => {
    const rules = input.slice(0, 20).map((rule) => rule.split(':')).map((rule) => [rule[0], rule[1].trim().split(' or ').map((range) => range.split('-').map((value) => parseInt(value)))].flat(2))
    const myTicket = input[22].split(',').map((value) => parseInt(value))
    const nearbyTickets = input.slice(25).map((ticket) => ticket.split(',').map((value) => parseInt(value)))
    const isValid = (value, rule) => {
        return (value >= rule[1] && value <= rule[2]) || (value >= rule[3] && value <= rule[4])
    }
    const errorRate = (ticket) => {
        return ticket.reduce((acc, value) => acc + (rules.reduce((valid, rule) => valid || isValid(value, rule), false) ? 0 : value), 0)
    }
    console.log(`Solution found: ${nearbyTickets.reduce((acc, ticket) => acc + errorRate(ticket), 0)}`)
    
    const valueSets = [...Array(myTicket.length)].map(() => []);
    nearbyTickets.filter((ticket) => errorRate(ticket) === 0).forEach((ticket) => ticket.forEach((value, i) => valueSets[i].push(value)))
    const ruleMap = rules.map(() => [])
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        inner: for (let j = 0; j < valueSets.length; j++) {
            const valueSet = valueSets[j]
            for (let k = 0; k < valueSet.length; k++)
                if (!isValid(valueSet[k], rule)) continue inner
            ruleMap[i].push(j)
        }
    }
    const solve = () => {
        const arrays = ruleMap.filter((p) => p instanceof Array)
        if (arrays.length === 0) return
        for (let i = 0; i < ruleMap.length; i++) {
            if (ruleMap[i] instanceof Array && ruleMap[i].length === 1) {
                ruleMap[i] = ruleMap[i][0]
                for (let j = 0; j < ruleMap.length; j++) {
                    if (ruleMap[j] instanceof Array)
                        ruleMap[j] = ruleMap[j].filter((value) => value !== ruleMap[i])
                }
                solve()
                return
            }
        }
    }
    solve(ruleMap)
    let sol2 = 1
    for (let i = 0; i < 6; i++)
        sol2 *= myTicket[ruleMap[i]]
    console.log(`Solution found: ${sol2}`)
})
