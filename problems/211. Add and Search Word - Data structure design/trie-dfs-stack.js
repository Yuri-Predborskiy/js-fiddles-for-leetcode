/*
Create a custom data structure to add and search for words

Custom trie - prefix tree
When adding a word, break it into individual characters and add each character as a branch if it does not exist
When searching for a word, traverse the tree one symbol at a time
Perform search using DFS algorithm using stack
Handling "." (any letter): add all of the available letters to the stack

Time complexity:
    - add:
        O(n) average,
        O(log(n)) if tree is already in trie, where n - length of the tree
    - search:
        O(log(n)) average,
        O(n) worst case where n - number of nodes in the trie
Space complexity:
    - add:
        O(n) worst case where n - length of the word,
        O(1) best case when the word is already in the trie
    - search:
        O(log(n)) average,
        O(n) worst case to iterate over the entire trie
 */

/**
 * Initialize your data structure here.
 */
let WordDictionary = function() {
    this.data = {};
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let trie = this.data;
    for (let letter of word) {
        trie[letter] = trie[letter] || {};
        trie = trie[letter];
    }
    trie[null] = true;
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const stack = [[this.data, 0]]; // trie position, word index
    while (stack.length > 0) {
        const [trie, index] = stack.pop();
        if (index === word.length) {
            if (trie[null]) {
                return true;
            }
        }
        const letter = word[index];
        if (letter === '.') {
            for (let value of Object.values(trie)) {
                if (typeof value === 'object') {
                    stack.push([value, index + 1]);
                }
            }
        } else if (trie[letter]) {
            stack.push([trie[letter], index + 1]);
        }
    }
    return false;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
const tests = [
    {
        inputs: [
            ["WordDictionary","addWord","search","search","search","search"],
            [[],              ["bad"],  ["bad"], ["ba."], ["bad."],["b.d."]]
        ],
        outputs: [null,       null,     true,    true,    false,   false]
    },
    {
        inputs: [
            ["WordDictionary","addWord","addWord","addWord","search","search","search","search"],
            [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
        ],
        outputs: [null,null,null,null,false,true,true,true]
    },
    {
        inputs: [
            [
                "WordDictionary","addWord","addWord","addWord","addWord","search","search",
                "addWord","search","search","search","search","search","search"
            ],
            [
                [],["at"],["and"],["an"],["add"],["a"],[".at"],
                ["bat"],[".at"],["an."],["a.d."],["b."],["a.d"],["."]
            ]
        ],
        outputs: [
            null,null,null,null,null,false,false,
            null,true,true,false,false,true,false
        ]
    },
    {
        inputs: [
            [
                "WordDictionary","addWord","addWord","addWord","addWord","addWord","addWord",
                "addWord","addWord","search","search","search","search","search",
                "search","search","search","search","search"
            ],
            [
                [],["ran"],["rune"],["runner"],["runs"],["add"],["adds"],
                ["adder"],["addee"],["r.n"],["ru.n.e"],["add"],["add."],["adde."],
                [".an."],["...s"],["....e."],["......."],["..n.r"]
            ]
        ],
        outputs: [
            null,null,null,null,null,null,null,
            null,null,true,false,true,true,true,
            false,true,true,false,false
        ]
    },
];
let fails = 0;
for (let test of tests) {
    const executor = new WordDictionary(...test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        const success = typeof output !== 'undefined' ? output === test.outputs[i] : true;
        if (!success) {
            fails++;
        }
        console.log(`Test ${i}: ${success ? 'SUCCESS' : '__FAILURE__'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
    console.log(fails ? `There were ${fails} failed tests` : 'batch complete');
    console.log();
}

console.log('all done');