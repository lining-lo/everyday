/**
 * 反转链表
 * 1->2->3->4->5->null
 * null<-1<-2<-3<-4<-5
 */
// function ListNode(val, next) {
//     this.val = (val === undefined ? 0 : val);
//     this.next = (next === undefined ? null : next);
// }

// function reverseList(head) {
//     // pre
//     let pre = null
//     // current
//     let current = head
//     while (current !== null) {
//         // next
//         let next = current.next
//         // current指向pre
//         current.next = pre
//         // pre前进
//         pre = current
//         // current前进
//         current = next
//     }
//     return pre

// }


/**
 * 定义链表节点（修正构造函数逻辑）
 * @param {number} val 节点值
 * @param {ListNode} next 下一个节点
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val); // 用参数 val 判断默认值
    this.next = (next === undefined ? null : next); // 用参数 next 判断默认值
}

/**
 * 两两交换链表中的节点（修正笔误和返回值）
 * @param {ListNode} head 原链表头节点
 * @return {ListNode} 交换后链表的头节点
 */
// function changeNode(head) {
//     // 构建虚拟头节点 cur，简化边界处理
//     let cur = new ListNode(0);
//     cur.next = head;
//     // pre 指向待交换节点对的前一个节点（初始为 cur）
//     let pre = cur;

//     // 修正：nul → null（判断是否有两个节点可交换）
//     while (pre.next !== null && pre.next.next !== null) {
//         let node1 = pre.next;       // 第一个待交换节点（如 1、3）
//         let node2 = pre.next.next;  // 第二个待交换节点（如 2、4）

//         // 交换节点指向（逻辑正确，无需修改）
//         pre.next = node2;      // pre 指向 node2（如 cur→2）
//         node1.next = node2.next; // node1 指向 node2 的下一个节点（如 1→3）
//         node2.next = node1;      // node2 指向 node1（如 2→1）

//         // pre 移动到交换后的第一个节点（为下一次交换做准备）
//         pre = node1;
//     }

//     // 修正：返回虚拟头节点的 next（交换后的新头节点）
//     return cur.next;
// }


// // 测试示例：1->2->3->4->null
// const head = new ListNode(1, 
//     new ListNode(2, 
//         new ListNode(3, 
//             new ListNode(4)
//         )
//     )
// );
// const result = changeNode(head);

// // 打印结果（应为 2->1->4->3->null）
// let current = result;
// while (current !== null) {
//     console.log(current.val); // 输出：2 1 4 3
//     current = current.next;
// }


/**
 * 删除链表的倒数第N个节点
 */
/**
 * 定义链表节点（修正 next 默认值）
 * @param {number} val 节点值
 * @param {ListNode} next 下一个节点
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next); // 修正：next 默认值为 null
}

/**
 * 删除链表的倒数第n个节点（修正虚拟头节点连接和返回值）
 * @param {ListNode} head 原链表头节点
 * @param {number} n 倒数第n个节点
 * @return {ListNode} 删除后的链表头节点
 */

// 方法1：两次遍历
// function deleteDaoshu(head, n) {
//     // 步骤1：计算链表总长度
//     let length = 0;
//     let current = head;
//     while (current !== null) {
//         current = current.next;
//         length++;
//     }

//     // 步骤2：用虚拟头节点简化边界处理（如删除头节点）
//     const dummy = new ListNode(0);
//     dummy.next = head; // 关键：虚拟头节点指向原链表头
//     let pre = dummy;

//     // 步骤3：找到倒数第n个节点的前一个节点（需要移动 length - n 步）
//     for (let i = 0; i < length - n; i++) {
//         pre = pre.next;
//     }

//     // 步骤4：删除节点（跳过倒数第n个节点）
//     pre.next = pre.next.next;

//     // 步骤5：返回虚拟头节点的 next（新链表头）
//     return dummy.next;
// }


// // 测试示例：输入 1->2->3->4->5，n=2，预期输出 1->2->3->5
// const head = new ListNode(1, 
//     new ListNode(2, 
//         new ListNode(3, 
//             new ListNode(4, 
//                 new ListNode(5)
//             )
//         )
//     )
// );
// const result = deleteDaoshu(head, 2);

// // 打印结果
// let current = result;
// while (current !== null) {
//     console.log(current.val); // 输出：1 2 3 5
//     current = current.next;
// }

//方法2：快慢指针
/**
 * 定义链表节点（修正构造函数的默认值判断）
 * @param {number} val 节点值
 * @param {ListNode} next 下一个节点
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val); // 用参数 val 判断，而非 this.val
    this.next = (next === undefined ? null : next);
}

/**
 * 双指针法删除链表倒数第n个节点（修正语法和循环条件）
 * @param {ListNode} head 原链表头节点
 * @param {number} n 倒数第n个节点
 * @return {ListNode} 删除后的链表头节点
 */
function deleteDaoshu(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    // 修正：用 let 声明快慢指针（需要修改指向）
    let fast = dummy;
    let slow = dummy;

    // 快指针先移动 n+1 步（确保快慢指针间隔 n 个节点）
    for (let i = 0; i <= n; i++) {
        // 边界处理：若 n 大于链表长度，fast 可能为 null，提前抛出错误
        if (fast === null) {
            throw new Error("n 超出链表长度");
        }
        fast = fast.next;
    }

    // 修正：循环条件改为 fast !== null（避免 fast.next 空指针）
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // 删除倒数第n个节点
    slow.next = slow.next.next;

    return dummy.next;
}


// 测试示例1：正常情况（删除中间节点）
const head1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const result1 = deleteDaoshu(head1, 2);
let current1 = result1;
while (current1) {
    console.log(current1.val); // 输出：1 2 3 5
    current1 = current1.next;
}

// 测试示例2：删除头节点（n=5）
const head2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const result2 = deleteDaoshu(head2, 5);
let current2 = result2;
while (current2) {
    console.log(current2.val); // 输出：2 3 4 5
    current2 = current2.next;
}