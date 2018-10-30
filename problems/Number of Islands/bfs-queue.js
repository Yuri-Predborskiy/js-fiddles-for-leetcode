/**
 * @param {char[][]} grid
 * @return {number}
 */
let numIslands = function(grid) {

};

let tests = [
    {
        params: [
            [
                [1,1,1,1,0],
                [1,1,0,1,0],
                [1,1,0,0,0],
                [0,0,0,0,0],
            ],
        ],
        ans: 1
    },
    {
        params: [
            [
                [1,1,0,0,0],
                [1,1,0,0,0],
                [0,0,1,0,0],
                [0,0,0,1,1],
            ],
        ],
        ans: 3 // 3 separate groups of 1s that have 0 around them (up left right bottom)
    },
];

tests.forEach(test => {
    let res = fourSumCount(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
