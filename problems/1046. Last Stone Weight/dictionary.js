/*
using a dictionary algorithm

since we know the max weight of a stone (<= 1000), we can do a hash map / dictionary
dict contains all weights that were included in the array, and number of stones of respective weight
collect all weights and their numbers into dict
decrease number of biggest and second biggest by 1
if something remains after smashing, increase this number by 1
continue iterating over remaining weights

time complexity - O(n) for each iteration, O(n) iterations, total O(n^2)

Benefits:
we only iterate over the stones dictionary once

Drawbacks:
time complexity is O(n^2)
 */

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    let max = 0, max2 = 0;
    const map = {};

    for (let stone of stones) {
        map[stone] = (map[stone] || 0) + 1;
    }

    while (Object.keys(map).length > 1 || map[Object.keys(map)[0]] > 1) {
        for (let stone of Object.keys(map)) {
            stone = Number.parseInt(stone);
            if (stone > max) {
                if (map[stone] > 1) {
                    max2 = max = stone;
                } else {
                    max2 = max;
                    max = stone;
                }
            } else if (stone > max2) {
                max2 = stone;
            }
        }
        map[max]--;
        map[max2]--;
        if (map[max] === 0) {
            delete map[max];
        }
        if (map[max2] === 0) {
            delete map[max2];
        }
        let result = max - max2;
        if (result > 0) {
            map[result] = (map[result] || 0) + 1;
        }
        max = max2 = 0;
    }
    return Object.keys(map)[0] || 0;
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
];

tests.forEach(test => {
    let res = lastStoneWeight(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});