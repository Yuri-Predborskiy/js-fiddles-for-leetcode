/*
Solution using arrays
Array trustMe = number of people who trust this index (second value in trust array)
Array iTrust = number of people this index trusts (first value in trust array)
At the start we can create N+1-sized arrays for both collections, since index 0 is not used and trust does not repeat

We're looking for an index that has N-1 in trustMe and 0 or "undefined" in iTrust

Since there is only one person that is trusted by everyone but trusts no one,
    keep a record of the most trusted person (index and number of trusts).
    If they are trusted by N-1 and they trust no one, they're the Judge.
    If someone doesn't trust them or they trust someone, return -1

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
let findJudge = function(N, trust) {
    if (N === 1) {
        if (trust.length === 0) {
            return 1;
        }
    }
    let mostTrusted = 0, mostTrustedIndex = 1;
    const iTrust = new Array(N + 1);
    const trustMe = new Array(N + 1);
    for (const t of trust) {
        iTrust[t[0]] = (iTrust[t[0]] || 0) + 1;
        trustMe[t[1]] = (trustMe[t[1]] || 0) + 1;
        if (trustMe[t[1]] > mostTrusted) {
            mostTrusted = trustMe[t[1]];
            mostTrustedIndex = t[1];
        }
    }
    if (mostTrusted === N - 1 && typeof iTrust[mostTrustedIndex] === 'undefined') {
        return mostTrustedIndex;
    }
    return -1;
};

let tests = [
    {
        params: [1, []],
        ans: 1,
    },
    {
        params: [2, [[1,2]]],
        ans: 2,
    },
    {
        params: [3, [[1,3],[2,3]]],
        ans: 3,
    },
    {
        params: [3, [[1,3],[2,3],[3,1]]],
        ans: -1,
    },
    {
        params: [3, [[1,2],[2,3]]],
        ans: -1,
    },
    {
        params: [4, [[1,3],[1,4],[2,3],[2,4],[4,3]]],
        ans: 3,
    },
];

tests.forEach(test => {
    let res = findJudge(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
