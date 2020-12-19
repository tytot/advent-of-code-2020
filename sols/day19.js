const reader = require('../reader')

reader.getInput('inputs/input19.txt').then((input) => {
    const parseInput = () => {
        [rules, messages] = input.join('\n').split('\n\n')
        return [mapRules(rules), messages.split('\n')]
    }
    const countValid = () => {
        [ruleMap, messages] = parseInput()
        pattern = new RegExp('^' + buildPattern(ruleMap, '0') + '$')
        count = messages.reduce((acc, message) => {
            return message.match(pattern) ? acc + 1 : acc
        }, 0)
        console.log(`Solution found: ${count}`)
    }
    const countValid2 = () => {
        [ruleMap, messages] = parseInput()
        ruleMap['8'] = ['42', '|', '42', '8']
        ruleMap['11'] = ['42', '31', '|', '42', '11', '31']
        pattern = new RegExp('^' + buildPattern(ruleMap, '0') + '$')
        count = messages.reduce((acc, message) => {
            return message.match(pattern) ? acc + 1 : acc
        }, 0)
        console.log(`Solution found: ${count}`)
    }
    const mapRules = (rules) => {
        indRules = rules.split('\n')
        const map = new Map()
        indRules.forEach((rule) => {
            [key, pattern] = rule.split(': ')
            map[key] = pattern.split(' ')
        })
        return map
    }
    const buildPattern = (ruleMap, key, depth = 20) => {
        const rule = ruleMap[key]
        if (depth <= 0) return ''
        if (rule[0][1] === 'a' || rule[0][1] === 'b') return rule[0][1]
        patString = '('
        rule.forEach((el) => {
            if (el === '|')
                patString += el
            else 
                patString += buildPattern(ruleMap, el, depth - 1)
        })
        return patString + ')'
    }
    countValid()
    countValid2()
})
