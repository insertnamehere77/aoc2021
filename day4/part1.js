const fs = require('fs');

const splitBoardRowStr = (rowStr) => rowStr
    .split(' ')
    .filter(line => line !== '')
    .map(numStr => parseInt(numStr));

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n\n')
        .filter(line => line !== '');

    const draws = inputArr[0]
        .split(',')
        .map(str => parseInt(str));

    const boards = inputArr
        .slice(1).map(boardStr => {

            const rows = boardStr
                .split('\n')
                .filter(line => line !== '')
                .map(rowStr => splitBoardRowStr(rowStr));

            const numCols = rows[0].length;
            const cols = [];
            for (let i = 0; i < numCols; i++) {
                const col = rows.map(row => row[i]);
                cols.push(col);
            }

            return [...rows, ...cols];

        });

    return { draws, boards };
}




const checkBoard = (board, drawnSet) =>
    board
        .some(bingo =>
            bingo.every(num => drawnSet.has(num)));


const distinctArr = (arr) =>
    [...new Set(arr).values()];


const getBoardScore = (board, drawnSet) => {
    const flatNums = distinctArr(board.flat());
    const unmarkedNums = flatNums.filter(num => !drawnSet.has(num));
    return unmarkedNums.reduce((sum, curr) => sum + curr, 0);
}




const findSolution = (draws, boards) => {
    const drawnSet = new Set();
    for (draw of draws) {
        drawnSet.add(draw);
        const winningBoard = boards.find(board => checkBoard(board, drawnSet));
        if (winningBoard) {

            return getBoardScore(winningBoard, drawnSet) * draw;
        }
    }
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input.draws, input.boards);
    console.log(solution);
};

main();