function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i])) {
            if (!compareArrays(arr1[i], arr2[i])) return false;
        } else {
            if (arr2[i] !== arr1[i]) return false;
        }
    }
    return true;
}

function compareLinkedLists(list1, list2) {
    let val1 = linkedListToString(list1);
    let val2 = linkedListToString(list2);
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

function createLinkedList(values) {
    let head = new ListNode(values[0]), next = head;
    for (let i = 1; i < values.length; i++) {
        next.next = new ListNode(values[i]);
        next = next.next;
    }
    return head;
}

module.exports = {
    compareArrays,
    ListNode,
    compareLinkedLists,
    createLinkedList,
    linkedListToString,
    linkedListToStringBack,
};