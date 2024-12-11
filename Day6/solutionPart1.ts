const input = await Bun.file("input.txt").text()

const guardMap = input.split('\n')
let currentRow = 0
let currentColumn = 0
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
let currentDirection: Direction = Direction.Up

for (let i = 0; i < guardMap.length; i ++) {
    for (let j = 0; j < guardMap[0].length; j++) {
        if (guardMap[i][j] === '^') {
            currentRow = i
            currentColumn = j
            currentDirection = Direction.Up
        }
    }
}

while(true) {
    console.log(guardMap)
    console.log("Current row " + currentRow + " current column " + currentColumn + " current direction " + currentDirection)
    const coordinatesAreOffGrid = areCoordinatesOffGrid()
    if (coordinatesAreOffGrid) {
        break
    }
    if(guardMap[currentRow][currentColumn] !== '#') {
        markSpaceAsVisited()
        advanceCoordinates()

    } else {
        backtrackCoordinates()
        currentDirection = getNextDirection(currentDirection)
    }
}

console.log(guardMap)

let numberOfSpacesVisited = 0
for (let i = 0; i < guardMap.length; i ++) {
    for (let j = 0; j < guardMap[0].length; j++) {
        if (guardMap[i][j] === 'X') {
            numberOfSpacesVisited++
        }
    }
}

console.log(numberOfSpacesVisited)

function getNextDirection(direction: Direction): Direction {
    switch(direction) {
        case (Direction.Up): {
            return Direction.Right
        }
        case (Direction.Right): {
            return Direction.Down
        }
        case (Direction.Down): {
            return Direction.Left
        }
        case (Direction.Left): {
            return Direction.Up
        }
    }
}

function markSpaceAsVisited() {
    let rowChars = [...guardMap[currentRow]]
    rowChars[currentColumn] = 'X'
    guardMap[currentRow] = rowChars.join('')
}

function backtrackCoordinates() {
    switch(currentDirection) {
        case (Direction.Up): {
            currentRow++
            return 
        }
        case (Direction.Right): {
            currentColumn--
            return 
        }
        case (Direction.Down): {
            currentRow--
            return 
        }
        case (Direction.Left): {
            currentColumn++
            return 
        }
    }
}

function advanceCoordinates() {
        switch(currentDirection) {
        case Direction.Up: {
            currentRow--
            break
        }
        case Direction.Down: {
            currentRow++
            break
        }
        case Direction.Left: {
            currentColumn--
            break
        }
        case Direction.Right: {
            currentColumn++
            break
        }
    }
}

function areCoordinatesOffGrid(): boolean {
    if (currentRow < 0) {
        console.log("Row went negative ")
        return true
    }
    if (currentRow > guardMap.length - 1) {
        console.log("Row went greater than row length ")
        return true
    }
    if (currentColumn < 0) {
        console.log("Column went negative ")
        return true
    }
    if (currentColumn > guardMap[0].length - 1) {
        console.log("Column went greater than column length ")
        return true
    }
    return false
}