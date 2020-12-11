const reader = require('../reader')

reader.getInput('inputs/input11.txt').then((input) => {
    let layout = input.map((row) => row.split(''))
    const ogLayout = layout.map(row => [...row])

    const adjacencies = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
    ]
    const round = (part2) => {
        const copy = layout.map((row) => [...row])
        let total = 0
        for (let i = 0; i < layout.length; i++) {
            const row = layout[i]
            for (let j = 0; j < row.length; j++) {
                const status = layout[i][j]
                let count = 0
                for (const a of adjacencies) {
                    let iCopy = i + a[0],
                        jCopy = j + a[1]
                    if (part2) {
                        while (
                            layout[iCopy] &&
                            layout[iCopy][jCopy] &&
                            layout[iCopy][jCopy] === '.'
                        ) {
                            iCopy += a[0]
                            jCopy += a[1]
                        }
                    }
                    if (
                        layout[iCopy] &&
                        layout[iCopy][jCopy] &&
                        layout[iCopy][jCopy] === '#'
                    )
                        count++
                }
                if (status === 'L' && count === 0) {
                    copy[i][j] = '#'
                    total++
                } else if (status === '#') {
                    if (part2) var threshold = 5
                    else threshold = 4
                    if (count >= threshold) copy[i][j] = 'L'
                    else total++
                }
            }
        }
        layout = copy
        return total
    }

    const solve = (part2) => {
        let prevTotal = 0,
            total = round(part2)
        while (prevTotal !== total) {
            prevTotal = total
            total = round(part2)
        }
        return total
    }

    console.log(`Solution found: ${solve()}`)
    layout = ogLayout
    console.log(`Solution found: ${solve(true)}`)
})
