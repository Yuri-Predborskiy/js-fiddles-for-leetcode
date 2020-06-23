/*
Merge overlapping intervals where next one starts before current one ends

Sort inputs by start time
Update end time if start time is smaller than current end time
If next start time is greater than current end, save current interval to output and update start/end

Time complexity: O(n*log(n))
Space complexity: O(n)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
let merge = function(intervals) {
    if (intervals.length < 1) {
        return intervals;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [];
    let start = intervals[0][0];
    let end = intervals[0][1];
    for (let i = 1; i <= intervals.length; i++) {
        const interval = intervals[i] || [Infinity, -1];
        if (interval[0] > end) {
            result.push([start, end]);
            start = interval[0];
            end = interval[1]
        } else {
            end = Math.max(end, interval[1]);
        }
    }
    return result;
};

let tests = [
    {params: [[[1,3],[2,6],[8,10],[15,18]]], ans: [[1,6],[8,10],[15,18]]},
    {params: [[[1,4],[4,5]]], ans: [[1,5]]},
    {params: [[[1,4],[2,3]]], ans: [[1,4]]},
    {params: [[]], ans: []},
];

tests.forEach(test => {
    let res = merge(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
