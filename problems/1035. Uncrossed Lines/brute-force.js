/*
Uncrossed lines
You can draw a line from top to bottom if numbers are identical
You may not draw multiple numbers from/to same number
Return maximum number of lines you can draw without any lines crossing
Brute force algorithm. It works but takes way too long to compute all possible variants for larger inputs

Time complexity: O(3^n) - time limit exceeded
Space complexity: O(nm) where n, m are lengths of inputs
 */

/**
 * @param {number[]} top
 * @param {number[]} bottom
 * @return {number}
 */
let maxUncrossedLines = function(top, bottom) {
    const stack = [[0, -1, 0]];
    let max = 0;
    while (stack.length > 0) {
        const [topIndex, bottomIndex, connectionsNumber] = stack.pop();
        if (topIndex >= top.length || bottomIndex >= bottom.length) {
            continue;
        }

        for (let i = bottomIndex + 1; i < bottom.length; i++) {
            if (top[topIndex] === bottom[i]) {
                max = Math.max(max, connectionsNumber + 1);
                if (topIndex + 1 < top.length && i < bottom.length) {
                    stack.push([topIndex + 1, i, connectionsNumber + 1]);
                }
            }
        }
        if (topIndex + 1 < top.length) {
            stack.push([topIndex + 1, bottomIndex, connectionsNumber]);
        }
    }

    return max;
};

let tests = [
    {params: [[2,1], [1,2,1,3,3,2]], ans: 2},
    {params: [[1,4,2], [1,2,4]], ans: 2},
    {params: [[2,5,1,2,5], [10,5,2,1,5,2]], ans: 3},
    {params: [[1,3,7,1,7,5], [1,9,2,5,1]], ans: 2},
    {
        params: [
            [2,3,4,1,3,3,2,4,2,2,1,5,2,4,3,4,4,5,1,5,1,5,4,3,1,2,5,2,4,4],
            [2,2,4,2,4,1,1,5,5,3,2,1,1,1,3,1,2,5,2,4,3,4,5,5,3,3,5,1,4,3]
        ],
        ans: 16
    },
];

tests.forEach(test => {
    let res = maxUncrossedLines(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
