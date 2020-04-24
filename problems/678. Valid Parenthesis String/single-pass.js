// same as two-pass but performing all calculations inside the same loop
/**
 * @param {string} s
 * @return {boolean}
 */
let checkValidString = function(s) {
    let opens = 0, closes = 0, starsLeft = 0, starsRight = 0;
    for (let i = 0, j = s.length - 1; i < s.length; i++, j--) {
        if (s[i] === '(') {
            opens++;
        }
        if (s[j] === ')') {
            closes++;
        }
        if (s[i] === '*') {
            starsLeft++;
        }
        if (s[j] === '*') {
            starsRight++;
        }
        if (s[i] === ')') {
            if (opens > 0) {
                opens--;
            } else if (starsLeft > 0) {
                starsLeft--;
            } else {
                return false;
            }
        }
        if (s[j] === '(') {
            if (closes > 0) {
                closes--;
            } else if (starsRight > 0) {
                starsRight--;
            } else {
                return false;
            }
        }
    }
    return true;
};

let tests = [
    {
        params: ['(())((())()()(*)(*()(())())())()()((()())((()))(*'],
        ans: false,
    },
    {
        params: ['(*()'],
        ans: true,
    },
    {
        params: ['('],
        ans: false,
    },
    {
        params: ['()'],
        ans: true,
    },
    {
        params: ['(*)'],
        ans: true,
    },
    {
        params: ['(*))'],
        ans: true,
    },
];

tests.forEach(test => {
    let res = checkValidString(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
