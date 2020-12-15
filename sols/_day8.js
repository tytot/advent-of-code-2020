const reader = require('../reader')

reader.getInput('inputs/input8.txt').then((input) => {
    const execute = (func, visited, index, acc, changed) => {
        visited = new Set(visited)
        visited.add(index)
        const line = input[index]
        const cmd = line.slice(0, 3)
        const arg = parseInt(line.slice(4))
        if (cmd === 'acc') func(visited, index + 1, acc + arg, changed)
        else if (cmd === 'jmp') {
            if (!changed) func(visited, index + 1, acc, true)
            func(visited, index + arg, acc, changed)
        } else {
            if (!changed) func(visited, index + arg, acc, true)
            func(visited, index + 1, acc, changed)
        }
    }
    const part1 = (visited, index, acc, changed) => {
        if (visited.has(index)) console.log(`Solution found: ${acc}`)
        else execute(part1, visited, index, acc, changed)
    }
    const part2 = (visited, index, acc, changed) => {
        if (index === input.length) console.log(`Solution found: ${acc}`)
        else if (!visited.has(index))
            execute(part2, visited, index, acc, changed)
    }
    part1(new Set(), 0, 0, true)
    part2(new Set(), 0, 0, false)
})
