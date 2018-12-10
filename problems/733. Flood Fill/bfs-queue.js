const {compareArrays} = require('../helper');

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
let floodFill = function(image, sr, sc, newColor) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function Queue() {
        this.head = this.tail = null;
    }
    Queue.prototype.enqueue = function(val) {
        if (this.isEmpty()) {
            this.head = this.tail = new ListNode(val);
        } else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
    };
    Queue.prototype.dequeue = function() {
        if (this.isEmpty()) {
            return null;
        }
        let val = this.head.val;
        this.head = this.head.next;
        return val;
    };
    Queue.prototype.isEmpty = function() {
        return this.head === null;
    };

    function isSameColor(row, col) {
        return (
            row < image.length &&
            row >= 0 &&
            col < image[0].length &&
            col >= 0 &&
            !visited[row*rowLen + col] &&
            image[row][col] === originalColor
        );
    }

    let originalColor = image[sr][sc], visited = {}, rowLen = image[0].length, pixels = new Queue();
    pixels.enqueue([sr, sc]);
    while (!pixels.isEmpty()) {
        let [row, col] = pixels.dequeue();
        image[row][col] = newColor;
        visited[row * rowLen + col] = true;
        if (isSameColor(row, col - 1)) { // left
            pixels.enqueue([row, col - 1]);
        }
        if (isSameColor(row - 1, col)) { // up
            pixels.enqueue([row - 1, col]);
        }
        if (isSameColor(row, col + 1)) { // right
            pixels.enqueue([row, col + 1]);
        }
        if (isSameColor(row + 1, col)) { // down
            pixels.enqueue([row + 1, col]);
        }
    }

    return image;
};

let tests = [
    {
        params: [
            [
                [1,1,1],
                [1,1,0],
                [1,0,1],
            ],
            1,
            1,
            2,
        ],
        ans: [
            [2,2,2],
            [2,2,0],
            [2,0,1]
        ],
    },
];

tests.forEach(test => {
    let res = floodFill(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
