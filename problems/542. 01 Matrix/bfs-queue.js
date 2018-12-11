const {compareArrays} = require('../helper');

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
let updateMatrix = function(matrix) {
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

    function itemExists(row, col) {
        return (
            row < matrix.length &&
            row >= 0 &&
            col < matrix[0].length &&
            col >= 0
        );
    }

    let cycle = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    let visited = {}, rowLen = matrix[0].length, queue = new Queue();
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] !== 0) continue; // skip non-0 values
            visited[row * rowLen + col] = true; // marking 0 as visited
            for (let i = 0; i < 4; i++) {
                let r = row + cycle[i][0], c = col + cycle[i][1];
                if (itemExists(r, c) && !visited[r * rowLen + c] && matrix[r][c] !== 0) {
                    queue.enqueue([r, c]);
                }
            }
        }
    }

    while (!queue.isEmpty()) {
        let [row, col] = queue.dequeue(), min = 10001;
        visited[row * rowLen + col] = true; // marking 0 as visited
        for (let i = 0; i < 4; i++) {
            let r = row + cycle[i][0], c = col + cycle[i][1];
            if (itemExists(r, c)) {
                if (!visited[r * rowLen + c]) {
                    queue.enqueue([r, c]);
                } else {
                    min = Math.min(matrix[r][c], min);
                }
            }
        }
        matrix[row][col] = min + 1;
    }

    return matrix;
};

let tests = [
    {
        params: [
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ]
        ],
        ans: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ],
    },
    {
        params: [
            [
                [0, 0, 0],
                [0, 1, 0],
                [1, 1, 1],
            ]
        ],
        ans: [
            [0, 0, 0],
            [0, 1, 0],
            [1, 2, 1],
        ],
    },
    {
        params: [
            [
                [0, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ]
        ],
        ans: [
            [0, 1, 2],
            [1, 2, 3],
            [2, 3, 4],
        ],
    },
    {
        params: [
            [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 1],
            ]
        ],
        ans: [
            [2, 1, 2],
            [1, 0, 1],
            [2, 1, 2],
        ],
    },
    {
        params: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [1, 1, 1],
            ]
        ],
        ans: [
            [0, 1, 0],
            [1, 2, 1],
            [2, 3, 2],
        ],
    },
];

tests.forEach(test => {
    let res = updateMatrix(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
