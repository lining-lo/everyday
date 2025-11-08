/**
 * 链表相交
 */
// function ListNode(val,next){
//     this.val = (val === undefined ? 0 : val)
//     this.next = (next === undefined ? null : next)
// }

// function xiangjiao(headA,headB){
//     // 定义两个指针
//     let curA = headA
//     let curB = headB

//     // 计算两个链表长度
//     let lengthA = 0
//     let lengthB = 0
//     while (curA !== null) {
//         curA = curA.next
//         lengthA++
//     }
//     while (curB !== null) {
//         curB = curB.next
//         lengthB++
//     }
//      curA = headA
//      curB = headB

//     // 链表排序
//     if (lengthA < lengthB) {
//         [lengthA,lengthB] = [lengthB,lengthA]
//         [curA,curB] = [curB,curA]
//     }
//     let diff = lengthA - lengthB
//     while (diff--) {
//         curA = curA.next
//     }

//     // 逐个对比
//     while (curA !== null && curB !==null) {
//         if (curA === curB) {
//             return curA
//         }
//         curA = curA.next
//         curB = curB.next
//     }

//     return null
// }


/**
 * 环形链表
 */
// function ListNode(val,next){
//     this.val = (val === undefined ? 0 : val)
//     this.next = (next === undefined ? null : next)
// }

// function cricleList(head){
//     // 定义快慢指针
//     let slow = head
//     let fast = head

//     // 判断是否为环（快的走2，慢的走1，看是否相遇）
//     let isCricle = false
//     while (fast.next !== null && fast.next.next !== null) {
//         fast = fast.next.next
//         slow = slow.next
//         if (fast === slow) {
//             isCricle = true
//             break
//         }
//     }

//     // 不是环返回null
//     if (!isCricle) {
//         return null
//     }

//     // 是环判断环的初始点（定义一个初始指针，它和慢指针继续走，他们相遇的点就是）
//     let cur = head
//     while (cur !== null) {
//         if (cur === slow) {
//             break
//         }
//         cur = cur.next
//         slow = slow.next
//     }

//     return cur
// }

/**
 * 有效的字母异位词
 */
// 排序对比
// function isXiangsi(str1,str2){
//     if (str1.length !== str2.length) {
//         return false
//     }
//     processStr1 = str1.split('').sort().join('')
//     processStr2 = str2.split('').sort().join('')
//     if (processStr1 === processStr2) {
//         return true
//     }else{
//         return false
//     }
// }

//用哈希表计数
// function isYiWei(str1,str2){
//     if (str1.length !== str2.length) {
//         return false
//     }

//     // 构造一个26位数组（用0填充）
//     const countArr = new Array(26).fill(0)
//     // 遍历str1,每个字符对于下标加1
//     for (let i = 0; i < str1.length; i++) {
//         let index = str1.charCodeAt(i) - 'a'.charCodeAt(0)
//         countArr[index]++
//     }
//     // 遍历str2，每个字符对于下标减1，如果出现负数则证明不是
//     for (let i = 0; i < str2.length; i++) {
//         let index = str2.charCodeAt(i) - 'a'.charCodeAt(0)
//         countArr[index]--
//         if (countArr[index]<0) {
//             return false
//         }
//     }

//     return true
// }

/**
 * 两个数组的交集
 */
// set + filter
// function getSame(arr1,arr2){
//     // arr1用set去重
//     let setRestult = new Set(arr1)
//     // arr2用filter遍历，用has判断
//     let sameArr = arr2.filter(item => setRestult.has(item))
//     // 再次去重返回
//     return [...new Set(sameArr)]
// }

// console.log(getSame([1,2,2,1],[2,2]));

// 排序+双指针
// function getSame(arr1,arr2){
//     // 给两个数组从小到大排序
//     arr1.sort((a,b) => a-b)
//     arr2.sort((a,b) => a-b)
//     // 定义一个数组存结果
//     const result = []
//     // 定义两个指针
//     let i = 0
//     let j = 0
//     // 根据两个数组长度遍历
//     while(i < arr1.length && j < arr2.length){
//         // 如果相等-> 判断最结果数组后一个是否与这个大小相等
//         if (arr1[i] === arr2[j]) {
//             if (result.length === 0 || result[result.length-1] !== arr1[i]) {
//                 result.push(arr1[i])
//             }
//             i++
//             j++
//         }else if(arr1[i] < arr2[j]){
//             // 如果小于i++
//             i++
//         }else{
//             // 如果大于j++
//             j++
//         }
//     }
//     return result
// }

// console.log(getSame([1,2,2,1],[2,2]));

/**
 * 快乐数
 */
// 双指针
// function getHappyNum(n) {
//     function getNext(n) {
//         let sum = 0
//         while (n > 0) {
//             // 获取最后一位
//             let last = n % 10
//             sum += last * last
//             // 删除最后一位
//             n = Math.floor(n / 10)
//         }
//         return sum
//     }

//     // 定义快慢指针
//     let fast = getNext(getNext(n))
//     let slow = getNext(n)
//     // 循环判断（快指针结果是否为1，快慢指针结果是否相等）
//     while(fast !== 1 && fast !== slow){
//         // 快指针走2步
//         fast = getNext(getNext(fast))
//         // 慢指针走1步
//         slow = getNext(slow)
//     }
//     return fast === 1
// }

// console.log(getHappyNum(19));

// 哈希法
// function getHappyNum(n) {
//     // 获取下一次结果的方法
//     function getNext(n) {
//         let sum = 0
//         while (n > 0) {
//             let last = n % 10
//             sum += last * last
//             n = Math.floor(n / 10)
//         }
//         return sum
//     }
//     // 定义一个set存每次的结果
//     let set = new Set()

//     let result = getNext(n)
//     // 循环判断
//     while(true){
//         // 如果结果等于1，退出返回true
//         if (result === 1) {
//             return true
//         }
//         // 如果结果在set重复出现，退出返回false
//         if (set.has(result)) {
//             return false
//         }
//         set.add(result)
//         result = getNext(result)
//     }
//     return result === 1
// }
// console.log(getHappyNum(19));

/**
 * 两数之和
 */
// function twoSum(arr,target){
//     // 创建一个Map存已经尝试过的数
//     let map = new Map()

//     // 遍历数组
//     for (let i = 0; i < arr.length; i++) {
//         let current = arr[i]
//         // 计算另一个数
//         let jisuan = target - current
//         // 如果这个数在map中，直接返回两个索引
//         if (map.has(jisuan)) {
//             return [map.get(jisuan),i]
//         }
//         // 如果不在存入map
//         map.set(current,i)
//     }
//     return []
// }
// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target));

/**
 * 手写reduce
 */
// Array.prototype.myReduce = function (callback, initValue) {
//     if (typeof callback !== 'function') {
//         throw new TypeError('第一个参数必须为函数')
//     }

//     let arr = this
//     if (arr.length === 0 && initValue === undefined) {
//         throw new TypeError('数组和第二个参数不能同时为空')
//     }

//     let acc = (initValue === undefined ? arr[0] : initValue)
//     let initIndex = (initValue === undefined ? 1 : 0)

//     for (let i = initIndex; i < arr.length; i++) {
//         acc = callback(acc, arr[i], i, arr)
//     }
//     return acc
// }

/**
 * 四数相加
 */
// function addFourSum(arrA, arrB, arrC, arrD) {
//     const mapSumAB = new Map()
//     let count = 0

//     for (const a of arrA) {
//         for (const b of arrB) {
//             let sum = a + b
//             mapSumAB.set(sum, (mapSumAB.get(sum) || 0) + 1)
//         }
//     }

//     for (const c of arrC) {
//         for (const d of arrD) {
//             let sum = -(c + d)
//             if (mapSumAB.has(sum)) {
//                 count += mapSumAB.get(sum)
//             }
//         }
//     }

//     return count
// }