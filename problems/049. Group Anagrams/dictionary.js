const {compareArrays} = require('../helper');

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
let groupAnagrams = function(strs) {
    let dict = new Map();
    for (let i = 0; i < strs.length; i++) {
        let item = strs[i].split('').sort().join();
        if (!dict.has(item)) {
            dict.set(item, [strs[i]]);
        } else {
            let record = dict.get(item);
            record.push(strs[i]);
            dict.set(item, record);
        }
    }
    return [...dict.values()];
};

let tests = [
    {
        inputs: [
            ["eat", "tea", "tan", "ate", "nat", "bat"]
        ],
        ans: [
            ["ate","eat","tea"],
            ["nat","tan"],
            ["bat"]
        ]
    },
];

tests.forEach(test => {
    let res = groupAnagrams(...test.inputs);
    let correct = compareArrays(test.ans, res);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

