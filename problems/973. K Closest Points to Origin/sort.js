/*
Find K elements closest to center point [0,0] using pythagorean theorem
Which says sum of squares of sides (side*side) equals to square of distance (or, to be precise, sqrt them all)
Then just sort the array with distances and pick first K elements

Time complexity: O(n * log(n)) for sorting
Space complexity: O(n)
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
let kClosest = function(points, K) {
    const pointsSorted = points.map(p => {
        return {point: p, distance: p[0] * p[0] + p[1] * p[1]}
    }).sort((a, b) => a.distance - b.distance);

    let count = 0;
    const result = [];
    while (count < K) {
        result.push(pointsSorted[count].point);
        count++;
    }
    return result;
};

let tests = [
    {params: [[[1,3],[-2,2]], 1], ans: [[-2,2]]},
    {params: [[[3,3],[5,-1],[-2,4]], 2], ans: [[3,3],[-2,4]]},
];

tests.forEach(test => {
    let res = kClosest(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
