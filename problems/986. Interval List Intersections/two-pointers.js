/*
Interval List Intersections
Solution using two pointers

Define start as max between a.start and b.start
Define end as min between a.end and b.end
If start <= end, they intersect somewhere. In this case, intersection is from start till end
Next, increment pointer of the one that ends sooner
Repeat from the start

Time complexity: O(n+m) where n, m are input lengths
Space complexity: O(n+m)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
let intervalIntersection = function(A, B) {
    let aIndex = 0, bIndex = 0;
    const intervals = [];

    while (aIndex < A.length && bIndex < B.length) {
        const [aStart, aEnd] = A[aIndex];
        const [bStart, bEnd] = B[bIndex];

        const start = Math.max(aStart, bStart);
        const end = Math.min(aEnd, bEnd);
        if (start <= end) {
            intervals.push([start, end]);
        }
        if (aEnd > bEnd) {
            bIndex++;
        } else {
            aIndex++;
        }
    }

    return intervals;
};


const tests = [
    {
        params: [[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]],
        ans: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
    },
    {
        params: [[[5,10]],[[5,10]]],
        ans: [[5,10]]
    },
    {
        params: [[[8,15]],[[2,6],[8,10],[12,20]]],
        ans: [[8,10],[12,15]]
    },
    {
        params: [[[2,6],[8,10],[12,20]],[[8,15]]],
        ans: [[8,10],[12,15]]
    },
];

for (let test of tests) {
    const res = intervalIntersection(...test.params);
    const correct = compareMatricesStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
