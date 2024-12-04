const input = await Bun.file("input.txt").text()

let numberOfSafeReports = 0

const reports = input.split('\n')

for (const report of reports) {
    const levelsStrings = report.split(' ')
    const levels = levelsStrings.map((num) => +num)

    const levelsAreSafe = areLevelsSafe(levels)
    if (levelsAreSafe) {
        console.log("Report is safe: " + report)
        numberOfSafeReports ++
    } else {
        console.log("Report isn't safe: " + levels)

        for (let i = 0; i < levels.length; i++) {
            let newLevels = Object.assign([], levels)
            newLevels.splice(i, 1)
            console.log("Trying new report: " + newLevels)
            if (areLevelsSafe(newLevels)) {
                console.log("New levels are safe: " + newLevels)
                numberOfSafeReports ++
                break
            }
        }
    }
}

console.log("Number of safe reports: " + numberOfSafeReports)


function areLevelsSafe(levels: number[]){
    let previousLevel = levels[0]
    const levelsStartIncreasing = numbersAreIncreasing(levels[0], levels[1])
    for (let i = 1; i < levels.length; i++) {
        let currentLevel = levels[i]
        let differenceBetweenLevels = Math.abs(previousLevel - currentLevel)
        if (differenceBetweenLevels > 3 || differenceBetweenLevels < 1) {
            return false
        }
        if (numbersAreIncreasing(previousLevel, currentLevel) != levelsStartIncreasing) {
            return false
        }
        previousLevel = currentLevel
    }
    return true
}

function numbersAreIncreasing(num1: number, num2: number): boolean {
    if (num2 - num1 > 0) {
        return true
    } else {
        return false
    }
}