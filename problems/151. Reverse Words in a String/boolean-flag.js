/*
Reverse words in a string. Trim white space. Remove extra spaces between words

Solution using boolean flag while reading the string backwards. Similar to two pointers.
Firstly, find a non-space string. Set boolean flag and update right index.
Then, find a space. If boolean flag is set, unset the flag and copy word to array of words.
When finished, perform an extra check on the last word.

Return joined words. No need to reverse words because we read the string from the end.

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
let reverseWords = function(s) {
    let isWord = false;
    let rightIndex = 0;
    const words = [];

    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] !== ' ' && !isWord) {
            isWord = true;
            rightIndex = i;
        } else if (s[i] === ' ' && isWord) {
            isWord = false;
            words.push(s.substring(i + 1, rightIndex + 1));
        }
    }
    if (isWord) {
        words.push(s.substring(0, rightIndex + 1));
    }
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

