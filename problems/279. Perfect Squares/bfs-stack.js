/**
 * @param {number} n
 * @return {number}
 */
let numSquares = function(n) {
    let steps = 1, numbers = [], squares = [], visited = {};
    for (let i = 1; i * i <= n; i++) {
        let square = i * i;
        if (square === n) return steps;
        squares.push(square);
        numbers.push(square);
        visited[square] = true;
    }

    while (numbers.length > 0) {
        steps++;
        let nextNumbers = [];
        for (let i = 0; i < numbers.length; i++) {
            let number = numbers[i];
            for (let j = 0; j < squares.length; j++) {
                let sum = number + squares[j];
                if (sum === n) {
                    return steps;
                } else if (!visited[sum]) {
                    nextNumbers.push(sum);
                    visited[sum] = true;
                } else if (sum > n) {
                    break;
                }
            }
        }
        numbers = nextNumbers;
    }
    return -1;
};

let tests = [
    { params: [1], ans: 1, },
    { params: [12], ans: 3, },
    { params: [13], ans: 2, },
];

tests.forEach(test => {
    let res = numSquares(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
