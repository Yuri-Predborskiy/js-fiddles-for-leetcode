/*
Determine if a string is a valid palindrome
Compare only alphanumerical characters and ignore the rest

Solution using two pointers and a full dictionary of allowed characters
If symbol on the left is not one of the allowed characters, move left pointer
Same with right pointer
Move pointers till either they overlap (palindrome) or we have two individual allowed characters
If we have two individual characters, compare them to each other, if they're not the same, return false
If pointers overlap - return true

Optimization: instead of executing "toLowerCase" on input, we simply create a fixed dictionary where
    uppercase letters are matched to lowercase letters, so that we compare lowercase to lowercase.
    Doing toLowerCase would require an extra pass over the string.
    While time complexity wouldn't change, it would increase execution time
    For small cases or extremely limited memory using toLowerCase may be preferred
    If memory is not an issue and inputs can be large, a fixed dictionary will save time

Time complexity: O(n), we scan the entire string from both ends simultaneously
Space complexity: O(1) because we used a fixed-size pre-defined dictionary of allowed lowercase characters
 */

/**
 * @param {string} s
 * @return {boolean}
 */
let isPalindrome = function(s) {
    const dict = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h', 'I': 'i', 'J': 'j',
        'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't',
        'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z',
        'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
        'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
    };
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        while (!dict[s[i]] && i < j) {
            i++;
        }
        while (!dict[s[j]] && j > i) {
            j--;
        }
        if (dict[s[i]] !== dict[s[j]]) {
            return false;
        }
    }
    return true;
};

let tests = [
    {params: ['A man, a plan, a canal: Panama'], ans: true},
    {params: ['race a car'], ans: false},
];

tests.forEach(test => {
    let res = isPalindrome(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
