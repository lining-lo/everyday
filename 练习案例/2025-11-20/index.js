/**
 * 波兰表达式
 */
/**
 * @param {string[]} tokens
 * @return {number}
 */
// var evalRPN = function (tokens) {
//     // 定义栈存数据
//     let stack = []

//     // 遍历字符串
//     for (let i = 0; i < tokens.length; i++) {
//         let isFuHao = isNaN(Number(tokens[i]))
//         if (isFuHao) {
//             // 如果是运算符
//             // 弹出两个数进行运算
//             let a = stack.pop()
//             let b = stack.pop()
//             // 压入栈中
//             switch (tokens[i]) {
//                 case '+':
//                     stack.push( b + a)
//                     break;
//                 case '-':
//                     stack.push( b - a)
//                     break;
//                 case '*':
//                     stack.push( b * a)
//                     break;
//                 case '/':
//                     stack.push( Math.trunc(b / a))
//                     break;
//                 default:
//                     break;
//             }
            
//         } else {
//             // 如果是数字直接压入栈中
//             stack.push(Number(tokens[i]))
//         }
//     }

//         return stack[0]
// };

/**
 * 滑动窗口最大值
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const result = []
    const queue = []

    for (let i = 0; i < nums.length; i++) {
         // 取最大
         while (i > 0 && nums[queue[queue.length -1]] < nums[i]) {
            queue.pop()
         }
         queue.push(i)
         // 排除窗口外的
         if (queue[0] <= i - k) {
            queue.shift()
         }
         // 存值
         if (i > k - 1) {
            result.push[nums[queue[0]]]
         }
    }
};

