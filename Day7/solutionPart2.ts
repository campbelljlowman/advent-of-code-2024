const input = await Bun.file("input.txt").text()

const equations = input.split('\n')

let totalCalibrationResult = 0

for (const equation of equations) {
    const targetSum = +equation.split(': ')[0]
    const testNumbersStrings = equation.split(': ')[1].split(' ')
    const testNumbers = testNumbersStrings.map((num) => +num)
    let possibleSums = [testNumbers[0]]

    for (let i = 1; i < testNumbers.length; i++) {
        let newPossibleSums = <number[]>[]
        for (const number of possibleSums) {
            newPossibleSums.push(number + testNumbers[i])
        }
        for (const number of possibleSums) {
            newPossibleSums.push(number * testNumbers[i])
        }
        for (const number of possibleSums) {
            newPossibleSums.push(+(String(number) + String(testNumbers[i])))
        }
        possibleSums = newPossibleSums
    }

    if (possibleSums.includes(targetSum)) {
        totalCalibrationResult += targetSum
    }
}

console.log(totalCalibrationResult)