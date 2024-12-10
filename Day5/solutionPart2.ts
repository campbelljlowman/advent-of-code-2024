const input = await Bun.file("input.txt").text()

const inputParts = input.split('\n\n')
const pageOrderingRulePairs = inputParts[0].split('\n')
const pagesToProduce = inputParts[1].split('\n')

let pageOrderingRules: Map<number, number[]> = new Map()
let validPageArrys: number[][] = []
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

for (const pages of pagesToProduce) {
    const pagesArrayStrings = pages.split(',')
    const pagesArray = pagesArrayStrings.map((num) => +num)

    const pagesAreSorted = arePagesSorted(pagesArray)
    if (!pagesAreSorted) {
        const newSortedArray = reorderPages(pagesArray)
        console.log("New sorted array " + newSortedArray)
        validPageArrys.push(newSortedArray)
    }
}


for (const validPageArray of validPageArrys) {
    const middlePage = validPageArray[Math.floor((validPageArray.length - 1) / 2)];
    sumOfValidMiddlePages += middlePage
}

console.log(sumOfValidMiddlePages)

function arePagesSorted (pagesArray: number[]): boolean {
    for (let i = 0; i < pagesArray.length; i ++) {
        const pageOrderingRule = pageOrderingRules.get(+pagesArray[i])
        if (pageOrderingRule !== undefined) {
            const pagesBefore = pagesArray.slice(0, i)
            for (const page of pagesBefore) {
                if (pageOrderingRule.includes(+page)) {
                    return false
                }
            }
        }
    }
    return true
}

function reorderPages(pagesArray: number[]): number[] {
    for (let i = 0; i < pagesArray.length; i ++) {
        const pageOrderingRule = pageOrderingRules.get(+pagesArray[i])
        if (pageOrderingRule !== undefined) {
            const pagesBefore = pagesArray.slice(0, i)

            for (const page of pagesBefore) {
                if (pageOrderingRule.includes(page)) {
                    // console.log("Found invalid page ordering: " + pagesArray + " page: " + pagesArray[i] + " must come before these pages: " + pageOrderingRule)
                    // console.log("Pages before bad pair " + pagesArray.slice(0, i-1))
                    // console.log("Page supposed to be before " + pagesArray[i])
                    // console.log("Page supposed to be after " + pagesArray[i-1])
                    // console.log("Pages after bad pair " + pagesArray.slice(i+1))

                    let newArrayToSort = [...pagesArray.slice(0, i-1), pagesArray[i], pagesArray[i-1], ...pagesArray.slice(i+1)]
                    return reorderPages(newArrayToSort)
                }
            }
        }
    }
    return pagesArray
}