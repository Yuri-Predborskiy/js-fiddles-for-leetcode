/*
Build all possible sentences based on provided word block and word dictionary
Chop string into individual words if a piece of string matches word in the dictionary

Solution using trie and backtracking
Trie is used to keep track of word parts we've seen
Backtracking is used to keep track of letters we've processed

Optimization: create a list of characters in dictionary words
If string contains any letters that are not in the list, exit

Time complexity: O(2^n)
Space complexity: O(2^n)
 */

const {
    compareArrays,
} = require('../helper');

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
let wordBreak = function(s, wordDict) {
    const prefixTree = {};
    const letters = {};
    for (let word of wordDict) {
        let pointer = prefixTree;
        for (let letter of word) {
            pointer[letter] = pointer[letter] || {};
            pointer = pointer[letter];
            letters[letter] = true;
        }
        pointer.word = word;
    }
    for (let char of s) {
        if (!letters[char]) {
            return [];
        }
    }

    return checkStringForWords(s, prefixTree, 0, prefixTree, [], []);
};

function checkStringForWords(string, prefixTree, start, trie, foundWords, results) {
    if (start === string.length) {
        return results.push(foundWords.join(' '));
    }
    for (let i = start; i < string.length; i++) {
        if (trie[string[i]]) {
            trie = trie[string[i]];
            if (trie.word) {
                foundWords.push(trie.word);
                checkStringForWords(string, prefixTree, i + 1, prefixTree, foundWords, results);
                foundWords.pop();
            }
        } else {
            break;
        }
    }
    return results;
}

let tests = [
    {
        params: ['catsanddog', ["cat", "cats", "and", "sand", "dog"]],
        ans: [
            "cats and dog",
            "cat sand dog"
        ]
    },
    {
        params: ['pineapplepenapple', ["apple", "pen", "applepen", "pine", "pineapple"]],
        ans: [
            "pine apple pen apple",
            "pineapple pen apple",
            "pine applepen apple"
        ]
    },
    {
        params: ['catsandog', ["cats", "dog", "sand", "and", "cat"]],
        ans: []
    },
    {
        params: [
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
        ],
        ans: []
    },
];

tests.forEach(test => {
    let res = wordBreak(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
