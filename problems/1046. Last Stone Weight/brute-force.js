// brute force solution with minor optimizations

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    if (stones.length < 2) {
        return stones[0];
    }
    let max = 0, max2 = 0, maxIn = -1, max2In = -1, length = stones.length;
    while (length > 1) {
        length = max = max2 = 0;
        for (let i = 0; i < stones.length; i++) {
            if (stones[i] > max) {
                max2 = max;
                max2In = maxIn;
                max = stones[i];
                maxIn = i;
            } else if (stones[i] > max2) {
                max2 = stones[i];
                max2In = i;
            }
            if (stones[i] > 0) {
                length++;
            }
        }
        if (length < 2) {
            break;
        }
        let res = max - max2;
        if (res > 0) {
            stones.push(res);
        }
        stones[maxIn] = 0;
        stones[max2In] = 0;
    }

    return max;
};

let tests = [
    {
        params: [[2,7,4,1,8,1]],
        ans: 1,
    },
    {
        params: [[1,3]],
        ans: 2,
    },
    {
        params: [[2,2]],
        ans: 0,
    },
    {
        params: [[8,10,4]],
        ans: 2,
    },
    {
        params: [[3,7,8]],
        ans: 2,
    },
];

tests.forEach(test => {
    let res = lastStoneWeight(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});