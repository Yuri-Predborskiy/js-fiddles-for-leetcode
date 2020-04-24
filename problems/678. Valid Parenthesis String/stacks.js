/**
 * @param {string} s
 * @return {boolean}
 */
let checkValidString = function(s) {
    const openStack = [];
    const starStack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openStack.push(i);
        }
        if (s[i] === '*') {
            starStack.push(i);
        }
        if (s[i] === ')') {
            if (openStack.length > 0) {
                openStack.pop();
            } else if (starStack.length > 0) {
                starStack.pop();
            } else {
                return false;
            }
        }
    }
    while (openStack.length > 0) {
        let openIndex = openStack.pop();
        let starIndex = starStack.pop() || -1;
        if (starIndex < openIndex) {
            return false;
        }
    }

    return true;
};

let tests = [
    {
        params: [')('],
        ans: false,
    },
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
