## js总结

### 1.js数据类型有哪些

1.分为**基本数据类型**和**引用数据类型**两大类

2.**基本数据类型** 直接存储在**栈**内存中，分别是 **String**、**Number**、**Boolean**、**Undefined**、**Null**、**Symbol**、**BigInt**

> **Symbol** 表示唯一的、不可变的值，常用于对象的唯一属性名，例如：`const s = Symbol('id')`
>
> **Number** 用于表示超出 `Number` 最大安全范围（`±2^53 - 1`）的整数，结尾加 `n`，例如：`9007199254740993n`。

3.**引用数据类型** 值存储在**堆**内存中，栈内存中只存储**引用**（地址）

> **Object（对象）**、**Array（数组）**、**Function（函数）**、**Date（日期）**、**RegExp（正则表达式）**、**其他特殊对象（`Map`、`Set`）** 

4.关键区别在于**赋值**和**比较**

> **基本类型**：赋值时是 “**值传递**”，修改一个变量不会影响另一个；比较时是 “**值比较**”。例：`let a = 1; let b = a; b = 2; console.log(a); // 1`（a 不受影响）。
>
> **引用类型**：赋值时是 “**引用传递**”（传递地址），修改一个变量会影响所有指向同一地址的变量；比较时是 “**引用比较**”（地址是否相同）。例：`let obj1 = { x: 1 }; let obj2 = obj1; obj2.x = 2; console.log(obj1.x); // 2`（obj1 受影响）。

### 2.null和undefined区别

1.**含义与语义不同**

> **`undefined`**：表示 “未定义”，即变量**已声明但未赋值**，或对象的**属性不存在**时的默认值。是 “被动的未定义”（JS 自动生成）。
>
> ```js
> let a; // 声明未赋值，a 的值为 undefined
> const obj = {};
> console.log(obj.xxx); // 对象不存在的属性，返回 undefined
> ```
>
> **`null`**：表示 “空值”，是开发者**主动赋予的空状态**，明确表示 “此处应该为空”。是 “主动的空值”（开发者手动设置，类似占位符）。
>
> ```js
> let b = null; // 主动赋值为 null，表示 b 现在是空的
> const arr = [1, 2];
> arr = null; // 主动清空数组引用
> ```

2.**类型判断（`typeof` 结果）不同**

> `typeof undefined` 返回 `'undefined'`（符合直觉）。
>
> `typeof null` 返回 `'object'`（历史遗留 Bug，实际 `null` 是独立类型）。
>
> 判断 `null` 和`undefined` 需用严格相等 `===`。
>
> ```js
> console.log(typeof undefined); // 'undefined'
> console.log(typeof null);      // 'object'（特殊情况）
> console.log(undefined == null); // true
> console.log(undefined === null); // false
> ```

3.**与数值运算的结果不同**

> `undefined` 参与数值运算时，结果为 `NaN`（非数字）。
>
> `null` 参与数值运算时，会被隐式转换为 `0`。
>
> ```js
> console.log(undefined + 1); // NaN
> console.log(null + 1);      // 1（null 被转为 0）
> ```

4.**常见使用场景**

> **`undefined`**：变量声明后未赋值。函数参数未传递时的默认值。函数未写 `return` 时的返回值。对象不存在的属性。
>
> **`null`**：主动释放变量引用（如清空对象、数组）。表示 “无结果”（如搜索不到数据时返回 `null`）。作为初始化时的 “空占位符”（后续可能赋值）。

### 3.typeof 和 instanceof 区别

1.`typeof` 和 `instanceof` 都是 JavaScript 中用于**判断数据类型**的运算符

2.**作用原理不同**

> **`typeof`**基于**数据的原始类型**进行判断，返回一个表示数据类型的字符串。原理是检查变量的底层类型标签（type tag），对于基本类型直接返回类型名，对于引用类型（除函数外）通常返回 `'object'`。
>
> **`instanceof`**基于**原型链继承关系**进行判断，返回布尔值（`true`/`false`）。原理是检查右侧构造函数的 `prototype` 属性是否存在于左侧对象的原型链上。

3.**适用场景与返回值不同**

> **`typeof`**主要用于**基本数据类型**（除 `null` 外），对引用类型支持有限（对 `function` 返回 `'function'`，其他引用类型多返回 `'object'`），**字符串**（如 `'string'`、`'number'`）。
>
> **`instanceof`**主要用于**引用数据类型**（对象、数组等），不支持基本类型（不是对象，无原型链），**布尔值**（`true` 或 `false`）
>
> ```js
> // typeof 可以正确判断基本类型（除 null）
> console.log(typeof 'hello');    // 'string'
> console.log(typeof 123);        // 'number'
> console.log(typeof true);       // 'boolean'
> console.log(typeof undefined);  // 'undefined'
> console.log(typeof Symbol());   // 'symbol'
> console.log(typeof 123n);       // 'bigint'
> console.log(typeof null);       // 'object'（历史 Bug，特殊情况，判断 null 需用 value === null）
> 
> // typeof 对引用类型的判断能力有限
> console.log(typeof {});         // 'object'（无法区分普通对象和数组）
> console.log(typeof []);         // 'object'
> console.log(typeof function(){}); // 'function'（唯一能正确识别的引用类型）
> ```
>
> ```js
> // instanceof 无法判断基本类型（返回 false）
> console.log('hello' instanceof String);  // false
> console.log(123 instanceof Number);      // false
> 
> // instanceof 可以通过原型链区分具体引用类型
> console.log({} instanceof Object);    // true（普通对象）
> console.log([] instanceof Array);     // true（数组）
> console.log([] instanceof Object);    // true（数组也是 Object 的实例）
> console.log(function(){} instanceof Function); // true（函数）
> ```

### 4.为什么0.1+0.2 ! == 0.3

1.**造成的原因**

> 计算机**无法精确表示所有十进制小数**，比如 `0.1` 和 `0.2` 在二进制中是**无限循环小数**。JavaScript 采用 IEEE 754 标准存储浮点数（64 位双精度），会对无限循环的二进制进行截断，导致精度损失。`0.1` 的二进制存储是一个近似似值（约 `0.1000000000000000055...`），`0.2` 的二进制存储也是一个近似值（约 `0.2000000000000000111...`）， 两者相加的结果约为 `0.30000000000000004`，自然不等于 `0.3`。

2.**如何让它们 "相等"**

> 通过**精度阈值**（判断它们的差值是否小于一个极小的阈值，如 `0.0000001`）或**整数转换**的方式间接判断。
>
> ```js
> // 方法 1：使用最小精度阈值比较
> function isEqual(a, b) {
>   return Math.abs(a - b) < 1e-10; // 1e-10 表示 0.0000000001
> }
> console.log(isEqual(0.1 + 0.2, 0.3)); // true
> ```
>
> ```js
> // 方法 2：将数字转换为整数计算,通过放大 10 倍转为整数计算（避免浮点数运算），再缩小回原比例：
> const result = (0.1 * 10 + 0.2 * 10) / 10; 
> console.log(result === 0.3); // true
> ```
>
> ```js
> // 方法 3：使用 toFixed() 固定小数位数
> const result = Number((0.1 + 0.2).toFixed(1));
> console.log(result === 0.3); // true（toFixed 返回字符串，此时已转换为数字）
> ```

### 5.判断数组的方式有哪些

1.**`Array.isArray()`**

> **原理**：直接检测值的内部类型是否为数组。返回**布尔值** `true` 或 `false`。**优点**：不受原型链或跨窗口影响，判断准确。**缺点**：低版本 IE（IE8 及以下）不支持。
>
> ```js
> const arr = [1, 2, 3];
> const obj = {};
> 
> console.log(Array.isArray(arr)); // true
> console.log(Array.isArray(obj)); // false
> console.log(Array.isArray(null)); // false
> console.log(Array.isArray('hello')); // false
> ```

2.**`instanceof` 运算符**

> **原理**：检查值的原型链上是否存在 `Array.prototype`。**注意点**：不适用于跨窗口 /iframe 场景（不同窗口的 `Array` 构造函数不同，原型链不共享）；若手动修改原型链，可能导致判断失效。
>
> ```js
> const arr = [1, 2, 3];
> console.log(arr instanceof Array); // true
> ```

3.**`Object.prototype.toString.call()`**

> **原理**：所有内置类型的 `toString` 方法会返回 `[object 类型名]` 格式的字符串，数组会返回 `[object Array]`。**优点**：兼容性极好（支持所有浏览器，包括低版本 IE）；不受原型链修改或跨窗口影响，判断稳定。
>
> ```js
> const arr = [1, 2, 3];
> const getType = (value) => Object.prototype.toString.call(value);
> 
> console.log(getType(arr) === '[object Array]'); // true
> console.log(getType({}) === '[object Array]'); // false
> console.log(getType(null) === '[object Array]'); // false
> ```

4.**检查构造函数 `constructor`**

> **原理**：通过判断值的 `constructor` 属性是否指向 `Array` 构造函数。**缺点**：`constructor` 可被手动修改，导致判断失效；若值为 `null` 或 `undefined`，访问 `constructor` 会报错。
>
> ```js
> const arr = [1, 2, 3];
> console.log(arr.constructor === Array); // true
> ```

### 6.数组与伪数组

1.**什么是伪数组**

> **伪数组**：有 `length` 和索引，但不具备数组的原型链方法（如 `push`、`slice`、`forEach` 等）的对象。

2.**常见的伪数组**

> 函数的 `arguments` 对象（存储函数参数）。DOM 集合（如 `document.getElementsByTagName('div')` 返回的元素集合）。自定义的类数组对象。
>
> ```js
> // 自定义的类数组对象
> const fakeArr = {
>   0: 'a',
>   1: 'b',
>   length: 2 // 必须有 length 属性
> };
> ```

3.**伪数组转化为数组的方法**

> **`Array.from()`**、**扩展运算符**（`...`）、**`Array.prototype.slice.call()`**。
>
> ```js
> // 方法 1：Array.from()（推荐，ES6 新增）
> // 示例：转换 arguments 对象
> function fn() {
>   const arr = Array.from(arguments);
>   console.log(arr instanceof Array); // true
>   arr.forEach(item => console.log(item)); // 可以使用数组方法
> }
> fn(1, 2, 3); // 输出 1、2、3
> 
> // 转换自定义伪数组
> const fakeArr = { 0: 'a', 1: 'b', length: 2 };
> const realArr = Array.from(fakeArr);
> console.log(realArr); // ['a', 'b']
> ```
>
> ```js
> // 方法 2：扩展运算符
> // 转换 arguments
> function fn() {
>   const arr = [...arguments];
>   console.log(arr); // [1, 2, 3]
> }
> fn(1, 2, 3);
> 
> // 转换 DOM 集合
> const divs = document.getElementsByTagName('div');
> const divArr = [...divs]; // 转化为数组
> ```
>
> ```js
> // 方法 3：Array.prototype.slice.call(),利用数组的 slice 方法（返回新数组），通过 call 改变 this 指向伪数组。
> // 转换 arguments
> function fn() {
>   const arr = Array.prototype.slice.call(arguments);
>   console.log(arr); // [1, 2, 3]
> }
> fn(1, 2, 3);
> 
> // 转换自定义伪数组
> const fakeArr = { 0: 'x', 1: 'y', length: 2 };
> const realArr = [].slice.call(fakeArr); // 简写形式
> console.log(realArr); // ['x', 'y']
> ```

### 7.数组有哪些原生方法

可分为**改变原数组**、**不改变原数组**、**遍历 / 迭代方法**、**其他常用方法**

1.**改变原数组**：**`push(...items)`**、 **`pop()`** 、**`unshift(...items)`** 、**`shift()`**、 **`reverse()`** 、**`sort([compareFunction])`** 、 **`splice(start, deleteCount, ...items)`**

> **`push(...items)`**向数组末尾添加一个 / 多个元素，返回新长度。
>
> ```js
> const arr = [1, 2];
> arr.push(3, 4); // 返回 4，arr 变为 [1, 2, 3, 4]
> ```
>
> **`pop()`**删除数组最后一个元素，返回被删除的元素。
>
> ```js
> const arr = [1, 2, 3];
> arr.pop(); // 返回 3，arr 变为 [1, 2]
> ```
>
> **`unshift(...items)`**向数组开头添加一个 / 多个元素，返回新长度。
>
> ```js
> const arr = [3, 4];
> arr.unshift(1, 2); // 返回 4，arr 变为 [1, 2, 3, 4]
> ```
>
> **`shift()`**删除数组第一个元素，返回被删除的元素。
>
> ```js
> const arr = [1, 2, 3];
> arr.shift(); // 返回 1，arr 变为 [2, 3]
> ```
>
> **`reverse()`**反转数组元素顺序，返回反转后的数组。
>
> ```js
> const arr = [1, 2, 3];
> arr.reverse(); // arr 变为 [3, 2, 1]
> ```
>
> **`sort([compareFunction])`**对数组元素排序（默认按字符串 Unicode 排序），返回排序后的数组。
>
> ```js
> const arr = [3, 1, 2];
> arr.sort((a, b) => a - b); // 升序，arr 变为 [1, 2, 3]
> ```
>
> **`splice(start, deleteCount, ...items)`**从 `start` 索引开始删除 `deleteCount` 个元素，并插入新元素，返回被删除的元素数组。
>
> ```js
> const arr = [1, 2, 3, 4];
> arr.splice(1, 2, 'a', 'b'); // 返回 [2, 3]，arr 变为 [1, 'a', 'b', 4]
> ```

2.**不改变原数组**：**`slice(start, end)`**、**`concat(...items)`**、**`join(separator)`**、**`indexOf(searchElement, fromIndex)`**、**`lastIndexOf(searchElement, fromIndex)`**、**`includes(searchElement, fromIndex)`**、**`toString()`**

> **`slice(start, end)`**截取从 `start` 到 `end`（不包含 `end`）的元素，返回新数组。
>
> ```js
> const arr = [1, 2, 3, 4];
> const newArr = arr.slice(1, 3); // newArr 为 [2, 3]，arr 不变
> ```
>
> **`concat(...items)`**合并数组 / 值，返回新数组（原数组不变）。
>
> ```js
> const arr1 = [1, 2];
> const arr2 = [3, 4];
> const newArr = arr1.concat(arr2, 5); // [1, 2, 3, 4, 5]
> ```
>
> **`join(separator)`**将数组元素用 `separator` 连接成字符串，返回字符串。
>
> ```js
> const arr = [1, 2, 3];
> arr.join('-'); // "1-2-3"
> ```
>
> **`indexOf(searchElement, fromIndex)`**从 `fromIndex` 开始查找元素，返回首次出现的索引（未找到返回 `-1`）。
>
> ```js
> const arr = [1, 2, 3, 2];
> arr.indexOf(2); // 1
> ```
>
> **`lastIndexOf(searchElement, fromIndex)`**从 `fromIndex` 开始反向查找，返回最后出现的索引（未找到返回 `-1`）
>
> ```js
> const arr = [1, 2, 3, 2];
> arr.lastIndexOf(2); // 3
> ```
>
> **`includes(searchElement, fromIndex)`**判断数组是否包含指定元素，返回布尔值（ES7 新增）。
>
> ```js
> const arr = [1, 2, 3];
> arr.includes(2); // true
> ```
>
> **`toString()`**将数组转为字符串（默认用逗号分隔）。
>
> ```js
> [1, 2, 3].toString(); // "1,2,3"
> ```

**3.遍历 / 迭代方法**：**`forEach()`**、**`map()`**、**`filter()`**、**`find()`**、**`findIndex()`**、**`every()`**、**`some()`**、**`reduce()`**、**`reduceRight()`**

> **`forEach((item, index, array) => {})`**遍历数组，对每个元素执行回调（无返回值）。
>
> ```js
> [1, 2, 3].forEach((item, index) => {
>   console.log(item, index); // 依次输出 1 0、2 1、3 2
> });
> ```
>
> **`map((item, index, array) => {})`**遍历数组，返回由回调返回值组成的新数组。
>
> ```js
> const arr = [1, 2, 3];
> const newArr = arr.map(item => item * 2); // [2, 4, 6]
> ```
>
> **`filter((item, index, array) => {})`**筛选出符合回调条件（返回 `true`）的元素，组成新数组。
>
> ```js
> const arr = [1, 2, 3, 4];
> const newArr = arr.filter(item => item % 2 === 0); // [2, 4]
> ```
>
> **`find((item, index, array) => {})`**返回第一个符合条件的元素（未找到返回 `undefined`，ES6 新增）。
>
> ```js
> const arr = [1, 2, 3, 4];
> arr.find(item => item > 2); // 3
> ```
>
> **`findIndex((item, index, array) => {})`**返回第一个符合条件的元素索引（未找到返回 `-1`，ES6 新增）。
>
> ```js
> const arr = [1, 2, 3, 4];
> arr.findIndex(item => item > 2); // 2
> ```
>
> **`every((item, index, array) => {})`**检测是否所有元素都符合条件，返回布尔值（全符合才为 `true`）。
>
> ```js
> [1, 3, 4].some(item => item % 2 === 0); // true（4 符合）
> ```
>
> **`some((item, index, array) => {})`**检测是否至少有一个元素符合条件，返回布尔值（有一个符合即为 `true`）。
>
> ```js
> const arr = [1, 2, 3];
> arr.reduce((acc, item) => acc + item, 0); // 6（求和）
> ```
>
> **`reduceRight((acc, item, index, array) => {}, initialValue)`**从右到左累加计算（用法同 `reduce`，方向相反）。

**4.其他常用方法**：**`flat(depth)`**、**`flatMap()`**

> **`flat(depth)`**：将多维数组扁平化（`depth` 为扁平化深度，默认 1，ES2019 新增）。
>
> ```js
> [1, [2, [3]]].flat(2); // [1, 2, 3]
> ```
>
> **`flatMap((item, index, array) => {})`**：先执行 `map` 再执行 `flat(1)`（ES2019 新增）。
>
> ```js
> [1, 2].flatMap(item => [item, item * 2]); // [1, 2, 2, 4]
> ```

### 8.substring 和 substr的区别

1.**参数差异**

> **`substring(startIndex, endIndex)`**接受两个参数：第一个参数 `startIndex`：提取的起始位置（包含该位置的字符）。第二个参数 `endIndex`（可选）：提取的结束位置（**不包含**该位置的字符），默认提取到字符串末尾。
>
> **`substr(startIndex, length)`**接受两个参数：第一个参数 `startIndex`：提取的起始位置（包含该位置的字符）。第二个参数 `length`（可选）：要提取的字符**长度**，默认提取到字符串末尾。

2.**参数为负数情况的处理**

> `substring()` 会将负数参数转为 `0`，并自动调整 `startIndex` 和 `endIndex` 的顺序（确保 `startIndex` ≤ `endIndex`）。
>
> `substr()` 会将负的 `startIndex` 视为从字符串末尾开始计算（例如 `-1` 表示最后一个字符），负的 `length` 会被转为 `0`（即提取空字符串）。

```js
const str = "Hello World";

// substring()
console.log(str.substring(3, 7)); // "lo W"（从索引3到6）
console.log(str.substring(7, 3)); // "lo W"（自动交换参数，效果同上）
console.log(str.substring(-2, 4)); // "Hell"（负数转为0，从0到3）

// substr()
console.log(str.substr(3, 4)); // "lo W"（从索引3开始，取4个字符）
console.log(str.substr(-5, 3)); // "orl"（从倒数第5个字符开始，取3个字符）
console.log(str.substr(3, -2)); // ""（负长度转为0，提取空字符串）
```

### 9.object.assign和扩展运算法用于拷贝区别

1.`Object.assign()` 和扩展运算符（`...`）**都是浅拷贝**。

> 浅拷贝对于**基本数据类型**（如字符串、数字、布尔值），会复制其值。对于**引用数据类型**（如对象、数组），只会复制其引用地址（即新对象和原对象共享同一个引用类型的底层数据）。
>
> ```js
> const obj = { 
>   name: "张三", 
>   info: { age: 20 } // 引用类型属性
> };
> 
> // Object.assign() 拷贝
> const copy1 = Object.assign({}, obj);
> // 扩展运算符拷贝
> const copy2 = { ...obj };
> 
> // 修改原对象的引用类型属性
> obj.info.age = 30;
> 
> // 拷贝对象的引用类型属性也会被修改（浅拷贝特性）
> console.log(copy1.info.age); // 30
> console.log(copy2.info.age); // 30
> ```

2.**两者的区别**

> | 特性               | `Object.assign(target, ...sources)`                      | 扩展运算符（`{ ...source }`）                           |
> | ------------------ | -------------------------------------------------------- | ------------------------------------------------------- |
> | **语法**           | 接收一个目标对象和多个源对象，将源对象属性合并到目标对象 | 通过 `...` 展开源对象，创建新对象并复制其可枚举属性     |
> | **处理多个源对象** | 支持多个源对象，后面的源对象会覆盖前面的同名属性         | 支持多个源对象（如 `{ ...a, ...b }`），后展开的覆盖前的 |
> | **继承的属性**     | 只复制源对象自身的可枚举属性（忽略继承和不可枚举属性）   | 只复制源对象自身的可枚举属性（与 `Object.assign` 一致） |
> | **Symbol 类型键**  | 会复制 Symbol 类型的键值对                               | 会复制 Symbol 类型的键值对（与 `Object.assign` 一致）   |
> | **数组处理**       | 可用于数组（将数组视为对象，按索引复制）                 | 对数组更简洁（`[...arr]` 直接创建新数组）               |
> | **目标对象修改**   | 会修改第一个参数（目标对象），并返回修改后的目标对象     | 不会修改原对象，而是创建全新的对象                      |
>
> ```js
> const a = { x: 1, y: 2 };
> const b = { y: 3, z: 4 };
> 
> // Object.assign：合并到目标对象（此处目标为{}）
> const merge1 = Object.assign({}, a, b); // { x:1, y:3, z:4 }（b的y覆盖a的y）
> 
> // 扩展运算符：合并多个对象
> const merge2 = { ...a, ...b }; // { x:1, y:3, z:4 }（效果同上）
> ```

### 10.new操作符的实现原理

1.**创建一个空对象（新实例）**：生成一个全新的空对象，这个对象将作为最终返回的实例。

> ```javascript
> const obj = {};
> ```

2.**绑定原型链**：将新对象的原型（`__proto__`）指向构造函数的 `prototype` 属性，使实例能**继承构造函数原型上的方法**。

> ```javascript
> obj.__proto__ = Constructor.prototype;
> ```

3.**绑定 this 并执行构造函数**将构造函数的 `this` 指向新创建的对象，然后执行构造函数，传入参数 `args`。

> ```javascript
> const result = Constructor.apply(obj, args); // 相当于 obj.Constructor(...args)
> ```

4.**判断返回值类型**

> 如果构造函数执行后返回一个**引用类型值**（对象、数组、函数等），则 `new` 操作的结果就是这个返回值。
>
> 如果返回的是**基本类型值**（number、string、boolean 等）或无返回值，则结果是第 1 步创建的新对象 `obj`。

5.**返回最终实例**根据上一步的判断，返回对应的结果。

```js
function myNew(Constructor, ...args) {
  // 1. 创建空对象
  const obj = {};
  
  // 2. 绑定原型链（obj 继承 Constructor 的原型方法）
  obj.__proto__ = Constructor.prototype;
  
  // 3. 执行构造函数，this 指向 obj
  const result = Constructor.apply(obj, args);
  
  // 4. 判断返回值，决定最终返回结果
  // 如果构造函数返回引用类型，则返回该结果；否则返回 obj
  return typeof result === 'object' && result !== null || typeof result === 'function' 
    ? result 
    : obj;
}

// 测试示例
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

// 使用自定义 myNew 创建实例，效果等同于 new Person('Alice', 20)
const p = myNew(Person, 'Alice', 20);
console.log(p.name); // 'Alice'（正确继承属性）
p.sayHi(); // 'Hi, I'm Alice'（正确继承原型方法）
console.log(p instanceof Person); // true（正确的实例关系）

```

### 11.for...in和for...of的区别

1.**遍历目标不同**

> **`for...in`**用于遍历**对象的可枚举属性**（包括自身属性和继承的原型链属性），不适用于遍历数组（虽然能遍历，但不推荐）。
>
> **`for...of`**用于遍历**可迭代对象（iterable）的元素**，包括数组、字符串、`Map`、`Set`、`arguments` 等，不能直接遍历普通对象。

2.**循环变量不同**

> **`for...in`**循环变量是**属性名（或数组索引）**，返回的是字符串类型的键名。
>
> **`for...of`**循环变量是**元素值**，直接获取可迭代对象的每一个值。
>
> ```js
> const obj = { a: 1, b: 2 };
> for (const key in obj) {
>   console.log(key); // 输出 "a"、"b"（属性名）
> }
> 
> const arr = [10, 20];
> for (const index in arr) {
>   console.log(index); // 输出 "0"、"1"（字符串类型的索引）
> }
> ```
>
> ```js
> const arr = [10, 20];
> for (const value of arr) {
>   console.log(value); // 输出 10、20（元素值）
> }
> 
> const str = "abc";
> for (const char of str) {
>   console.log(char); // 输出 "a"、"b"、"c"（字符串的每个字符）
> }
> ```

3.**对原型链的处理不同**

