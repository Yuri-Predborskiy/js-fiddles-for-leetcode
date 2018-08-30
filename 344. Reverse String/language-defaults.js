/**
 * @param {string} s
 * @return {string}
 */
let reverseString = function(s) {
    return s.split('').reverse().join('');
};

let tests = [
    { strings: 'hello', ans: 'olleh' },
    { strings: 'A man, a plan, a canal: Panama', ans: 'amanaP :lanac a ,nalp a ,nam A' },
];

tests.forEach(test => {
    let res = reverseString(test.strings);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
