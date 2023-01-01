import './style.css';

 const knightArray = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, -1], [-2, 1]]
 const container = document.querySelector('.container')

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
        fastestPathReverse.forEach(element => console.log(element))
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
                    knightPiece.currentPosition.push(positionX, positionY)
                } else {
                    const positionX = parseInt(div.getAttribute('data-id')[0])
                    const positionY = parseInt(div.getAttribute('data-id')[3])
                    knightPiece.finalPosition.push(positionX, positionY)
                    knightMoves(knightPiece.currentPosition, knightPiece.finalPosition)
                }
            })
            container.appendChild(div).className = "div";
            }
        }
    };

    createGrid(8, 8)