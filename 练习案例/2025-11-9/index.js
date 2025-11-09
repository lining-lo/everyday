/**
 * 赎金信
 */
// function canConstruct(ransomNote, magazine) {
//     // 记录具体内容
//     const recodeList = new Array(26).fill(0)
//     for (const char of magazine) {
//         let index = char.charCodeAt(0) - 'a'.charCodeAt(0)
//         recodeList[index]++
//     }

//     // 杂志中取文字看看是否能组成信息
//     for (const char of ransomNote) {
//         let index = char.charCodeAt(0) - 'a'.charCodeAt(0)
//         if (recodeList[index] === 0) {
//             return false
//         }
//         recodeList[index]--
//     }

//     return true
// }


/**
 * 函数柯里化
 */
// function kelihua(fn) {
//     return function kelihuaed(...args) {
//         if (args.length >= fn.length) {
//             return fn.apply(this, args)
//         } else {
//             return function (...nextArgs) {
//                return kelihuaed.apply(this,args.concat(nextArgs))
//             }
//         }
//     }
// }

// function getSume(a, b, c) {
//     return a + b + c
// }

// const myKelihuaAddSum = kelihua(getSume)
// console.log(myKelihuaAddSum(1,2,3));
// console.log(myKelihuaAddSum(1)(2)(3));

/**
 * 三数之和
 */
// function threeSum(arr) {
//     // 从小到大排序
//     arr.sort((a, b) => a - b)
//     // 结果数组
//     const result = []
//     // 数组长度
//     let n = arr.length

//     // 遍历
//     for (let i = 0; i < n; i++) {
//         // 如果i结果大于0，直接结束
//         if (arr[i] > 0) {
//             break
//         }
//         // 如果本次值与上次值相同 跳过本次
//         if (i < n && arr[i] === arr[i - 1]) {
//             continue
//         }

//         // 初始化左右指针 左指针i+1 右指针数组长度-1
//         let left = i + 1
//         let right = n - 1

//         while (left < right) {
//             // 计算和
//             let sum = arr[i] + arr[left] + arr[right]

//             // 如果和等于0 放到结果数组 
//             if (sum === 0) {
//                 result.push([arr[i], arr[left], arr[right]])
//                 // 判断左指针结果与下一个是否相等
//                 while (left < right && arr[left] === arr[left + 1]) {
//                     left++
//                 }
//                 // 判断右指针结果与下一个是否相等
//                 while (left < right && arr[right] === arr[right - 1]) {
//                     right--
//                 }
//                 // 移动左右指针
//                 left++
//                 right--
//             } else if (sum < 0) {
//                 left++
//             } else {
//                 right--
//             }
//         }
//     }

//     return result
// }

// // 示例测试
// const nums = [-1, 0, 1, 2, -1, -4];
// console.log(threeSum(nums));
// // 输出: [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]


/**
 * 四数字和
 */
// function fourSum(arr, target) {
//     // 数组从小到大排序
//     arr.sort((a, b) => a - b)
//     // 定义存储结果数据
//     const result = []
//     // 定义数组长度
//     let n = arr.length

//     // 第一层循环确定第一位
//     for (let i = 0; i < n - 3; i++) {
//         // 与上一次结果相同时跳出本次循环
//         if (i > 0 && arr[i] === arr[i - 1]) {
//             continue
//         }
//         // 第二次循环确定第二位
//         for (let j = i + 1; j < n - 2; j++) {
//             // 与上一次结果相同时跳出本次循环
//             if (j > i + 1 && arr[j] === arr[j - 1]) {
//                 continue
//             }
//             // 定义左右指针
//             let left = j + 1
//             let right = n - 1
//             // 循环确定接下来两位
//             while (left < right) {
//                 // 获取四位和
//                 let sum = arr[i] + arr[j] + arr[left] + arr[right]
//                 // 如果相等，取出结果，并且判断下一个是否相等
//                 if (sum === target) {
//                     result.push([arr[i], arr[j], arr[left], arr[right]])
//                     while (left < right && arr[left] === arr[left + 1]) {
//                         left++
//                     }
//                     while (left < right && arr[right] === arr[right - 1]) {
//                         right--
//                     }
//                     left++
//                     right--
//                 } else if (sum < target) {
//                     left++
//                 } else {
//                     right--
//                 }
//             }
//         }

//     }
//     return result
// }
// // 示例测试
// const nums = [1, 0, -1, 0, -2, 2];
// const target = 0;
// console.log(fourSum(nums, target));
// // 输出: [ [ -2, -1, 1, 2 ], [ -2, 0, 0, 2 ], [ -1, 0, 0, 1 ] ]

/**
 * 反转字符串
 */
// function reverseString(strArr) {
//     let n = strArr.length
//     let left = 0
//     let right = n - 1
//     while (left < right) {
//         [strArr[left], strArr[right]] = [strArr[right], strArr[left]]
//         left++
//         right--
//     }
//     return strArr
// }

// const s = ["h", "e", "l", "l", "o"];
// console.log(reverseString(s)); // 输出: ["o", "l", "l", "e", "h"]