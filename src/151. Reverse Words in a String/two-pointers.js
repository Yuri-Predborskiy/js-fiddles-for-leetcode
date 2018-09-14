/**
 * @param {string} str
 * @returns {string}
 */
let reverseWords = function(str) {
    function skipSpaces(index) {
        while (str[index] === ' ') {
            index--;
        }
        return index;
    }
    let words = [];
    let fast = skipSpaces(str.length - 1), slow = fast;
    do {
        if (str[fast] === ' ' || fast === -1) {
            words.push(str.substring(fast + 1, slow + 1));
            fast = skipSpaces(fast);
            slow = fast;
        }
    } while (fast-- >= 0);
    return words.join(' ');
};

let tests = [
    { str: "the sky is blue", ans: "blue is sky the" },
    { str: "  the    sky  is  blue  ", ans: "blue is sky the" },
];

tests.forEach(test => {
    let res = reverseWords(test.str);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

