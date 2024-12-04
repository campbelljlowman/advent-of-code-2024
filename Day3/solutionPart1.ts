const input = await Bun.file("input.txt").text()

const multiplicationRegex = new RegExp(/mul\(\d+,\d+\)/g)
const multiplications = input.match(multiplicationRegex)


let total = 0

for (const multiplication of multiplications!) {
    const multiplicationNumbers = multiplication.split(',')
    const firstNumber = +multiplicationNumbers[0].substring(4)
    const secondNumber = +multiplicationNumbers[1].substring(0, multiplicationNumbers[1].length-1)
    console.log(firstNumber, secondNumber)

    total += firstNumber * secondNumber
}

console.log("Total of multiplications: " + total)