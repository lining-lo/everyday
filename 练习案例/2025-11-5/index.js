/**
 * 移除链表元素
 */
// function link(val, next) {
//     this.val = (val === undefined ? 0 : val)
//     this.next = (next === undefined ? null : next)
// }

// function removeElement(head,val){
//     // 建立虚拟头节点
//     const dummy = new link(0)
//     // 指向头节点
//     dummy.next = head
//     // 遍历判断节点值
//     let current = dummy
//     while(current.next!== null){
//         if (current.next.val === val) {
//             current.next = current.next.next
//         }else{
//             current = current.next
//         }
//     }
//     // 返回头节点
//     return dummy.next
// }


/**
 * 设计链表
 */
// class Link {
//     constructor(val, next) {
//       this.val = (val === undefined ? 0 : val);
//       this.next = (next === undefined ? null : next);
//     }
//   }
  
//   class MyLink {
//     constructor() {
//       this.dummy = new Link(0); // 虚拟头节点
//       this.size = 0; // 链表长度
//     }
  
//     // 获取第 index 个节点的值（index 从 0 开始）
//     get(index) {
//       if (index < 0 || index >= this.size) {
//         return -1;
//       }
//       let current = this.dummy.next;
//       for (let i = 0; i < index; i++) {
//         current = current.next;
//       }
//       return current.val;
//     }
  
//     // 在头部插入节点
//     addAtHead(val) {
//       const newNode = new Link(val, this.dummy.next);
//       this.dummy.next = newNode;
//       this.size++;
//     }
  
//     // 在尾部插入节点
//     addAtTail(val) {
//       let current = this.dummy;
//       while (current.next !== null) {
//         current = current.next;
//       }
//       current.next = new Link(val);
//       this.size++;
//     }
  
//     // 在指定索引插入节点
//     addAtIndex(index, val) {
//       if (index > this.size) return;
//       if (index < 0) index = 0;
//       let current = this.dummy;
//       for (let i = 0; i < index; i++) {
//         current = current.next;
//       }
//       const newNode = new Link(val, current.next);
//       current.next = newNode;
//       this.size++;
//     }
  
//     // 删除指定索引的节点
//     deleteAtIndex(index) {
//       if (index < 0 || index >= this.size) return;
//       let current = this.dummy;
//       for (let i = 0; i < index; i++) {
//         current = current.next;
//       }
//       current.next = current.next.next;
//       this.size--;
//     }
//   }

/**
 * 实现instanceof
 */
// function myInstanceof(left,right){
//     // 过滤基本数据类型
//     if (typeof left !== 'object' || left === null) return false
//     // 获取左边的原型
//     let leftProto = Object.getPrototypeOf(left)
//     // 获取右边的原型
//     let rightProto = right.prototype
//     // 原型链查找
//     while(true){
//         if (leftProto === null) return false
//         if (leftProto === rightProto) return true
//         leftProto = Object.getPrototypeOf(leftProto)
//     }
// }

