const input = await Bun.file("input.txt").text()

let numberOfSafeReports = 0

const reports = input.split('\n')

loop1: 
for (const report of reports) {
    const levelsStrings = report.split(' ')
    const levels = levelsStrings.map((num) => +num)

    let previousLevel = levels[0]
    const levelsStartIncreasing = numbersAreIncreasing(levels[0], levels[1])
    for (let i = 1; i < levels.length; i++) {
        let currentLevel = levels[i]
        let differenceBetweenLevels = Math.abs(previousLevel - currentLevel)
        if (differenceBetweenLevels > 3 || differenceBetweenLevels < 1) {
            console.log("report isn't safe " + report)
            continue loop1
        }
        if (numbersAreIncreasing(previousLevel, currentLevel) != levelsStartIncreasing) {
            console.log("Report isn't safe " + report)
            continue loop1
        }
        previousLevel = currentLevel
    }
    console.log("Report is safe: " + report)
    numberOfSafeReports ++
}

console.log("Number of safe reports: " + numberOfSafeReports)


function numbersAreIncreasing(num1: number, num2: number): boolean {
    if (num2 - num1 > 0) {
        return true
    } else {
        return false
    }
}