/**
 * 开发商买地暴力破解
 */
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // 收集输入的所有内容
// const readlineContent = []

// // 区块数组
// const grid = []

// // 价值和
// let sum = 0

// // 最小差距
// let mindiff = Infinity


// rl.on('line', (line) => {
//     const processLine = line.trim();
//     if (!processLine) return;
//     readlineContent.push(processLine)
// });

// rl.on('close', () => {
//     // 处理第一行  几行几列
//     const [n, m] = readlineContent[0].split(' ').map(Number)

//     // 其余输入行改造成一个二位数组
//     for (let i = 1; i < readlineContent.length; i++) {
//         grid.push(readlineContent[i].split(' ').map(Number))
//     }

//     // 价值和计算
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < m; j++) {
//             sum += grid[i][j]
//         }
//     }

//     // 按行分
//     // 按行分的和
//     let rowSum = 0
//     for (let i = 0; i < n - 1; i++) {
//         for (let j = 0; j < m; j++) {
//             rowSum += grid[i][j]
//         }
//         // 计算价值差
//         let diff = Math.abs(2 * rowSum - sum)
//         if (mindiff > diff) {
//             mindiff = diff
//         }
//     }

//     // 按列分
//     // 按行分的和
//     let colSum = 0
//     for (let i = 0; i < m - 1; i++) {
//         for (let j = 0; j < n; j++) {
//             colSum += grid[j][i]
//         }
//         // 计算价值差
//         let diff = Math.abs(2 * colSum - sum)
//         if (mindiff > diff) {
//             mindiff = diff
//         }
//     }

//     console.log('输入完毕',mindiff);
// });


/**
 * 开发商买地前缀和
 */
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // 输入的数组
// const readLineContent = []
// // 区块数组
// const grid = []
// // 最小差
// let minDiff = Infinity


// rl.on('line', (line) => {
//     const processLine = line.trim()
//     if (!processLine) return
//     readLineContent.push(processLine.split(' ').map(Number))
// })

// rl.on('close', () => {
//     // 第一行输入
//     const [n, m] = readLineContent[0]

//     // 其他行输入构造一个区块数组
//     for (let i = 1; i < readLineContent.length; i++) {
//         grid.push(readLineContent[i])
//     }

//     // 计数行的前缀和
//     const rowPrefix = new Array(n + 1).fill(0)
//     for (let i = 0; i < n; i++) {
//         let rowSum = 0
//         for (let j = 0; j < m; j++) {
//             rowSum += grid[i][j]
//         }
//         rowPrefix[i + 1] = rowPrefix[i] + rowSum
//     }


//     // 计数列的前缀和
//     const colPrefix = new Array(m + 1).fill(0)
//     for (let i = 0; i < m; i++) {
//         let colSum = 0
//         for (let j = 0; j < n; j++) {
//             colSum += grid[j][i]
//         }
//         colPrefix[i + 1] = colPrefix[i] + colSum
//     }

//     // 总价值的和
//     let sum = colPrefix[m]

//     // 按行分
//     for (let i = 0; i < n - 1; i++) {
//         let diff = Math.abs(2 * rowPrefix[i + 1] - sum)
//         if (minDiff > diff) {
//             minDiff = diff
//         }
//     }

//     // 按列分
//     for (let i = 0; i < m - 1; i++) {
//         let diff = Math.abs(2 * colPrefix[i + 1] - sum)
//         if (minDiff > diff) {
//             minDiff = diff
//         }
//     }

//     console.log('输入结束',minDiff);
// })


/**
 * 深拷贝
 */
// function deepClone(obj){
//     // 简单类型直接返回
//     if (typeof obj !== 'object' || obj !== null) {
//         return obj
//     }

//     // 初始化
//     let clone = Array.isArray(obj) ? [] : {}

//     // 递归深拷贝
//     for(let key in obj){
//         if (obj.hasOwnProperty(key)) {
//             clone[key] = deepClone(obj[key])
//         }
//     }
//     return clone
// }

/**
 * 实现call
 */
Function.prototype.myCall = function(objThis,...args){
    // 处理特殊情况
    if (objThis == null) {
        objThis = globalThis
    }else{
        objThis = Object(objThis)
    }

    // 唯一属性保存this
    const tempKey = Symbol('tempKey')
    objThis[tempKey] = this

    // 传参执行
    const result = objThis[tempKey](...args)

    // 删除属性避免污染
    delete objThis[tempKey]

    // 返回
    return result
}