/**
 * 数组去重
 */
// 方式1：set
// const arr = [1, 2, 2, 3, 3, 3];
// const result = [...new Set(arr)]
// console.log(result);

// 方式2：filter + indexOf
// const arr2 = [1, 2, 2, 3, 3, 3];
// const result2 = arr2.filter((item, index) => {
//     return arr2.indexOf(item) === index
// })
// console.log(result2)

// 方式3：map的has判断 ---> 唯一set添加 ---> .keys获取所有key
// const arr3 = [1, 2, 2, 3, 3, 3];
// const map = new Map()
// arr3.forEach(item => {
//     if (!map.has(item)) {
//         map.set(item,true)
//     };
// })
// console.log(Array.from(map.keys()))


/**
 * 数组扁平化
 */
// 方式1：Array.pototype.flat
// const arr = [1, [2, [3, [4]], 5]]; 
// console.log(arr.flat(Infinity));

// 方式2：递归
// const arr2 = [1, [2, [3, [4]], 5]];

// function myFlat(arr){
//     let result = []

//     for(let item of arr){
//         if (Array.isArray(item)) {
//            result = result.concat(myFlat(item))
//         }else{
//             result.push(item)
//         }
//     }

//     return result
// }

// console.log(myFlat(arr2));

// 方式3：用reduce简化递归
// const arr = [1, [2, [3, [4]], 5]]; 

// function myFlat(arr){
//   return arr.reduce((acc,current)=>{
//     return acc.concat(Array.isArray(current) ? myFlat(current) : current)

//   },[])
// }

// console.log(myFlat(arr));

// 方式4：使用扩展运算符（`...`）+ 循环
// const arr = [1, [2, [3, [4]], 5]]; 

// function myFlat(arr){

//     while(arr.some(item => Array.isArray(item))){
//       arr = [].concat(...arr)
//     }

//     return arr
// }

// console.log(myFlat(arr));


/**
 * 实现new
 */
// function myNew(contructor, ...args) {
//   const obj = {}

//   obj.__proto__ = contructor.prototype

//   const result = contructor.apply(obj, args)

//   return (typeof result === 'object' && result !== null) || typeof result === 'function' ? result : obj
// }

// // 测试
// function Person(name, age) {
//   this.name = name
//   this.age = age
//   // return { a: 1 }
// }

// Person.prototype.sayHi = function(){
//   console.log('hello i am '+ this.name);

// }

// const xiaoming = new Person('小明',13)
// console.log(xiaoming);

// const xiaohong = myNew(Person,'小红',18)
// console.log(xiaohong);

// xiaoming.sayHi()
// xiaohong.sayHi()

// console.log(xiaoming instanceof Person);
// console.log(xiaohong instanceof Person);


/**
 * 算法：螺旋矩阵
 * [
 *   [ 1, 2, 3 ], 
 *   [ 8, 9, 4 ], 
 *   [ 7, 6, 5 ] 
 * ]
 * 
 * [ 
 *   [ 01, 02, 03, 04 ], 
 *   [ 12, 13, 14, 05 ], 
 *   [ 11, 16, 15, 06 ], 
 *   [ 10, 09, 08, 07 ] 
 * ]
 */
// function luoxuan(n) {
//   const res = new Array(n).fill(0).map(() => new Array(n).fill(0)); // 初始化 n×n 矩阵
//   let loop = Math.floor(n / 2); // 循环圈数
//   let num = 1; // 填充数值，从 1 开始
//   let x = 0, y = 0; // 每圈起始行、列
//   let level = 1; // 层级（控制边界）

//   while (loop--) {
//     // 1. 上：从左到右（行固定 x，列从 y 到 n - level - 1）
//     for (let i = y; i < n - level; i++) {
//       res[x][i] = num++;
//     }

//     // 2. 右：从上到下（列固定 n - level，行从 x 到 n - level - 1）
//     for (let i = x; i < n - level; i++) {
//       res[i][n - level] = num++;
//     }

//     // 3. 下：从右到左（行固定 n - level，列从 n - level 到 y + 1）
//     for (let i = n - level; i > y; i--) {
//       res[n - level][i] = num++;
//     }

//     // 4. 左：从下到上（列固定 y，行从 n - level 到 x + 1）
//     for (let i = n - level; i > x; i--) {
//       res[i][y] = num++;
//     }

//     // 下一圈起始位置内移
//     x++;
//     y++;
//     level++;
//   }

//   // 处理奇数中心
//   if (n % 2 !== 0) {
//     const mid = Math.floor(n / 2);
//     res[mid][mid] = n * n;
//   }

//   return res;
// }

// // 测试
// console.log(luoxuan(3)); 
// // 输出：[[1,2,3],[8,9,4],[7,6,5]]（正确）
// console.log(luoxuan(4)); 
// // 输出：[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]（正确）


/**
 * 算法：区间和
 */

//方式1：暴力破解
// const readline = require('readline')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// })

// let n = null
// const arr = []
// let isReadingArr = true
// let isFirst = true

// rl.on('line', (line) => {
//   // 修正：prdLine → trimmedLine
//   const trimmedLine = line.trim()
//   if (!trimmedLine) return

//   if (isReadingArr) {
//     if (isFirst) {
//       n = Number(trimmedLine)
//       isFirst = false
//     } else {
//       arr.push(Number(trimmedLine))
//     }

//     if (arr.length === n) {
//       isReadingArr = false
//     }
//   } else {
//     let sum = 0
//     const [l, r] = trimmedLine.split(/\s+/).map(Number)

//     for (let i = l; i <= r; i++) {
//       sum += arr[i]
//     }

//     console.log(sum);
//   }
// })

//方式2：前缀和
// const readline = require('readline')
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// })

// let n
// let isReadingArr = true
// const arr = []
// const arrSum = []

// rl.on('line', (line) => {
//   const processLine = line.trim()
//   if (!processLine) return

//   if (isReadingArr) {
//     if (n === undefined) {
//       n = Number(processLine)
//     } else {
//       arr.push(Number(processLine))
//       if (arr.length === n) {
//         arrSum[0] = 0
//         for (let i = 0; i < n; i++) {
//           arrSum[i + 1] = arrSum[i] + arr[i]
//         }
//         isReadingArr = false
//       }
//     }
//   } else {
//     const [l, r] = processLine.split(/\s+/).map(Number)
//     console.log(arrSum[r + 1] - arrSum[l]);
//   }

// })


// Array.isArray([])
// Object.prototype.toString.call() 调用Object原型链上的toString方法 返回【Object Array】字符串
// console.log(Object.prototype.toString.call([]) === '[object Array]');
// instanceof 判断一个对象是否为某个实例的构造函数
console.log([] instanceof Array);







