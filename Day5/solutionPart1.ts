const input = await Bun.file("input.txt").text()

const inputParts = input.split('\n\n')
const pageOrderingRulePairs = inputParts[0].split('\n')
const pagesToProduce = inputParts[1].split('\n')

let pageOrderingRules: Map<number, number[]> = new Map()
let validPageArrys: string[][] = []
let sumOfValidMiddlePages = 0

for (const rulePair of pageOrderingRulePairs) {
    const [rulePariKey, rulePairValue] = rulePair.split('|')
    let orderingRule = pageOrderingRules.get(+rulePariKey)
    if (orderingRule === undefined) {
        orderingRule = [+rulePairValue]
    } else {
        orderingRule.push(+rulePairValue)
    }
    pageOrderingRules.set(+rulePariKey, orderingRule)
}

console.log(pageOrderingRules)

loop1:
for (const pages of pagesToProduce) {
    const pagesArray = pages.split(',')
    for (let i = 0; i < pagesArray.length; i ++) {
        const pageOrderingRule = pageOrderingRules.get(+pagesArray[i])
        if (pageOrderingRule !== undefined) {
            const pagesBefore = pagesArray.slice(0, i)
            if (pagesBefore.some(e=> pageOrderingRule.includes(+e))) {
                console.log("Found invalid page ordering: " + pagesArray + " page: " + pagesArray[i] + " must come before these pages: " + pageOrderingRule)
                continue loop1
            }
        }
    }
    console.log("Valid array " + pagesArray)
    validPageArrys.push(pagesArray)
}


for (const validPageArray of validPageArrys) {
    const middlePage = validPageArray[Math.floor((validPageArray.length - 1) / 2)];
    sumOfValidMiddlePages += +middlePage
}

console.log(sumOfValidMiddlePages)