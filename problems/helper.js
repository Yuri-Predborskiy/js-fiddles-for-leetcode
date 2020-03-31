let loggingStateBoolean = false;

// compare arrays where order is important
function compareArraysStrict(left, right) {
    if (typeof left !== typeof right || !Array.isArray(left) || left.length !== right.length) {
        return false;
    }

    for (let i = 0; i < left.length; i++) {
        if (typeof left[i] !== typeof right[i] || left[i] !== right[i]) {
            return false;
        }
    }
    return true;
}

// compare arrays where order does not matter
function compareArrays(arr1, arr2) {
    if (typeof arr1 !== typeof arr2 || !Array.isArray(arr1) || arr1.length !== arr2.length) {
        return false;
    }
    let left = arr1.slice(), right = arr2.slice(); // make a copy
    if (typeof left[0] !== 'number') {
        left.sort();
        right.sort();
    } else {
        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);
    }
    for (let i = 0; i < left.length; i++) {
        if (typeof left[i] !== typeof right[i]) return false;
        if (Array.isArray(left[i])) {
            if (!compareArrays(left[i], right[i])) return false;
        } else {
            if (left[i] !== right[i]) return false;
        }
    }
    return true;
}

// compare arrays without sorting, for number arrays
function compareNumberArrays(arr1, arr2) {
    if (typeof arr1 !== typeof arr2 || !Array.isArray(arr1) || arr1.length !== arr2.length) return false;
    let left = arr1.slice(), right = arr2.slice(); // make a copy
    if (typeof left[0] !== 'number') {
        return false; // cannot be used to compare anything other than numbers
    }
    for (let i = 0; i < left.length; i++) {
        if (typeof left[i] !== typeof right[i]) return false;
        if (Array.isArray(left[i])) {
            if (!compareNumberArrays(left[i], right[i])) return false;
        } else {
            if (left[i] !== right[i]) return false;
        }
    }
    return true;
}

function compareLinkedLists(list1, list2) {
    let val1 = linkedListToString(list1);
    let val2 = linkedListToString(list2);
    return val1 === val2;
}

function compareRandomLinkedLists(list1, list2) {
    let val1 = randomLinkedListToString(list1);
    let val2 = randomLinkedListToString(list2);
    return val1 === val2;
}

// may not work correctly in some cases, in these cases create tree by hand, example in 144, easy-to-read version
function convertArrayToBinaryTree(array) {
    function addBranch(root, branch) {
        if (index >= array.length) return;
        stack.push({root, branch});
    }

    if (!array.length) return null;

    let tree = new TreeNode(array[0]), index = 0, stack = [];
    // for stack (LIFO) and binary tree, right branch should be added first
    addBranch(tree, 'right');
    addBranch(tree, 'left');

    while (stack.length && ++index < array.length) {
        let {root, branch} = stack.pop();
        if (array[index] === null) continue;
        root[branch] = new TreeNode(array[index]);
        addBranch(root[branch], 'right');
        addBranch(root[branch], 'left');
    }
    return tree;
}

function compareBinaryTrees(tree1, tree2) {
    let val1 = convertBinaryTreeToString(tree1);
    let val2 = convertBinaryTreeToString(tree2);
    return val1 === val2;
}

function linkedListToString(list, separator = '') {
    let val = '';
    while (list) {
        val += list.val + separator;
        list = list.next;
    }
    return val.substring(0, val.length - separator.length);
}

function randomLinkedListToString(list, separator = '') {
    let label = '';
    while (list) {
        label += list.label + separator;
        list = list.next;
    }
    return label.substring(0, label.length - separator.length);
}

function convertBinaryTreeToString(root) {
    if (!root) return '#';
    return root.val + '(' + convertBinaryTreeToString(root.left) + '|' + convertBinaryTreeToString(root.right) + ')';
}

function linkedListToStringBack(list, separator = '') {
    let val = '';
    while (list) {
        val = list.val + separator + val;
        list = list.prev;
    }
    return val.substring(0, val.length - separator.length);
}

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function RandomListNode(label) {
    this.label = label;
    this.next = this.random = null;
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function TreeNodeWithNext(val) {
    this.val = val;
    this.left = this.right = this.next = null;
}

function createLinkedList(values) {
    let head = new ListNode(values[0]), next = head;
    for (let i = 1; i < values.length; i++) {
        next.next = new ListNode(values[i]);
        next = next.next;
    }
    return head;
}

function createRandomLinkedList(values) {
    let head = new RandomListNode(values[0]), next = head;
    for (let i = 1; i < values.length; i++) {
        next.next = new RandomListNode(values[i]);
        next = next.next;
    }
    return head;
}

function reducerArraySum(accumulator, currentValue) {
    return accumulator + currentValue;
}

function log(loggingEnabledBoolean = false, first, ...rest) {
    if (loggingEnabledBoolean) {
        console.log(first, rest);
    }
}

function UndirectedGraphNode(label) {
    this.label = label;
    this.neighbors = [];   // Array of UndirectedGraphNode
}

function serializeTreeWithRightLink(root) {
    function serialize(node) {
        if (visited.has(node)) {
            return;
        }
        while (node) {
            output.push(node.val);
            visited.add(node);
            node = node.next;
        }
        output.push('#');
    }

    const output = [];
    const visited = new Set();
    const stack = [root];
    if (!root) {
        return output;
    }

    while (stack.length) {
        const node = stack.pop();
        serialize(node);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return output;
}

module.exports = {
    compareArraysStrict,
    compareArrays,
    compareNumberArrays,
    ListNode,
    RandomListNode,
    TreeNode,
    TreeNodeWithNext,
    compareLinkedLists,
    compareRandomLinkedLists,
    convertArrayToBinaryTree,
    compareBinaryTrees,
    convertBinaryTreeToString,
    createLinkedList,
    createRandomLinkedList,
    linkedListToString,
    randomLinkedListToString,
    linkedListToStringBack,
    reducerArraySum,
    log,
    loggingStateBoolean,
    UndirectedGraphNode,
    serializeTreeWithRightLink,
};