/**
 * @param {string[]} letters
 * @param {string} target
 * @return {string}
 */
let nextGreatestLetter = function(letters, target) {
    function getNext(index) {
        return letters[index + 1] ? letters[index + 1] : letters[0];
    }

    let left = 0;
    let right = letters.length - 1;

    while (right - left > 1) {
        let mid = Math.floor((left + right) / 2);
        if (letters[mid] === target) {
            if (mid + 1 === letters.length) {
                return letters[0];
            } else if (getNext(mid) < target) {
                return getNext(mid);
            } else {
                left = mid;
            }
        } else if (letters[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }

    if (target < letters[left]) {
        return letters[left];
    } else if (target < letters[right]) {
        return letters[right];
    } else {
        return getNext(right);
    }
};

let tests = [
    { letters: ["c", "f", "j"], target: 'a', ans: 'c' },
    { letters: ["c", "f", "j"], target: 'c', ans: 'f' },
    { letters: ["c", "f", "j"], target: 'd', ans: 'f' },
    { letters: ["c", "f", "j"], target: 'g', ans: 'j' },
    { letters: ["c", "f", "j"], target: 'j', ans: 'c' },
    { letters: ["c", "f", "j"], target: 'k', ans: 'c' },
    { letters: ["e","e","e","e","e","e","n","n","n","n"], target: 'n', ans: 'e' },
];

tests.forEach(test => {
    let res = nextGreatestLetter(test.letters, test.target);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
