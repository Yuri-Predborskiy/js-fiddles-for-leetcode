/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
let checkStraightLine = function(coordinates) {
    if (coordinates.length < 3) {
        return true;
    }
    const [x1, y1] = coordinates[0];
    const [x2, y2] = coordinates[1];
    const slope = (y2 - y1) / (x2 - x1);
    for (let i = 2; i < coordinates.length; i++) {
        const [x1, y1] = coordinates[i - 1];
        const [x2, y2] = coordinates[i];
        const slope2 = (y2 - y1) / (x2 - x1);
        if (slope2 !== slope) {
            return false;
        }
    }
    return true;
};

let tests = [
    {
        params: [[[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]],
        ans: true,
    },
    {
        params: [[[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]],
        ans: false,
    },
];

tests.forEach(test => {
    let res = checkStraightLine(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
