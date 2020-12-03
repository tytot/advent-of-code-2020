const reader = require('../reader')

reader.getInput('inputs/input3.txt').then((input) => {
    const width = input[0].length

    const traverse = (dx, dy) => {
        let numTrees = 0;
        for (let yPos = dy; yPos < input.length; yPos += dy) {
            let xPos = dx * (yPos / dy);
            if (xPos >= width)
                xPos %= width;
            if (input[yPos].charAt(xPos) === '#')
                numTrees++
        }
        return numTrees
    }
    let sol11 = traverse(1, 1), sol31 = traverse(3, 1), sol51 = traverse(5, 1), sol71 = traverse(7, 1), sol12 = traverse(1, 2)
    console.log(`Solution found: ${sol31}`)
    console.log(`Solution found: ${sol11} * ${sol31} * ${sol51} * ${sol71} * ${sol12} = ${sol11 * sol31 * sol51 * sol71 * sol12}`)
})