/*
Calculate the number of operations that need to be performed to change word1 into word2
Solution using 2d dynamic programming matrix

Each row shows how many changes are required for each letter in word1 to become word2
If letters are identical, take value at the top-left corner of DP table
If letters are different, take minimum of previous, top and diagonal left-top element and add 1.
Solution is in the final row/column of dp table

Time complexity: O(n)
Space complexity: O(n)
Solution inspired by Tushar Roy - Coding Made Simple youtube channel
https://www.youtube.com/watch?v=We3YDTzNXEk
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number} n
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
let checkIfPrerequisite = function(n, prerequisites, queries) {
    function dfs(start, finish) {
        const stack = [start];
        const visited = new Set();
        while (stack.length > 0) {
            const node = nodes[stack.pop()];
            if (visited.has(node)) {
                continue;
            }
            visited.add(node);
            if (node.children.includes(finish)) {
                return true;
            } else {
                stack.push(...node.children);
            }
        }
        return false;
    }

    const nodes = [];
    for (let i = 0; i < n; i++) {
        nodes.push({children: []});
    }

    for (let p of prerequisites) {
        nodes[p[0]].children.push(p[1]);
    }

    const results = [];

    for (let q of queries) {
        results.push(dfs(q[0], q[1]));
    }
    return results;
};

let tests = [
    {params: [2, [[1,0]], [[0,1],[1,0]]], ans: [false, true]},
    {params: [2, [], [[1,0],[0,1]]], ans: [false, false]},
    {params: [3, [[1,2],[1,0],[2,0]], [[1,0],[1,2]]], ans: [true, true]},
    {params: [3, [[1,0],[2,0]], [[0,1],[2,0]]], ans: [false, true]},
    {params: [5, [[0,1],[1,2],[2,3],[3,4]], [[0,4],[4,0],[1,3],[3,0]]], ans: [true,false,true,false]},
];

tests.forEach(test => {
    let res = checkIfPrerequisite(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
