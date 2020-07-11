/*
Calculate number of ways you can decode a message, given a string of numbers

Solution using dynamic programming
1. At each point if current value can be used, add previous result
Logic: every individual number (other than 0) can be used once, and this is one way to decode a message
So if we are only decoding current value without combining it with anything, it does not add more ways to decode
    the message, it simply means message can be decoded
2. At each point look at last two values.
If the number is between 10 and 26, add number of ways to decode message before these two numbers.
This means we can decode the message in two ways:
    - using each number individually
    - using both numbers at the same time
If one of the checks fails, number of ways to decode a message using that condition becomes 0.
This means we can either decode message using one way ("10" can be decoded as "10" only, same as "32" = "3,2")
If both of the checks fail, we cannot decode the message at all

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {number}
 */
let numDecodings = function(s) {
    const numberOfDecodes = new Array(s.length + 1);
    numberOfDecodes[0] = 1;
    numberOfDecodes[1] = s[0] === '0' ? 0 : 1;
    for (let i = 2; i <= s.length; i++) {
        const one = Number.parseInt(s[i - 1]);
        const two = Number.parseInt(s.substring(i - 2, i));
        if (one > 0 && one <= 9) {
            numberOfDecodes[i] = numberOfDecodes[i - 1];
        }
        if (two >= 10 && two <= 26) {
            numberOfDecodes[i] = (numberOfDecodes[i] || 0) + numberOfDecodes[i - 2];
        }
    }
    return numberOfDecodes[s.length] || 0;
};

let tests = [
    {params: ["12"], ans: 2},
    {params: ["123123"], ans: 9},
    {params: ["30"], ans: 0},
    {params: ["10"], ans: 1},
    {params: ["226"], ans: 3},
];

tests.forEach(test => {
    let res = numDecodings(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
