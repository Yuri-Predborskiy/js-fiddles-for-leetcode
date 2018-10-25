const {compareArrays} = require('../helper');

/*
    Idea: use count sort
    Go over the elements and write down their count into dictionary. O(n)
    Go over the counts and save them into array where count - array index and element - items with that count. O(n)
    Then go over the array from the back and pick out first (last) K elements. O(n)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function(nums, k) {
    let repeats = new Map(), itemsByFreq = [], res = [];
    for (let i = 0; i < nums.length; i++) {
        let r = repeats.get(nums[i]) || 0;
        repeats.set(nums[i], r + 1);
    }

    repeats.forEach((rep, item) => {
        itemsByFreq[rep] = itemsByFreq[rep] || [];
        itemsByFreq[rep].push(item);
    });

    for (let i = itemsByFreq.length - 1; i >= 0; i--) {
        while (itemsByFreq[i] && itemsByFreq[i].length > 0) {
            res.push(itemsByFreq[i].pop());
            if (res.length >= k) return res;
        }
    }

    return res;
};

let tests = [
    { params: [[1,1,1,2,2,3], 2], ans: [1,2] },
    { params: [[1], 1], ans: [1] },
];

tests.forEach(test => {
    let res = topKFrequent(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
