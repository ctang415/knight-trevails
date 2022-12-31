import './style.css';

 const knightArray = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, -1], [-2, 1]]
 
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
        const fastestPathMoves = fastestPath.length - 1
        console.log("=> You made it in " + `${fastestPathMoves}` + " moves. Here is your path: ")
        fastestPathReverse.forEach(element => console.log(element))
    }


knightMoves([0,0], [7,4])