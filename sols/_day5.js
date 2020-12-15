const reader = require('../reader')

reader.getInput('inputs/input5.txt').then((input) => {
    const idSet = new Set()
    let max = 0, min = 1023
    for (const line of input) {
        const row = parseInt(line.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
        const col = parseInt(line.slice(-3).replace(/L/g, '0').replace(/R/g, '1'), 2)
        const id = row * 8 + col
        idSet.add(id)
        max = Math.max(max, id)
        min = Math.min(min, id)
    }
    console.log(`Solution found: ${max}`)

    for (const id of idSet) {
        if (id !== min && id !== max) {
            if (!idSet.has(id - 1)) {
                console.log(`Solution found: ${id - 1}`)
                break
            }
            if (!idSet.has(id + 1)) {
                console.log(`Solution found: ${id + 1}`)
                break
            }
        }
    }
})
