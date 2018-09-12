/**
 * @param {string} str
 * @returns {string}
 */
let reverseWords = function(str) {
    return str.trim().split(/\s+/).reverse().join(' ');
};

let tests = [
    { str: "the sky is blue", ans: "blue is sky the" },
];

tests.forEach(test => {
    let res = reverseWords(test.str);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

