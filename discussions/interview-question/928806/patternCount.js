/*
Question from discussion
https://leetcode.com/discuss/interview-question/928806/

Break string into pattern and blobs
Count how many times pattern appears in each blob + total
Result should be combined string of numbers with a separator

If pattern consists of the same repeating character, count how many times pattern can be found
    starting with each possible point (count overlapping patterns!)

Solution using "greedy" algorithm - go over each blob and count how many times pattern can be found
Solution contains optimization for non-overlapping patterns - if pattern contains more than one character,
    it cannot overlap with itself, thus we can safely jump over the pattern if we find it in blob
    as a second pattern cannot exist in the same place starting with next character

Beware! This optimization breaks counting for overlapping patterns (same character several times)
Example: pattern 'aa' and blob 'aaaa'.
By skipping ahead after finding first match we can only find
    2 patterns: 'aa..', '..aa'.
    If we check every possible starting position while looking for a pattern, we will find
    3 patterns: 'aa..', '.aa.' and '..aa'

Time complexity:
    O(n) best case, where n is string length and pattern has non-repeating characters (or a single character)
    O(n^2) worst case when pattern consists of repeating character
Space complexity: O(n)
 */

/**
 * @param {string} string
 * @return {string}
 */
let count = function(string) {
    function getPatternCount(word, pattern, skipAhead) {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
            let wordIndex = i, patternIndex = 0;
            while (patternIndex < pattern.length && word[wordIndex] === pattern[patternIndex]) {
                wordIndex++;
                patternIndex++;
            }
            if (patternIndex === pattern.length) {
                count++;
                if (skipAhead) i += pattern.length - 1;
            }
        }
        return count;
    }

    const [pattern, wordString] = string.split(';');
    const words = wordString.split('|');
    let skipAhead = false;
    for (let i = 1; i < pattern.length; i++) {
        if (pattern[0] !== pattern[i]) {
            skipAhead = true;
            break;
        }
    }

    const results = [];
    if (pattern.length === 0) {
        const r = words.map(() => 0);
        r.push(0);
        return r.join('|');
    }

    let total = 0;
    for (let word of words) {
        const count = getPatternCount(word, pattern, skipAhead);
        results.push(count);
        total += count;
    }
    results.push(total);
    return results.join('|');
}

let tests = [
    {params: ['bc;bcdefbcbebc|abcdebcfgsdf|cbdbesfbcy|1bcdef23423bc32'], ans: '3|2|1|2|8'},
    {params: ['aa;aaaakjlhaa|aaadsaaa|easaaad|sa'], ans: '4|4|2|0|10'},
    {params: ['b;bcdefbcbebc|abcdebcfgsdf|cbdbesfbcy|1bcdef23423bc32'], ans: '4|2|3|2|11'},
    {params: [';bcdefbcbebc|abcdebcfgsdf|cbdbesfbcy|1bcdef23423bc32'], ans: '0|0|0|0|0'},
];

tests.forEach(test => {
    let res = count(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
