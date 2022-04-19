/*
 * @Author: jimouspeng
 * @Date: 2022-04-19 11:51:35
 * @Description: 双向链表
 * 链表操作-核心：
 * 插入，删除，查找
 * @FilePath: \es6\src\linked-list.js
 */
class doublyLinked {
    /** 单链表 */
    constructor() {
        this.head = null; // 链表的头部
        this.tail = null; // 链表的结尾
        this.length = 0; // 链表的长度
    }
    /** 插入链表头部 */
    insertHead(node) {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            node.prev = null;
            node.next = null;
            this.length++;
        } else {
            this.insertBefore(this.head, node);
        }
    }
    /** 插入链表尾部 */
    insertTail(node) {
        if (this.tail === null) {
            this.insertHead(node);
        } else {
            this.insertAfter(this.tail, node);
        }
    }
    /** 节点前插入 */
    insertBefore(node, newNode) {
        newNode.next = node;
        newNode.prev = node.prev;
        if (node.prev === null) {
            this.head = newNode;
        } else {
            node.prev.next = newNode;
        }
        node.prev = newNode;
        this.length++;
    }
    /** 节点后插入，node的prev不需要变动 */
    insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next === null) {
            this.tail = newNode;
        } else {
            node.next.prev = newNode;
        }
        node.next = newNode;
        this.length++;
    }
    /** 删除  */
    delNode(node) {
        // 删除后根据节点的上下位置对链表的前后节点指针重置
        if (node.prev === null) {
            this.head = node.next;
        } else {
            node.prev.next = node.next;
        }
        if (node.next == null) {
            this.tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }
        this.length--;
    }
    /** 生成新的链表节点 */
    static createNode(data) {
        return {
            prev: null, // 节点的上一个数据，默认为null
            next: null, // 节点的下一个数据，默认为null
            val: data, // 节点数据
        };
    }
}

const linkedListCtx = new doublyLinked();

for (let i = 0; i < 3; i++) {
    const node = doublyLinked.createNode(i);
    linkedListCtx.insertHead(node);
}

console.log(linkedListCtx);
