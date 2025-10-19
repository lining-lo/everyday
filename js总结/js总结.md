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
> **`for...of`**用于遍历**可迭代对象（iterable）的元素**，包括数组、字符串、`Map`、`Set`、`arguments` 等，不能遍历普通对象（会报错）。

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

> **`for...in`**会遍历对象**原型链上的可枚举属性**，可能导致意外结果，需要用 `hasOwnProperty()` 过滤。
>
> **`for...of`**只遍历对象自身的元素，**不涉及原型链**，无需额外过滤。
>
> ```js
> // 给 Object 原型添加一个属性
> Object.prototype.foo = "bar";
> 
> const obj = { a: 1 };
> for (const key in obj) {
>   // 不过滤会遍历到原型链上的 foo
>   console.log(key); // 输出 "a"、"foo"
> }
> 
> // 正确用法：只遍历自身属性
> for (const key in obj) {
>   if (obj.hasOwnProperty(key)) {
>     console.log(key); // 仅输出 "a"
>   }
> ```

### 12.用for...of遍历普通对象

1.`for...of` 循环主要用于遍历**可迭代对象**（如数组、字符串、Map、Set 等），而普通对象（`Object`）默认是**不可迭代的**。

> 若要使用 `for...of` 遍历普通对象，需先将对象转换为可迭代形式（如获取对象的键、值或键值对数组）

2.遍历对象的键（`Object.keys()`）

> `Object.keys(obj)` 返回对象自身所有可枚举属性的**键名数组**，可通过 `for...of` 遍历键名，再通过键名获取对应值。
>
> ```js
> const obj = { name: '张三', age: 20, gender: '男' };
> 
> // 遍历键名
> for (const key of Object.keys(obj)) {
>   console.log('键：', key, '，值：', obj[key]);
> }
> // 输出：
> // 键： name ，值： 张三
> // 键： age ，值： 20
> // 键： gender ，值： 男
> ```

3.遍历对象的值（`Object.values()`）

> `Object.values(obj)` 返回对象自身所有可枚举属性的**值数组**，可直接遍历值。
>
> ```js
> const obj = { name: '张三', age: 20, gender: '男' };
> 
> // 遍历值
> for (const value of Object.values(obj)) {
>   console.log('值：', value);
> }
> // 输出：
> // 值： 张三
> // 值： 20
> // 值： 男
> ```

3.遍历对象的键值对（`Object.entries()`）

> `Object.entries(obj)` 返回对象自身所有可枚举属性的**键值对数组**（每个元素是 `[key, value]` 形式的数组），可同时获取键和值。
>
> ```js
> const obj = { name: '张三', age: 20, gender: '男' };
> 
> // 遍历键值对
> for (const [key, value] of Object.entries(obj)) {
>   console.log(`键：${key}，值：${value}`);
> }
> // 输出：
> // 键：name，值：张三
> // 键：age，值：20
> // 键：gender，值：男
> ```

### 13.对 AJAX 的理解

1.**对 AJAX 的理解**

> AJAX（Asynchronous JavaScript and XML，异步 JavaScript 和 XML）是一种在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。其核心是**异步通信**，通过浏览器内置的 `XMLHttpRequest` 对象（或现代的 `fetch API`）实现客户端与服务器的后台数据交互，从而提升用户体验。

2.**AJAX 的核心特点**

> **异步性**：请求发送后，浏览器无需等待服务器响应，可继续执行其他操作，响应返回后通过回调处理结果。
>
> **局部更新**：只需更新页面的部分内容，无需刷新整个页面。
>
> **数据交换**：早期主要使用 XML 格式，现在更多用 JSON（更轻量、易解析）。

3.**实现一个 AJAX 请求**

> `new XMLHttpRequest()`：创建请求对象。
>
> `open(method, url, async)`：初始化请求（方法、地址、是否异步）。
>
> `setRequestHeader()`：设置请求头（如 `Content-Type`）。
>
> `send(data)`：发送请求（GET 时 `data` 为 `null`）。
>
> `onreadystatechange`：监听状态变化（`readyState=4` 表示请求完成）。
>
> ```js
> /**
>  * 封装 AJAX 请求函数
>  * @param {Object} options - 请求配置
>  * @param {string} options.url - 请求地址
>  * @param {string} [options.method='GET'] - 请求方法（GET/POST）
>  * @param {Object} [options.data=null] - 请求数据
>  * @param {Function} options.success - 成功回调（接收响应数据）
>  * @param {Function} options.error - 失败回调（接收错误信息）
>  */
> function ajax(options) {
>   // 默认配置
>   const {
>     url,
>     method = 'GET',
>     data = null,
>     success,
>     error
>   } = options;
> 
>   // 创建 XMLHttpRequest 对象
>   const xhr = new XMLHttpRequest();
> 
>   // 初始化请求（设置方法和地址）
>   // GET 方法：数据拼接在 URL 后（?key=value&...）
>   // POST 方法：数据放在请求体中
>   if (method.toUpperCase() === 'GET' && data) {
>     // 拼接 URL 参数（将对象转为 key=value 格式）
>     const params = new URLSearchParams(data).toString();
>     url += (url.includes('?') ? '&' : '?') + params;
>   }
>   xhr.open(method, url, true); // 第三个参数 true 表示异步
> 
>   // 设置请求头（POST 需指定内容类型）
>   if (method.toUpperCase() === 'POST') {
>     xhr.setRequestHeader('Content-Type', 'application/json'); // JSON 格式
>     // 若数据是表单格式，可改为：'application/x-www-form-urlencoded'
>   }
> 
>   // 监听请求状态变化
>   xhr.onreadystatechange = function() {
>     // readyState = 4 表示请求完成，status = 200 表示成功
>     if (xhr.readyState === 4) {
>       if (xhr.status >= 200 && xhr.status < 300) {
>         // 解析响应数据（假设服务器返回 JSON）
>         const response = JSON.parse(xhr.responseText);
>         success && success(response);
>       } else {
>         error && error(new Error(`请求失败：${xhr.status}`));
>       }
>     }
>   };
> 
>   // 处理网络错误
>   xhr.onerror = function() {
>     error && error(new Error('网络错误'));
>   };
> 
>   // 发送请求（POST 数据需转为 JSON 字符串）
>   const sendData = method.toUpperCase() === 'POST' && data 
>     ? JSON.stringify(data) 
>     : null;
>   xhr.send(sendData);
> }
> 
> 
> // 示例：使用 AJAX 函数
> // 1. GET 请求
> ajax({
>   url: 'https://api.example.com/user',
>   method: 'GET',
>   data: { id: 123 }, // 传递的参数
>   success: (res) => {
>     console.log('GET 成功：', res);
>   },
>   error: (err) => {
>     console.error('GET 失败：', err.message);
>   }
> });
> 
> // 2. POST 请求
> ajax({
>   url: 'https://api.example.com/user',
>   method: 'POST',
>   data: { name: '张三', age: 20 }, // 提交的数据
>   success: (res) => {
>     console.log('POST 成功：', res);
>   },
>   error: (err) => {
>     console.error('POST 失败：', err.message);
>   }
> });
> ```

4.**现代替代方案**

> 实际开发中，更推荐使用 `fetch API` 或 `axios`（基于 Promise，语法更简洁），但 `XMLHttpRequest` 是 AJAX 的基础，理解其原理很重要。

### 14.ajax、axios、fetch的区别

1.**本质与定位不同**

> **`ajax`**：不是具体的 API 或库，而是一种**技术思想**：指通过 `XMLHttpRequest` 对象在不刷新页面的情况下与服务器异步通信，实现局部更新页面的技术。核心是 `XMLHttpRequest`（XHR）对象，是浏览器原生 API。
>
> **`axios`**：是一个**基于 Promise 的第三方库**，封装了 `XMLHttpRequest`（浏览器端）和 `http` 模块（Node.js 端），用于简化 AJAX 请求。本质是对原生 XHR 的封装，同时支持更多功能。
>
> **`fetch`**：是浏览器**原生的 API**（属于 ES6+ 规范），用于替代 `XMLHttpRequest`，基于 Promise 设计，语法更简洁，是现代浏览器推荐的异步请求方案。

2. **语法与使用方式不同**

> **`ajax`**：需要手动创建 `XMLHttpRequest` 对象，通过事件监听处理回调，语法繁琐，且不支持 Promise。
>
> ```js
> const xhr = new XMLHttpRequest();
> xhr.open('GET', 'https://api.example.com/data', true);
> xhr.onreadystatechange = function() {
>   if (xhr.readyState === 4 && xhr.status === 200) {
>     const data = JSON.parse(xhr.responseText);
>     console.log(data);
>   }
> };
> xhr.send();
> ```
>
> **`axios`**：基于 Promise，支持 `async/await` 语法，使用简洁，直接返回处理后的响应数据。
>
> ```js
> // 示例：GET 请求
> axios.get('https://api.example.com/data', { params: { id: 1 } })
>   .then(res => console.log(res.data)) // 直接获取 data 字段
>   .catch(err => console.error(err));
> 
> // 支持 async/await
> async function fetchData() {
>   try {
>     const res = await axios.get('https://api.example.com/data');
>     console.log(res.data);
>   } catch (err) {
>     console.error(err);
>   }
> }
> ```
>
> **`fetch`**：原生 Promise API，语法比 XHR 简洁，但需要手动处理响应解析和错误。
>
> ```js
> fetch('https://api.example.com/data')
>   .then(res => {
>     if (!res.ok) throw new Error(`HTTP error: ${res.status}`); // 需手动判断 HTTP 状态
>     return res.json(); // 需手动解析 JSON（还支持 text()、blob() 等）
>   })
>   .then(data => console.log(data))
>   .catch(err => console.error(err));
> ```
>
> | 特性                | AJAX（XHR）                     | axios                              | fetch（原生）                                |
> | ------------------- | ------------------------------- | ---------------------------------- | -------------------------------------------- |
> | **本质**            | 技术思想（基于 XHR 对象）       | 第三方库（封装 XHR）               | 浏览器原生 API                               |
> | **Promise 支持**    | 不支持（需手动封装）            | 支持（核心特性）                   | 支持（基于 Promise）                         |
> | **语法简洁性**      | 繁琐（需处理大量回调）          | 简洁（支持链式调用 /async）        | 较简洁（但需手动处理细节）                   |
> | **响应处理**        | 需手动解析 `responseText`       | 自动解析 JSON（res.data）          | 需手动调用 `res.json()` 等                   |
> | **错误处理**        | 需判断 `status` 和 `readyState` | 自动捕获 HTTP 错误（4xx/5xx）      | 仅捕获网络错误，HTTP 错误需手动判断 `res.ok` |
> | **请求拦截 / 取消** | 需手动实现                      | 内置支持                           | 需通过 `AbortController` 实现                |
> | **超时设置**        | 需手动实现                      | 内置 `timeout` 配置                | 需结合 `Promise.race()` 实现                 |
> | **JSON 自动转换**   | 不支持                          | 自动转换（请求 / 响应）            | 需手动 `JSON.stringify()`/`res.json()`       |
> | **浏览器兼容性**    | 所有浏览器（包括 IE6+）         | 依赖 ES6 Promise（IE 需 polyfill） | 现代浏览器（IE 完全不支持）                  |
> | **Node.js 支持**    | 不支持                          | 支持（通过 http 模块）             | 不支持（浏览器原生 API）                     |

3.**适用场景不同**

> **`ajax`**：仅在需要原生底层控制，或兼容极旧浏览器（如 IE6）时使用，实际开发中很少直接使用。
>
> **`axios`**：最推荐的方案，功能完善（拦截、取消、超时等），语法简洁，兼容性好（通过 polyfill 支持旧浏览器），适用于大多数前端项目。
>
> **`fetch`**：现代项目中可替代 XHR，适合对原生 API 有偏好，且不需要兼容旧浏览器的场景（如移动端 H5、Electron 应用），但需手动处理边缘情况（如错误、超时）。

### 15.forEach和map的区别

1.`forEach` 和 `map` 是 JavaScript 常用的**遍历数组**的方法，两者**都不会直接修改原数组**（除非在回调函数中主动修改原数组元素，如引用类型的属性）。

> ```js
> // 基本类型元素：原数组不变
> const arr1 = [1, 2, 3];
> arr1.forEach(item => item = item * 2); // 无效（基本类型是值传递）
> console.log(arr1); // [1, 2, 3]
> 
> // 引用类型元素：可修改内部属性（但不推荐，应保持数据不可变）
> const arr2 = [{ a: 1 }, { a: 2 }];
> arr2.map(item => item.a = item.a * 2); 
> console.log(arr2); // [{a:2}, {a:4}]（原数组元素被修改）
> ```

2.**返回值不同**

> **`forEach`**：**没有返回值**（返回 `undefined`）。它的作用是 “执行操作”，仅用于遍历数组并对元素进行处理（如打印、修改外部变量等），不会生成新数组。
>
> ```js
> const arr = [1, 2, 3];
> const result = arr.forEach(item => item * 2);
> console.log(result); // undefined（无返回值）
> ```
>
> **`map`**：返回一个**新数组**，新数组的元素是原数组元素经过回调函数处理后的结果。它的作用是 “映射转换”，通过对原数组每个元素加工，生成一个新的数组，不改变原数组。
>
> ```js
> const arr = [1, 2, 3];
> const result = arr.map(item => item * 2);
> console.log(result); // [2, 4, 6]（返回新数组）
> console.log(arr); // [1, 2, 3]（原数组不变）
> ```

### 16.说一说尾调用

1.**什么是尾调用**

> 尾调用（Tail Call）是函数式编程中的一个概念，指的是**一个函数的最后一个操作是调用另一个函数，且该调用的结果直接作为其他运算的一部分，直接被返回**。
>
> ```js
> // 尾调用
> function A(x) {
>   return B(x); // 最后一步是调用 B，且直接返回 B 的结果
> }
> 
> // 非尾调用：调用后有其他运算
> function A(x) {
>   return B(x) + 1; // 调用 B 后还要做 +1 运算，不是尾调用
> }
> 
> // 非尾调用：调用后没有直接返回
> function A(x) {
>   const res = B(x);
>   return res; // 虽然最终返回 res，但调用 B 不是最后一步（最后一步是 return res）
> }
> ```

2.**尾调用的优点**

> 尾调用的重要意义在于**可以被引擎优化**，减少内存消耗。普通函数调用时，引擎会创建一个 “调用栈帧”（保存函数的参数、局部变量、返回地址等），并压入调用栈。若函数 `A` 尾调用函数 `B`，由于 `A` 后续无任何操作，其栈帧可以被释放，直接复用栈空间给 `B`，避免调用栈过深导致的 “栈溢出”（`Stack Overflow`）。
>
> ```js
> // 尾递归:递归函数若采用尾调用形式，理论上可以无限递归而不溢出（需引擎支持 TCO）
> function factorial(n, total = 1) {
>   if (n === 1) return total;
>   return factorial(n - 1, n * total); // 尾调用自身，可被优化
> }
> ```

### 17.如何实现浅拷贝

1.**什么是浅拷贝**

> 浅拷贝（Shallow Copy）是指创建一个新对象，**复制原对象的表层属性**，但如果原对象的属性值是引用类型（如对象、数组等），新对象只会复制该引用的地址（即新对象和原对象的引用类型属性指向指向同一个内存地址）。

2.**方式1：手动遍历赋值**

> 通过遍历原对象的属性，逐一复制到新对象中。
>
> ```js
> function shallowCopy(obj) {
>   // 只处理对象/数组，非引用类型直接返回
>   if (typeof obj !== 'object' || obj === null) {
>     return obj;
>   }
> 
>   // 根据原对象类型初始化新对象（数组/普通对象）
>   const newObj = Array.isArray(obj) ? [] : {};
> 
>   // 遍历原对象的可枚举属性，复制到新对象
>   for (let key in obj) {
>     // 只复制自身属性（不包含继承的属性）
>     if (obj.hasOwnProperty(key)) {
>       newObj[key] = obj[key];
>     }
>   }
> 
>   return newObj;
> }
> 
> // 测试
> const obj = { a: 1, b: { c: 2 }, arr: [3, 4] };
> const copy = shallowCopy(obj);
> 
> console.log(copy); // { a: 1, b: { c: 2 }, arr: [3, 4] }
> console.log(copy.b === obj.b); // true（引用类型属性共享内存）
> console.log(copy.arr === obj.arr); // true（数组也是引用类型）
> ```

3.**方式2：Object.assign () 方法**

> `Object.assign(target, ...sources)` 用于将源对象的可枚举属性复制到目标对象，返回目标对象，**适用于普通对象**。
>
> ```js
> const obj = { a: 1, b: { c: 2 } };
> const copy = Object.assign({}, obj); // 目标对象为新空对象，源对象为 obj
> 
> console.log(copy); // { a: 1, b: { c: 2 } }
> console.log(copy.b === obj.b); // true（引用类型未深拷贝）
> ```

4.**方式3： 解构赋值**

> 适用于对象和数组，通过解构语法快速复制表层属性。
>
> ```js
> // 对象解构
> const obj = { a: 1, b: { c: 2 } };
> const copyObj = { ...obj };
> console.log(copyObj.b === obj.b); // true
> 
> // 数组解构（同扩展运算符）
> const arr = [1, 2, { 3: 4 }];
> const copyArr = [...arr];
> console.log(copyArr[2] === arr[2]); // true
> ```

### 18.如何实现深拷贝

1.**什么是深拷贝**

> 深拷贝（Deep Copy）是指创建一个新对象，**完全复制原对象的所有层级别属性**，包括嵌套的引用类型（如对象、数组等），新对象与原对象完全独立，修改新对象的任何属性都不会影响原对象。

2.**方式1：JSON 序列化**

> 利用 `JSON.stringify()` 将对象转为 JSON 字符串，再用 `JSON.parse()` 解析为新对象，实现深拷贝。
>
> **局限性**：1.不支持 `Function`、`RegExp`、`Date`、`Map`、`Set` 等特殊类型，会被转换为无效值（如函数会被忽略，`Date` 会转为字符串后无法还原为 `Date` 对象）。2.不支持循环引用（如 `obj.self = obj`），会报错。3.不支持 `Symbol` 类型和不可枚举属性。
>
> **适用场景**：仅拷贝纯 JSON 数据（如 `number`、`string`、普通对象、数组等），无特殊类型和循环引用。
>
> ```js
> function deepCopyJSON(obj) {
>   return JSON.parse(JSON.stringify(obj));
> }
> 
> // 测试
> const obj = { a: 1, b: { c: 2 }, arr: [3, 4] };
> const copy = deepCopyJSON(obj);
> 
> console.log(copy); // { a: 1, b: { c: 2 }, arr: [3, 4] }
> console.log(copy.b === obj.b); // false（嵌套对象已独立）
> console.log(copy.arr === obj.arr); // false（嵌套数组已独立）
> ```

3.**方式2：递归实现**（基础版，支持多数场景）

> 通过递归遍历对象的所有属性，对基本类型直接复制，对引用类型则创建新对象并递归拷贝其属性。
>
> **改进点**：1.支持 `Date`、`RegExp` 等特殊类型。2.支持 `Symbol` 属性（通过 `Reflect.ownKeys` 遍历）。
>
> **局限性**：1.不支持循环引用（如 `obj.self = obj` 会导致递归无限循环，栈溢出）。2.不支持 `Map`、`Set` 等复杂类型（需额外处理）。
>
> ```js
> function deepCopyBasic(obj) {
>   // 处理 null 和非对象类型（基本类型直接返回）
>   if (obj === null || typeof obj !== 'object') {
>     return obj;
>   }
> 
>   // 处理日期对象
>   if (obj instanceof Date) {
>     return new Date(obj);
>   }
> 
>   // 处理正则对象
>   if (obj instanceof RegExp) {
>     return new RegExp(obj.source, obj.flags);
>   }
> 
>   // 初始化新对象（数组/普通对象）
>   const newObj = Array.isArray(obj) ? [] : {};
> 
>   // 遍历所有自有属性（包括 Symbol 类型）
>   Reflect.ownKeys(obj).forEach(key => {
>     // 递归拷贝属性值
>     newObj[key] = deepCopyBasic(obj[key]);
>   });
> 
>   return newObj;
> }
> 
> // 测试
> const obj = {
>   a: 1,
>   b: { c: 2 },
>   arr: [3, 4],
>   date: new Date(),
>   reg: /abc/g
> };
> const copy = deepCopyBasic(obj);
> 
> console.log(copy.b === obj.b); // false
> console.log(copy.date instanceof Date); // true（日期类型保留）
> console.log(copy.reg instanceof RegExp); // true（正则类型保留）
> ```

4.**方式3： 递归 + 缓存**（解决循环引用）

> 通过 `WeakMap` 缓存已拷贝的对象，避免循环引用导致的无限递归。
>
> **优势**：1.支持循环引用（通过 `WeakMap` 缓存）。2.支持 `Date`、`RegExp`、`Map`、`Set` 等特殊类型。3.支持 `Symbol` 属性和不可枚举属性。
>
> ```js
> function deepCopy(obj, cache = new WeakMap()) {
>   // 处理 null 和非对象类型
>   if (obj === null || typeof obj !== 'object') {
>     return obj;
>   }
> 
>   // 若已拷贝过该对象，直接返回缓存的新对象（解决循环引用）
>   if (cache.has(obj)) {
>     return cache.get(obj);
>   }
> 
>   let newObj;
> 
>   // 处理 Date
>   if (obj instanceof Date) {
>     newObj = new Date(obj);
>     cache.set(obj, newObj);
>     return newObj;
>   }
> 
>   // 处理 RegExp
>   if (obj instanceof RegExp) {
>     newObj = new RegExp(obj.source, obj.flags);
>     cache.set(obj, newObj);
>     return newObj;
>   }
> 
>   // 处理 Map
>   if (obj instanceof Map) {
>     newObj = new Map();
>     cache.set(obj, newObj);
>     obj.forEach((value, key) => {
>       newObj.set(key, deepCopy(value, cache)); // 递归拷贝值
>     });
>     return newObj;
>   }
> 
>   // 处理 Set
>   if (obj instanceof Set) {
>     newObj = new Set();
>     cache.set(obj, newObj);
>     obj.forEach(value => {
>       newObj.add(deepCopy(value, cache)); // 递归拷贝值
>     });
>     return newObj;
>   }
> 
>   // 处理数组和普通对象
>   newObj = Array.isArray(obj) ? [] : {};
>   cache.set(obj, newObj); // 缓存新对象，避免循环引用
> 
>   // 遍历所有自有属性（包括 Symbol）
>   Reflect.ownKeys(obj).forEach(key => {
>     newObj[key] = deepCopy(obj[key], cache); // 递归拷贝属性
>   });
> 
>   return newObj;
> }
> 
> // 测试循环引用
> const obj = { name: 'test' };
> obj.self = obj; // 循环引用：obj 引用自身
> 
> const copy = deepCopy(obj);
> console.log(copy.self === copy); // true（拷贝后，self 指向新对象自身，无循环递归）
> ```

5**.方式4：第三方库**（生产环境推荐）

> 实际开发中，手动实现的深拷贝可能存在边缘场景遗漏，推荐使用成熟库**Lodash 的 `_.cloneDeep()`**：功能完善，支持各种类型和边缘情况，是行业标准。
>
> ```js
> import _ from 'lodash';
> 
> const obj = { a: 1, b: { c: 2 }, self: null };
> obj.self = obj; // 循环引用
> 
> const copy = _.cloneDeep(obj);
> console.log(copy.b === obj.b); // false
> console.log(copy.self === copy); // true
> ```

### 19.let、const、var的区别
