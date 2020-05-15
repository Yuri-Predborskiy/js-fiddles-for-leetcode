/*
Implement Trie (Prefix Tree)
functions:
insert - add word to trie
search - check if a full word exists in trie
startsWith - check if all letters exist in trie (and, maybe, check if there are more characters in that word)

You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings.
 */

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
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const tests = [
    {
        inputs: [
            ['insert', 'search', 'search', 'startsWith', 'insert', 'search'],
            ['apple', 'apple', 'app', 'app', 'app', 'app']
        ],
        outputs: [null, true, false, true, null, true]
    }
];

for (let test of tests) {
    const executor = new Trie();
    for (let i = 0; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](test.inputs[1][i]);
        const success = typeof output !== 'undefined' ? output === test.outputs[i] : true;
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
}
console.log('all done');
