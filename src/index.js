import './style.css';
import KnightImage from './knight.svg'

 const knightArray = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, -1], [-2, 1]]
 const container = document.querySelector('.container')
 const textBoxes = document.querySelector('.text')
 const startText = document.createElement('span')
 const endText = document.createElement('span')
 const resultText = document.createElement('span')
 const knight = new Image()
 knight.src = KnightImage
 knight.classList.add('image')

 textBoxes.appendChild(startText)
 textBoxes.appendChild(endText)
 textBoxes.appendChild(resultText)

 class Knight {
    constructor(currentPosition, finalPosition) {
        this.currentPosition = []
        this.finalPosition = []
    }
    clearPositions() {
        this.currentPosition = []
        this.finalPosition = []
    }
}

const knightPiece = new Knight;

 const knightMoves = (currentPosition, finalPosition) => {
    const queue = [currentPosition]
    const visited = []
    const obj = {};
    while (queue.length !== 0) {
        const currentPosition = queue.shift()
        const positionString = `${currentPosition[0]},${currentPosition[1]}`
        if (Object.keys(obj).length === 0) {
            obj[positionString] = 'No parent'
        }
        visited.push(positionString)
        if (currentPosition[0] === finalPosition[0] && currentPosition[1] === finalPosition[1]) {
            knightPiece.clearPositions()
            return backtrackMoves(obj, currentPosition)
        }
        for (let element of knightArray) {
            const xCoordinate = currentPosition[0] + element[0]
            const yCoordinate = currentPosition[1] + element[1]
            const newCoord = `${xCoordinate},${yCoordinate}`
            if ((xCoordinate >= 0 && xCoordinate <= 7) && (yCoordinate >= 0 && yCoordinate <= 7)) {
                if (!visited.includes(newCoord)) {
                    obj[newCoord] = currentPosition
                    queue.push([xCoordinate, yCoordinate])
                    }
                }
            }
        }
    }

    const backtrackMoves = (obj, currentPosition) => {
        const fastestPath = [];
        while (obj[currentPosition]) {
            fastestPath.push(currentPosition)
            currentPosition = obj[currentPosition]
        }
        const fastestPathReverse = fastestPath.reverse();
        console.log(fastestPath)
        const fastestPathMoves = fastestPath.length - 1
        console.log("=> You made it in " + `${fastestPathMoves}` + " moves. Here is your path: ")
        resultText.textContent = "=> You made it in " + `${fastestPathMoves}` + " moves. Here is your path: "
        fastestPathReverse.forEach(element => console.log(element))
        fastestPathReverse.forEach(element => resultText.textContent += `[${element}]`)
    }

    function createGrid(col, row) {
        for (let i = 0; i < col ; i++){
            for (let j = 0; j < row; j++) {
            let div = document.createElement('div');
            div.setAttribute('data-id', [`${i}, ${j}`])
            if ((i + j) % 2 === 0) {
                div.style.backgroundColor = '#EDE0B2'
            }
            div.addEventListener('click', () => {
                if (knightPiece.currentPosition.length === 0) {
                    const positionX = parseInt(div.getAttribute('data-id')[0])
                    const positionY = parseInt(div.getAttribute('data-id')[3])
                    endText.textContent = ''
                    resultText.textContent = ''
                    startText.textContent = `Starting Position: [${positionX}, ${positionY}]`
                    div.appendChild(knight)
                    knightPiece.currentPosition.push(positionX, positionY)
                } else {
                    const positionX = parseInt(div.getAttribute('data-id')[0])
                    const positionY = parseInt(div.getAttribute('data-id')[3])
                    knightPiece.finalPosition.push(positionX, positionY)
                    knightMoves(knightPiece.currentPosition, knightPiece.finalPosition)
                    endText.textContent = `Final Position: [${positionX}, ${positionY}]`
                }
            })
            container.appendChild(div).className = "div";
            }
        }
    };

    createGrid(8, 8)