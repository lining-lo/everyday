/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// var removeNthFromEnd = function(head, n) {
//     let slow = head
//     let fast = head

//     for (let i = 0; i < n; i++) {
//          fast = fast.next
//     }

//     if (!fast) {
//         return head.next
//     }

//     while (fast.next) {
//         fast = fast.next
//         slow = slow.next
//     }

//     slow.next = slow.next.next

//     return head
// };


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var detectCycle = function(head) {
//     if (!head || !head.next) {
//         return null
//     }

//     let slow = head
//     let fast = head

//     while (true) {
//         if (!fast || !fast.next) {
//             return null
//         }
//         slow = slow.next
//         fast = fast.next.next

//         if(fast === slow){
//             break
//         }
//     }

//     fast = head

//     while (fast !== slow) {
//         fast = fast.next
//         slow = slow.next
//     }

//     return fast
// };

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function (nums) {
//     nums.sort((a, b) => a - b)
//     const result = []

//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] > 0) {
//             return result
//         }

//         if (i > 0 && nums[i] === nums[i - 1]) {
//             continue
//         }

//         let left = i + 1
//         let right = nums.length - 1
//         let target = -nums[i]

//         while (left < right) {
//             let sum = nums[left] + nums[right]

//             if (sum === target) {
//                 result.push([nums[i], nums[left], nums[right]])

//                 while (nums[left] === nums[left + 1]) {
//                     left++
//                 }
//                 while (nums[right] === nums[right - 1]) {
//                     right--
//                 }

//                 left++
//                 right--
//             } else if (sum < target) {
//                 left++
//             } else {
//                 right--
//             }
//         }
//     }

//     return result
// };

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b)
    let result = []
    if (nums.length < 4) {
        return result
    }

    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }

        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue
            }
            let left = j + 1
            let right = nums.length - 1
            let twoSum = target - nums[i] - nums[j]

            while (left < right) {
                let otherSum = nums[left] + nums[right]
                if (twoSum === otherSum) {
                    result.push([nums[i], nums[j], nums[left], nums[right]])
                    while (nums[left] === nums[left + 1]) {
                        left++
                    }
                    while (nums[right] === nums[right - 1]) {
                        right--
                    }
                    left++
                    right--
                } else if (twoSum < otherSum) {
                    right--
                } else {
                    left++
                }
            }
        }
    }

    return result
};