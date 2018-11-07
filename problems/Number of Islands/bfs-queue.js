/**
 * @param {string[][]} grid
 * @return {number}
 */
let numIslands = function(grid) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function Queue() {
        this.head = this.tail = null;
    }
    Queue.prototype.enQueue = function(val) {
        if (this.isEmpty()) {
            this.head = this.tail = new ListNode(val);
        } else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
    };
    Queue.prototype.deQueue = function() {
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

    function processItem(row, col, queue = items) {
        if (
            row >= grid.length ||
            row < 0 ||
            col >= grid[0].length ||
            col < 0 ||
            visited[row][col]
        ) {
            return;
        }

        if (grid[row][col] === '1') {
            queue.enQueue({row, col});
        } else {
            visited[row][col] = true;
            items.enQueue({row, col});
        }
    }

    function processIsland() {
        islands++;
        do {
            let {row, col} = landQueue.deQueue();
            visited[row][col] = true;
            processNeighbours(row, col, landQueue);
        } while (!landQueue.isEmpty());
    }

    function processNeighbours(row, col, queue) {
        processItem(row - 1, col, queue);
        processItem(row + 1, col, queue);
        processItem(row, col - 1, queue);
        processItem(row, col + 1, queue);
    }

    let items = new Queue(), landQueue = new Queue(), visited = [], islands = 0;
    for (let i = 0; i < grid.length; i++) {
        visited[i] = [];
    }

    processItem(0, 0);
    while (!items.isEmpty()) {
        let {row, col} = items.deQueue();
        if (grid[row][col] === '1' && !visited[row][col]) {
            landQueue.enQueue({row, col});
            processIsland();
        } else {
            visited[row][col] = true;
            processNeighbours(row, col)
        }
    }

    return islands;
};

/*
    todo: fix memory limit exceeded.
    probably bfs / queue with large enough island causes memory limit problem
 */

let tests = [
    {
        params: [
            [
                ['1','0','0','1','1','1','0','1','1','0','0','0','0','0','0','0','0','0','0','0'],
                ['1','0','0','1','1','0','0','1','0','0','0','1','0','1','0','1','0','0','1','0'],
                ['0','0','0','1','1','1','1','0','1','0','1','1','0','0','0','0','1','0','1','0'],
                ['0','0','0','1','1','0','0','1','0','0','0','1','1','1','0','0','1','0','0','1'],
                ['0','0','0','0','0','0','0','1','1','1','0','0','0','0','0','0','0','0','0','0'],
                ['1','0','0','0','0','1','0','1','0','1','1','0','0','0','0','0','0','1','0','1'],
                ['0','0','0','1','0','0','0','1','0','1','0','1','0','1','0','1','0','1','0','1'],
                ['0','0','0','1','0','1','0','0','1','1','0','1','0','1','1','0','1','1','1','0'],
                ['0','0','0','0','1','0','0','1','1','0','0','0','0','1','0','0','0','1','0','1'],
                ['0','0','1','0','0','1','0','0','0','0','0','1','0','0','1','0','0','0','1','0'],
                ['1','0','0','1','0','0','0','0','0','0','0','1','0','0','1','0','1','0','1','0'],
                ['0','1','0','0','0','1','0','1','0','1','1','0','1','1','1','0','1','1','0','0'],
                ['1','1','0','1','0','0','0','0','1','0','0','0','0','0','0','1','0','0','0','1'],
                ['0','1','0','0','1','1','1','0','0','0','1','1','1','1','1','0','1','0','0','0'],
                ['0','0','1','1','1','0','0','0','1','1','0','0','0','1','0','1','0','0','0','0'],
                ['1','0','0','1','0','1','0','0','0','0','1','0','0','0','1','0','1','0','1','1'],
                ['1','0','1','0','0','0','0','0','0','1','0','0','0','1','0','1','0','0','0','0'],
                ['0','1','1','0','0','0','1','1','1','0','1','0','1','0','1','1','1','1','0','0'],
                ['0','1','0','0','0','0','1','1','0','0','1','0','1','0','0','1','0','0','1','1'],
                ['0','0','0','0','0','0','1','1','1','1','0','1','0','0','0','1','1','0','0','0']
            ],
        ],
        ans: 58
    },
    {
        params: [
            [
                ['0','1','0'],
                ['1','0','1'],
                ['0','1','0'],
            ],
        ],
        ans: 4
    },
    {
        params: [
            [
                ['1','1','1','1','0'],
                ['1','1','0','1','0'],
                ['1','1','0','0','0'],
                ['0','0','0','0','0'],
            ],
        ],
        ans: 1
    },
    {
        params: [
            [
                ['1','1','1','1','0'],
                ['1','1','0','1','0'],
                ['1','1','0','0','1'],
                ['0','0','1','1','1'],
            ],
        ],
        ans: 2
    },
    {
        params: [
            [
                ['1','1','0','0','0'],
                ['1','1','0','0','0'],
                ['0','0','1','0','0'],
                ['0','0','0','1','1'],
            ],
        ],
        ans: 3 // 3 separate groups of 1s that have 0 around them (up left right bottom)
    },
];

tests.forEach(test => {
    let res = numIslands(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
