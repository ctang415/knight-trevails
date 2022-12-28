import './style.css';

 const knightArray = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, -1], [-2, 1]]

 const getMoves = (currentPosition) => {
    const possibleMoves = [];
    for (let element of knightArray) {
        const first = currentPosition[0] + element[0]
        const second = currentPosition[1] + element[1]
        if (first <= 7 && second <= 7) {
        possibleMoves.push([first, second])
        }
    }
    console.log(possibleMoves)
 }
 getMoves([3, 6])