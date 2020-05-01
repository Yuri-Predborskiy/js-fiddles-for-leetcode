/*
Last good version
Solution using Binary Search

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * Last good version solution function using closure. Accepts inputs same as LeetCode tests, calculates expected result
 * This solution does not count number of calls, and does not return "time limit exceeded" error
 * @param {number} numberOfVersions
 * @param {number} firstBadVersion
 * @returns {*}
 */
function lastGoodVersion(numberOfVersions, firstBadVersion) {
    function isBadVersion(n) {
        return inputs[n - 1];
    }
    const inputs = [];
    for (let i = 1; i <= numberOfVersions; i++) {
        if (i < firstBadVersion) {
            inputs.push(0);
        } else {
            inputs.push(1);
        }
    }

    return function(n) {
        // copy this section to LeetCode
        let left = 1, right = n;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return right;
        // end of copy section
    }(numberOfVersions);
}

let tests = [
    {
        params: [2,1],
        ans: 1,
    },
    {
        params: [5,4],
        ans: 4,
    },
    {
        params: [1,1],
        ans: 1,
    },
];

tests.forEach(test => {
    let res = lastGoodVersion(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
