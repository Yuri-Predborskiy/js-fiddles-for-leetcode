const {compareArrays} = require('../helper');

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
let groupAnagrams = function(strs) {
    let dict = {};
    for (let i = 0; i < strs.length; i++) {
        let item = strs[i].split('').sort().join();
        if (!dict[item]) {
            dict[item] = [strs[i]];
        } else {
            dict[item].push(strs[i]);
        }
    }
    return Object.values(dict);
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

