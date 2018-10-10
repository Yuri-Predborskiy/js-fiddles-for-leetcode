let loggingStateBoolean = false;

function compareArrays(arr1, arr2) {
    if (typeof arr1 !== typeof arr2 || typeof arr1 !== typeof [] || arr1.length !== arr2.length) return false;
    let left = arr1.slice(), right = arr2.slice(); // make a copy
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
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

module.exports = {
    compareArrays,
    ListNode,
    RandomListNode,
    compareLinkedLists,
    compareRandomLinkedLists,
    createLinkedList,
    createRandomLinkedList,
    linkedListToString,
    randomLinkedListToString,
    linkedListToStringBack,
    reducerArraySum,
    log,
    loggingStateBoolean,
};