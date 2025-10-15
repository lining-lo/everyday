## js总结

### 1.js数据类型有哪些

1. 分为**基本数据类型**和**引用数据类型**两大类

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

3.**适用场景与返回值**

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

