const reader = require('../reader')

reader.getInput('inputs/input15.txt').then((input) => {
    const startNums = input[0].split(',').map((num) => parseInt(num))
    const play = (turns) => {
        const mem = new Map()
        startNums.forEach((num, index) => mem.set(num, index + 1))
        let lastNum = 0
        for (let turn = startNums.length + 1; turn < turns; turn++) {
            if (!mem.has(lastNum)) {
                mem.set(lastNum, turn)
                lastNum = 0
            } else {
                const temp = lastNum
                lastNum = turn - mem.get(lastNum)
                mem.set(temp, turn)
            }
        }
        return lastNum
    }
    console.log(`Solution found: ${play(2020)}`)
    console.log(`Solution found: ${play(30000000)}`)
})
