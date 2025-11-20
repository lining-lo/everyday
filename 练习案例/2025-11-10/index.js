/**
 * 反转字符串Ⅱ
 */
// function reverseStr(str, k) {
//     // 转化字符串为数组
//     const strArr = str.split('')
//     // 获取字符串长度
//     let n = strArr.length

//     // 以步长为2k遍历
//     for (let start = 0; start < n; start += 2 * k) {
//         let end = Math.min(start + k - 1, n - 1)
//         // 定义左右指针
//         let left = start
//         let right = end
//         // 开始反转
//         while (left < right) {
//             [strArr[left], strArr[right]] = [strArr[right], strArr[left]]
//             left++
//             right--
//         }
//     }
//     return strArr.join('')
// }

// const s = "abcdefg";
// const k = 2;
// console.log(reverseStr(s, k)); // 输出: "bacdfeg"


/**
 * 替换数字
 */
// function replaceNumber(str){
//     let result = ''
//     for(const char of str){
//         if (isNaN(Number(char))) {
//             result += char
//         }else{
//              result += 'number'
//         }
//     }
//     return result
// }

// console.log(replaceNumber('a5b'));

/**
 * 翻转字符串的单词
 */
// function reverseWords(str) {
//     // 处理字符串
//     const proceeStr = str.trim().replace(/\s+/g, ' ')
//     // 变成数组
//     const resultArr = proceeStr.split('')
//     // 定义一个反转工具
//     function reverseStr(arr, left, right) {
//         while (left < right) {
//             [arr[left], arr[right]] = [arr[right], arr[left]]
//             left++
//             right--
//         }
//     }
//     // 全部反转
//     let n = resultArr.length
//     reverseStr(resultArr, 0, n - 1)

//     let start = 0
//     // 单词反转
//     for (let i = 0; i < n; i++) {
//         if (resultArr[i] === ' ' || i === n - 1) {
//             let end = resultArr[i] === ' ' ? i - 1 : i
//             reverseStr(resultArr, start,end)
//             start = i + 1
//         }
      
//     }

//     // 数组转成字符串
//     return resultArr.join('')
// }

// // 测试示例
// console.log(reverseWords("the sky is blue")); // "blue is sky the"
// console.log(reverseWords("  hello world!  ")); // "world! hello"
// console.log(reverseWords("a good  example")); // "example good a"