/*
Return all words from the dictionary that are contained in the character graph
Each character on the graph can only be used once per word, and characters need to be neighbours

Custom solution using custom Trie class
Create a Trie from words
Check each letter on the graph to see if there is a word that starts with that letter
If there is a word that starts with that character, run DFS starting with that graph node
At each DFS point check if there is a word that matches currently accumulated characters
    If there is a word that matches chars, remove the word and check if there are any other words starting with chars
Check each neighboring letter to see if there are any words that start with current characters + next char

This algorithm can be improved by implementing a customized trie solution
    which allows moving through trie nodes (cutting out repeating operations)

Time complexity: O(n^2*m^2) worst case, n - number of characters, m - longest word in trie
For each letter (n) we perform as many trie searches as there are matching characters in trie
Could be better or worse, very approximate

Space complexity: O(n*m) where n - number of dictionary words, m - length of the longest word
Space complexity decreases if there are words that start with same letters
 */

const {
    compareArrays,
} = require('../helper');

/**
 * @param {char[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
let findWords = function(board, words) {
    function checkLetter(row, col, chars) {
        if (row < 0 || row >= rows || col < 0 || col > cols || visited[row][col]) {
            return;
        }

        let nextChar = chars + board[row][col];
        if (!trie.startsWith(nextChar)) {
            return;
        }
        visited[row][col] = true;
        dfs(row, col, nextChar);
        visited[row][col] = false;
    }

    function dfs(row, col, chars) {
        if (trie.search(chars)) {
            results.push(chars);
            trie.remove(chars);
            if (!trie.startsWith(chars)) {
                return;
            }
        }
        checkLetter(row + 1, col, chars);
        checkLetter(row - 1, col, chars);
        checkLetter(row, col + 1, chars);
        checkLetter(row, col - 1, chars);
    }

    const results = [];
    const visited = [];
    const rows = board.length, cols = board[0].length;
    const trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }
    for (let row = 0; row < rows; row++) {
        visited[row] = new Array(cols).fill(false);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (trie.startsWith(board[row][col])) {
                visited[row][col] = true;
                dfs(row, col, board[row][col]);
                visited[row][col] = false;
            }
            if (trie.size === 0) {
                return results;
            }
        }
    }
    return results;
};

const Node = function() {
    this.charMap = new Map();
};

/**
 * Initialize your data structure here.
 */
let Trie = function() {
    this.root = new Node();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let index = 0;
    let node = this.root;
    while (index < word.length) {
        if (!node.charMap.has(word[index])) {
            node.charMap.set(word[index], new Node());
        }
        node = node.charMap.get(word[index]);
        index++;
    }
    node.charMap.set(null, true);
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.root;
    let index = 0;
    while (index < word.length) {
        if (!node.charMap.has(word[index])) {
            return false;
        }
        node = node.charMap.get(word[index]);
        index++;
    }
    return node.charMap.has(null);
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    let index = 0;
    while (index < prefix.length) {
        if (!node.charMap.has(prefix[index])) {
            return false;
        }
        node = node.charMap.get(prefix[index]);
        index++;
    }
    return true;
};

/**
 * Removes word from prefix tree and removes all empty nodes in the process. Returns success flag
 * @param {string} word
 * @returns {boolean}
 */
Trie.prototype.remove = function(word) {
    let node = this.root;
    let index = 0;
    let stack = [this.root];
    while (index < word.length) {
        if (!node.charMap.has(word[index])) {
            return false;
        }
        node = node.charMap.get(word[index]);
        stack.push(node);
        index++;
    }

    if (!node.charMap.has(null)) {
        return false;
    }
    stack.pop();
    node.charMap.delete(null);
    index--;
    while (stack.length > 0) {
        node = stack.pop();
        let child = node.charMap.get(word[index]);
        if (child.charMap.size === 0) {
            node.charMap.delete(word[index]);
        } else {
            return true;
        }
        index--;
    }
}

/**
 * Returns number of nodes trie has (to check if there are any words in a trie)
 * @returns {number}
 */
Trie.prototype.size = function() {
    return this.root.charMap.size;
}

let tests = [
    {
        params: [
            [
                ['o','a','a','n'],
                ['e','t','a','e'],
                ['i','h','k','r'],
                ['i','f','l','v']
            ],
            ['oath','pea','eat','rain']
        ],
        ans: ['eat','oath']
    },
    {
        params: [
            [
                ['a','a']
            ],
            ['a']
        ],
        ans: ['a']
    },
];

tests.forEach(test => {
    let res = findWords(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
