function ListNodeWithChild(val) {
    this.val = val;
    this.next = this.prev = this.child = null;
}

function DoublyLinkedListWithChild() {
    this.head = this.tail = null;
}

DoublyLinkedListWithChild.prototype.addAtTail = function(val) {
    const node = new ListNodeWithChild(val);
    if (!this.head) {
        this.head = this.tail = node;
    } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
}

DoublyLinkedListWithChild.prototype.addAtHead = function(val) {
    const node = new ListNodeWithChild(val);
    if (!this.head) {
        this.head = this.tail = node;
    } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
}

DoublyLinkedListWithChild.prototype.getAtHead = function() {
    return this.head;
}

DoublyLinkedListWithChild.prototype.getAtTail = function() {
    return this.tail;
}

module.exports = DoublyLinkedListWithChild;
