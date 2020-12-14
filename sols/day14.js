const reader = require('../reader')

reader.getInput('inputs/input14.txt').then((input) => {
    const applyMask1 = (value, mask) => {
        const mask1 = BigInt(`0b${mask.replace(/X/g, '0')}`)
        const mask2 = BigInt(`0b${mask.replace(/X/g, '1')}`)
        return mask2 & (mask1 | value)
    }
    const resolveFloats = (address) => {
        if (!address.includes('X'))
            return [address]
        return [resolveFloats(address.replace('X', '0')), resolveFloats(address.replace('X', '1'))].flat()
    }
    const applyMask2 = (value, mask) => {
        address = value.toString(2)
        address = address.padStart(36, '0')
        let newAddress = ''
        for (let i = 0; i < mask.length; i++) {
            const bit = mask.charAt(i)
            if (bit === '1' || bit === 'X')
                newAddress += bit
            else
                newAddress += address.charAt(i)
        }
        return resolveFloats(newAddress).map((address) => parseInt(address, 2))
    }
    const solve = (part2) => {
        let mem = {}, mask = ''
        for (const line of input) {
            if (line.startsWith('mask = ')) {
                mask = line.slice(7)
            } else {
                const pair = line.match(/[0-9]+/g)
                if (part2) {
                    for (const address of applyMask2(parseInt(pair[0]), mask))
                        mem[address] = parseInt(pair[1])
                } else mem[pair[0]] = applyMask1(BigInt(pair[1]), mask)
            }
        }
        console.log(`Solution found: ${Object.values(mem).reduce((a, b) => a + b)}`)
    }
    solve()
    solve(true)
})
