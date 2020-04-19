// compare from the back - in this case we can jump over backspace'd characters
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
let backspaceCompare = function(S, T) {
    let leftIndex = S.length - 1, rightIndex = T.length - 1, skipSymbol = '#', skipLeft = 0, skipRight = 0;
    while (leftIndex >= 0 || rightIndex >= 0) {
        while (S[leftIndex] === skipSymbol || skipLeft > 0) {
            skipLeft += S[leftIndex] === skipSymbol ? 1 : -1;
            leftIndex--;
        }
        while (T[rightIndex] === skipSymbol || skipRight > 0) {
            skipRight += T[rightIndex] === skipSymbol ? 1 : -1;
            rightIndex--;
        }
        if (S[leftIndex] !== T[rightIndex]) {
            return false;
        }
        leftIndex--;
        rightIndex--;
    }
    return true;
};

let tests = [
    {
        params: ['ab#c', 'ad#c'],
        ans: true,
    },
    {
        params: ['ab##', 'c#d#'],
        ans: true,
    },
    {
        params: ['a##c', '#a#c'],
        ans: true,
    },
    {
        params: ['a#c', 'b'],
        ans: false,
    },
    {
        params: ['a#c#bb', 'b'],
        ans: false,
    },
    {
        params: ['xywrrmp', 'xywrrmu#p'],
        ans: true,
    },
    {
        params: ['bxj##tw', 'bxo#j##tw'],
        ans: true,
    },
    {
        params: ['y#fo##f', 'y#f#o##f'],
        ans: true,
    },
];

tests.forEach(test => {
    let res = backspaceCompare(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
