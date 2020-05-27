/*
Given an array of people who dislike other people, split them into two camps - reds and blues
If you can split them so that each camp has zero dislikes inside the camp (and any number of dislikes of the other one)
    return true. If they cannot be split in such a manner (there will be someone disliked by both camps), return false

Time complexity: O(n * d) where n = number of presidental candidates, d - number of dislikes
Space complexity: O(n * d)
 */

/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
let possibleBipartition = function(N, dislikes) {
    function dfs() {
        while (stack.length > 0) {
            const [id, team, otherTeam] = stack.pop();
            if (team.has(id)) {
                continue; //works like a visited set
            } else if (otherTeam.has(id)) {
                return false;
            }
            team.add(id);
            neutral.delete(id);
            if (people[id] && people[id].length > 0) {
                for (let child of people[id]) {
                    stack.push([child, otherTeam, team]);
                }
            }
        }
        return true;
    }

    if (dislikes.length < 1) {
        return true;
    }

    const blue = new Set();
    const red = new Set();
    const neutral = new Set();
    const people = new Array(N + 1);

    blue.name = 'blue';
    red.name = 'red';
    people[0] = null;

    for (let [id, otherId] of dislikes) {
        people[id] = people[id] || [];
        people[id].push(otherId);
        people[otherId] = people[otherId] || [];
        people[otherId].push(id);
        neutral.add(id);
    }

    // stack with array of two values: id, team
    const stack = [[dislikes[0][0], blue, red]];
    if (!dfs()) {
        return false;
    }

    while (neutral.size > 0) {
        const neutralPerson = neutral.values().next().value;
        stack.push([neutralPerson, blue, red]);
        if (!dfs()) {
            return false;
        }
    }

    return true;
};

let tests = [
    {params: [4, [[1,2],[1,3],[2,4]]], ans: true},
    {params: [3, [[1,2],[1,3],[2,3]]], ans: false},
    {params: [5, [[1,2],[2,3],[3,4],[4,5],[1,5]]], ans: false},
    {params: [4, [[1,2],[2,1],[3,4]]], ans: true},
    {params: [4, []], ans: true},
];

tests.forEach(test => {
    let res = possibleBipartition(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
