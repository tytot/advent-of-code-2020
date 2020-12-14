const reader = require('../reader')

reader.getInput('inputs/input13.txt').then((input) => {
    let timestamp = parseInt(input[0])
    const sol1 = input[1].split(',').filter((id) => id !== 'x').map((id) => parseInt(id)).map((id) => ({id: id, wait: id - (timestamp % id)})).sort((a, b) => a.wait - b.wait)[0]
    console.log(`Solution found: ${sol1.id} * ${sol1.wait} = ${sol1.id * sol1.wait}`)

    const buses = input[1].split(',').map((id, index) => ({id: parseInt(id), index: index})).filter((bus) => !isNaN(bus.id))
    timestamp = buses[0].id
    let step = timestamp
    for (let i = 1; i < buses.length; i++) {
        const bus = buses[i]
        while ((timestamp + bus.index) % bus.id !== 0) {
            timestamp += step
        }
        step = step * bus.id
    }
    console.log(`Solution found: ${timestamp}`)
})
