const {TreeNodeWithNext, compareArrays, serializeTreeWithRightLink} = require('../helper');

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
let connect = function(root) {
    if (!root) {
        return root;
    }
    let head = root;
    let tempNode = {next: null};

    while (head) {
        let node = head;
        let child = tempNode;
        while (node) {
            // perfect tree only. If there is a left child, there is a right child
            if (node.left) {
                child.next = node.left;
                node.left.next = node.right;
                child = node.right;
            }
            node = node.next;
        }
        head = tempNode.next;
        tempNode.next = null;
    }
    return root;
};

/*
Input: [1,2,3,4,5,6,7]
       1 --> null
     /  \
   /     \
  2 ---> 3 --> null
 / \    / \
4-->5->6-->7 --> null
 */
let tree = new TreeNodeWithNext(1);
tree.left = new TreeNodeWithNext(2);
tree.right = new TreeNodeWithNext(3);
tree.left.left = new TreeNodeWithNext(4);
tree.left.right = new TreeNodeWithNext(5);
tree.right.left = new TreeNodeWithNext(6);
tree.right.right = new TreeNodeWithNext(7);

let tests = [
    { params: [tree], ans: [1,'#',2,3,'#',4,5,6,7,'#']},
];

tests.forEach(test => {
    let res = serializeTreeWithRightLink(connect(...test.params));
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
