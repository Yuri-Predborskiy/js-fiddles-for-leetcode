/*
Reconstruct queue based on height of elements and number of elements in front with same or bigger height

Naive solution that is based on hints
Find the smallest person, insert them into appropriate index (number of people in front = valid index)
Repeat this procedure for each following person, but skip people that are already in place in the process

Gets time limit exceeded due to ridiculously large tests.

Time complexity: O(n^3)
Space complexity: O(n)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
let reconstructQueue = function(people) {
    function swap(left, right) {
        if (left === right) {
            return;
        }
        let temp = people[left];
        people[left] = people[right];
        people[right] = temp;
    }

    function findAndSwap(index) {
        const person = people[index];
        let targetIndex = person[1];
        let currentIndex = 0;
        let skipped = 0;
        while (inserted[currentIndex] || targetIndex !== skipped) {
            if (!inserted[currentIndex] || people[currentIndex][0] >= person[0]) {
                skipped++;
            }
            currentIndex++;
        }
        swap(index, currentIndex);
        inserted[currentIndex] = true;
    }

    const inserted = new Array(people.length).fill(false);

    let max = -Infinity;
    let found = false;
    let h = 0;
    do {
        for (let i = 0; i < people.length; i++) {
            if (!found && people[i][0] > max) {
                max = people[i][0];
            }
            if (people[i][0] === h && !inserted[i]) {
                findAndSwap(i);
                i = 0;
            }
        }
        found = true;
        h++;
    } while (h <= max);

    return people;
};

let tests = [
    {
        params: [[[8,2],[4,2],[4,5],[2,0],[7,2],[1,4],[9,1],[3,1],[9,0],[1,0]]],
        ans: [[1,0],[2,0],[9,0],[3,1],[1,4],[9,1],[4,2],[7,2],[8,2],[4,5]]
    },
    {
        params: [[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]],
        ans: [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
    },
    {
        params: [[
            [40,11],[81,12],[32,60],[36,39],[76,19],[11,37],[67,13],[45,39],[99,0],[35,20],[15,3],[62,13],[90,2],
            [86,0],[26,13],[68,32],[91,4],[23,24],[73,14],[86,13],[62,6],[36,13],[67,9],[39,57],[15,45],[37,26],[12,88],
            [30,18],[39,60],[77,2],[24,38],[72,7],[96,1],[29,47],[92,1],[67,28],[54,44],[46,35],[3,85],[27,9],[82,14],
            [29,17],[80,11],[84,10],[5,59],[82,6],[62,25],[64,29],[88,8],[11,20],[83,0],[94,4],[43,42],[73,9],[57,32],
            [76,24],[14,67],[86,2],[13,47],[93,1],[95,2],[87,8],[8,78],[58,16],[26,75],[26,15],[24,56],[69,9],[42,22],
            [70,17],[34,48],[26,39],[22,28],[21,8],[51,44],[35,4],[25,48],[78,18],[29,30],[13,63],[68,8],[21,38],
            [56,20],[84,14],[56,27],[60,40],[98,0],[63,7],[27,46],[70,13],[29,23],[49,6],[5,64],[67,11],[2,31],[59,8],
            [93,0],[50,39],[84,6],[19,39]
        ]],
        ans: [
            [83,0],[86,0],[77,2],[15,3],[93,0],[35,4],[86,2],[92,1],[49,6],[21,8],[62,6],[27,9],[90,2],[59,8],[63,7],
            [26,13],[40,11],[26,15],[72,7],[36,13],[11,20],[68,8],[67,9],[29,17],[82,6],[30,18],[62,13],[23,24],
            [67,11],[35,20],[29,23],[2,31],[22,28],[58,16],[69,9],[67,13],[93,1],[56,20],[11,37],[42,22],[29,30],
            [73,9],[21,38],[19,39],[84,6],[37,26],[98,0],[24,38],[15,45],[70,13],[13,47],[26,39],[91,4],[80,11],
            [56,27],[73,14],[62,25],[70,17],[96,1],[81,12],[5,59],[25,48],[84,10],[27,46],[36,39],[5,64],[46,35],
            [29,47],[13,63],[57,32],[24,56],[95,2],[82,14],[45,39],[14,67],[67,28],[34,48],[64,29],[43,42],[50,39],
            [87,8],[8,78],[76,19],[78,18],[88,8],[84,14],[3,85],[51,44],[54,44],[99,0],[32,60],[60,40],[76,24],[68,32],
            [39,57],[12,88],[26,75],[86,13],[94,4],[39,60]
        ]
    },
];

tests.forEach(test => {
    let res = reconstructQueue(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
