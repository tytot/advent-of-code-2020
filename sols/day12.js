const reader = require('../reader')

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n
}

reader.getInput('inputs/input12.txt').then((input) => {
    const dirs = ['N', 'E', 'S', 'W']
    const vecs = {
        N: [0, 1],
        E: [1, 0],
        S: [0, -1],
        W: [-1, 0],
    }
    let pos = [0, 0],
        dir = 'E'
    let wPos = [10, 1]

    let step = (action, value, part2) => {
        if (action === 'L' || action === 'R') {
            value = action === 'L' ? -value : value
            if (part2) {
                const deg = -value * (Math.PI / 180)
                const cos = Math.cos(deg), sin = Math.sin(deg)
                wPos = [wPos[0] * cos - wPos[1] * sin, wPos[0] * sin + wPos[1] * cos]
            } else
                dir = dirs[(dirs.indexOf(dir) + value / 90).mod(4)]
        } else {
            if (action === 'F') {
                if (part2)
                    pos = [pos[0] + value * wPos[0], pos[1] + value * wPos[1]]
                else
                    pos = [pos[0] + value * vecs[dir][0], pos[1] + value * vecs[dir][1]]
            } else {
                if (part2)
                    wPos = [wPos[0] + value * vecs[action][0], wPos[1] + value * vecs[action][1]]
                else
                    pos = [pos[0] + value * vecs[action][0], pos[1] + value * vecs[action][1]]
            }
        }
    }
    for (const line of input)
        step(line.charAt(0), line.slice(1))
    console.log(`Solution found: ${pos} => ${Math.abs(pos[0]) + Math.abs(pos[1])}`)

    pos = [0, 0]
    for (const line of input)
        step(line.charAt(0), line.slice(1), true)
    console.log(`Solution found: ${pos} => ${Math.round(Math.abs(pos[0]) + Math.abs(pos[1]))}`)
})
