const input = await Bun.file("input.txt").text()

let leftList = <number[]>[]
let rightList = <number[]>[]
let numberOfAppearancesMapping: Map<number, number> = new Map()
let totalDistance = 0

for (const line of input.split('\n')) {
    const listPair = line.split(' ')
    leftList.push(+listPair[0])
    rightList.push(+listPair[listPair.length-1])
}

// Create mapping of number of occurances in right map
for (const num of rightList) {
    const numberOfAppearances = numberOfAppearancesMapping.get(num)
    if (numberOfAppearances === undefined) {
        numberOfAppearancesMapping.set(num, 1)
    } else {
        numberOfAppearancesMapping.set(num, numberOfAppearances + 1)
    }
}

for (const num of leftList) {
    let numberOfAppearances = numberOfAppearancesMapping.get(+num)
    if (numberOfAppearances !== undefined) {
        totalDistance += num * numberOfAppearances
    }
}

console.log(totalDistance)