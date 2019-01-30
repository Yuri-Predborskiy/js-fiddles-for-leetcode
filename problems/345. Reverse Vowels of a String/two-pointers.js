/*
 idea: use two pointers, skip anything that doesn't fit criteria "is a vowel"
 time complexity: O(n) (cannot be smaller, we need to scan the entire string)
 space complexity: O(1), adding a bunch of letters into a Set to use as a dictionary, constant size
 best run time: 100% fastest
  */

/**
 * @param {string} s
 * @return {string}
 */
let reverseVowels = function(s) {
    let arr = s.split(''), left = 0, right = arr.length - 1;
    let letters = new Set(['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']);

    while (left < right) {
        while (!letters.has(arr[left]) && left < right) left++;
        while (!letters.has(arr[right]) && left < right) right--;
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        ++left;
        --right;
    }
    return arr.join('');
};

let tests = [
    {
        params: ['hello'],
        ans: 'holle',
    },
    {
        params: ['leetcode'],
        ans: 'leotcede',
    },
    {
        params: ['aA'],
        ans: 'Aa',
    },
];

tests.forEach(test => {
    let res = reverseVowels(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
