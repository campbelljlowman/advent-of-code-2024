const input = await Bun.file("input.txt").text()

let leftList = <number[]>[]
let rightList = <number[]>[]
let totalDistance = 0

for (const line of input.split('\n')) {
    const listPair = line.split(' ')
    leftList.push(+listPair[0])
    rightList.push(+listPair[listPair.length-1])
}

leftList.sort((a, b) => a - b)
rightList.sort((a, b) => a - b)

console.log(leftList)
console.log(rightList)

for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i])
}

console.log(totalDistance)