const reader = require('../reader')

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

reader.getInput('inputs/input4.txt').then((input) => {
    let numValid = 0

    for (let i = 0; i < input.length; i++) {
        let count = 0
        let passport = ''
        for (; input[i] && input[i] !== ''; i++) passport += input[i] + ' '
        const matches = passport.match(/[a-z]\w+:/g) || []
        count += matches.length
        if (count === 8 || (count === 7 && !matches.includes('cid:')))
            numValid++
    }
    console.log(`Solution found: ${numValid}`)

    numValid = 0
    outer: for (let i = 0; i < input.length; i++) {
        let passport = ''
        for (; input[i] && input[i] !== ''; i++) passport += input[i] + ' '
        const fields = passport.split(' ')
        fields.pop()
        let hasCID = false
        for (const field of fields) {
            const key = field.slice(0, 3)
            const val = field.slice(4)
            if (key.endsWith('yr')) {
                const parsedVal = parseInt(val)
                if (key === 'byr') {
                    if (parsedVal < 1920 || parsedVal > 2002) continue outer
                } else if (key === 'iyr') {
                    if (parsedVal < 2010 || parsedVal > 2020) continue outer
                } else {
                    if (parsedVal < 2020 || parsedVal > 2030) continue outer
                }
            } else if (key === 'hgt') {
                const suffix = val.slice(-2)
                const height = parseInt(val.slice(0, -2))
                if (suffix == 'cm') {
                    if (height < 150 || height > 193) continue outer
                } else if (suffix == 'in') {
                    if (height < 59 || height > 76) continue outer
                } else continue outer
            } else if (key === 'hcl') {
                if (!/#[0-9a-fA-F]{6}/.test(val)) continue outer
            } else if (key === 'ecl') {
                if (!eyeColors.includes(val)) continue outer
            } else if (key === 'pid') {
                if (!(val.length === 9 && /[0-9]{9}/.test(val))) continue outer
            } else hasCID = true
        }
        if (fields.length === 8 || (fields.length === 7 && !hasCID))
            numValid++
    }
    console.log(`Solution found: ${numValid}`)
})
