const input = await Bun.file("input.txt").text()

const multiplicationRegex = new RegExp(/mul\(\d+,\d+\)/g)
const dontRegex = new RegExp(/don't\(\)/)
const doRegex = new RegExp(/do\(\)/)

let splitByDonts = input.split(dontRegex)
let total = 0

// Parse the first batch before first don't
let mulsToCalculate = splitByDonts[0].match(multiplicationRegex)
splitByDonts.shift()

for (const gibberish of splitByDonts!) {
    let splitByDos = gibberish.split(doRegex)
    if (splitByDos.length > 1) {
        // Pop the text between don't and first do
        splitByDos.shift()
        for (const text of splitByDos) {
            const newMulsToCalculate = text.match(multiplicationRegex)
            console.log("Adding the following muls: " + newMulsToCalculate)
            mulsToCalculate?.push(...newMulsToCalculate!)
        }
    }
}

for (const mulToDo of mulsToCalculate!) {
    total += doMultiplication(mulToDo)
}

console.log("Total of multiplications: " + total)

function doMultiplication(multiplication: string) {
    const multiplicationNumbers = multiplication.split(',')
    const firstNumber = +multiplicationNumbers[0].substring(4)
    const secondNumber = +multiplicationNumbers[1].substring(0, multiplicationNumbers[1].length-1)
    return firstNumber * secondNumber
}