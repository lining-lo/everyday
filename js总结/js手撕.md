## JS手撕

### 防抖

> 防抖（Debounce）：用于**限制函数在短时间频繁执行**，只有当触发事件后经过指定时间内没有再次触发时，才会执行目标函数（等电梯）。

```js
function debounce(fn, delay) {
  let timer = null; // 用于保存定时器ID
  return function(...args) {
    // 每次触发时，清除之前的定时器
    if (timer) clearTimeout(timer);
    // 重新设置定时器，延迟执行目标函数
    timer = setTimeout(() => {
      fn.apply(this, args); // 绑定正确的this和参数
      timer = null; // 执行后清空定时器
    }, delay);
  };
}
```

### 节流

> **节流会确保函数在固定时间间隔内只执行一次**，无论事件触发多少次（红绿灯）。

```js
// 1.时间戳版
function throttle(fn, delay) {
  let lastTime = 0; // 记录上次执行时间
  return function (...args) {
    const now = Date.now(); // 当前时间
    // 如果当前时间 - 上次执行时间 >= 冷却时间，则执行
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now; // 更新上次执行时间
    }
  };
}
```

```js
// 2.定时器版
function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    // 如果定时器不存在，说明处于可执行状态
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null; // 执行后清空定时器，允许下次触发
      }, delay);
    }
  };
}
```

### 深拷贝

```js
// 1.基础版深拷贝：适用于简单场景（仅包含对象、数组、基本类型）：
function deepClone(obj) {
  // 非对象类型（null、基本类型）直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 区分数组和对象，初始化新容器
  let clone = Array.isArray(obj) ? [] : {};

  // 递归拷贝属性
  for (let key in obj) {
    // 只拷贝自身属性（跳过继承的属性）
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}
```

```js
// 2.进阶版：可以处理 Date、RegExp、Function 等特殊类型，以及对象的循环引用（如 obj.self = obj）
function deepClone(obj, hash = new WeakMap()) {
  // 处理 null 或基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用：如果已经拷贝过，直接返回缓存的结果
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let clone;

  // 处理 Date
  if (obj instanceof Date) {
    clone = new Date(obj);
    hash.set(obj, clone);
    return clone;
  }

  // 处理 RegExp
  if (obj instanceof RegExp) {
    clone = new RegExp(obj.source, obj.flags);
    hash.set(obj, clone);
    return clone;
  }

  // 处理数组或对象（普通对象、自定义对象等）
  clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone); // 缓存已拷贝的对象，防止循环引用

  // 递归拷贝属性（包括 Symbol 类型的键）
  Reflect.ownKeys(obj).forEach(key => {
    clone[key] = deepClone(obj[key], hash);
  });

  return clone;
}
```

### 数组去重

方法 1：利用 `Set`（最简洁）

```js
const arr = [1, 2, 2, 3, 3, 3];
const uniqueArr = [...new Set(arr)]; // 展开Set为数组
console.log(uniqueArr); // [1, 2, 3]
```

方法 2：利用 `filter` 和 `indexOf`

```js
const uniqueArr = arr.filter((item, index) => {
  return arr.indexOf(item) === index; // 只保留首次出现的元素
});
```

方法3：利用`Map`去重

实现原理：

1. 创建一个空 `Map`（键唯一，且保留插入顺序）。
2. 遍历原数组，将每个元素作`Map`的键存入：
   - 若元素已作为键存在于 `Map` 中，则跳过（不重复存储）。
   - 若元素不存在，则存入 `Map`（键为元素，值可随意定义，例如 `true`）。
3. 最终 `Map` 的所有键就是去重后的唯一元素，通过 `Map.keys()` 提取并转换为数组。

```js
function uniqueWithMap(arr) {
  const map = new Map();
  // 遍历数组，只保留首次出现的元素（作为 Map 的键）
  arr.forEach(item => {
    if (!map.has(item)) { // 若 Map 中不存在该键，则添加
      map.set(item, true);
    }
  });
  // 将 Map 的键转换为数组（保持插入顺序）
  return Array.from(map.keys());
}
```

### 数组扁平化

方法1：使用 `Array.prototype.flat()` 方法（ES2019+）

`flat(depth)` 是 ES6 之后新增的数组方法，参数 `depth` 表示扁平化的深度（默认值为 `1`），传入 `Infinity` 可扁平化为一维数组。

```js
const arr = [1, [2, [3, [4]], 5]];

// 扁平化为一维数组
const flatArr = arr.flat(Infinity);
console.log(flatArr); // [1, 2, 3, 4, 5]
```

方法2：使用递归 + 数组方法
通过递归遍历数组，若元素仍是数组则继续递归，否则添加到结果中。

```js
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    // 若元素是数组，递归处理；否则直接添加
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

const arr = [1, [2, [3, [4]], 5]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]
```

方法3：使用 reduce() 简化递归
利用 reduce 方法累积结果，逻辑与递归类似：

```js
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []); // 初始值为空数组
}

const arr = [1, [2, [3, [4]], 5]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]
```

方法4：使用扩展运算符（`...`）+ 循环

通过循环判断是否存在嵌套数组，逐步扁平化：

```js
function flatten(arr) {
  // 只要数组中还有数组，就继续展开
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr); // 展开一层
  }
  return arr;
}

const arr = [1, [2, [3, [4]], 5]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]
```

### 实现new

`new` 运算符的执行过程

当执行 `new Constructor(...args)` 时，会发生以下步骤：

1. 创建一个**空的新对象**（`{}`）。
2. 将新对象的**原型链**指向构造函数的 `prototype`（即 `newObj.__proto__ = Constructor.prototype`）。
3. 调用构造函数，将**this 绑定到新对象**上，并传入参数 `args`。
4. 如果构造函数**返回一个对象（或函数）**，则最终结果为该返回值；否则，返回第一步创建的新对象。

```js
function myNew(constructor, ...args) {
  // 1. 创建空对象
  const newObj = {};

  // 2. 绑定原型链：新对象的 __proto__ 指向构造函数的 prototype
  newObj.__proto__ = constructor.prototype;
  // 或用 Object.setPrototypeOf(newObj, constructor.prototype)（更规范）

  // 3. 调用构造函数，this 指向新对象，并传入参数
  const result = constructor.apply(newObj, args);

  // 4. 若构造函数返回对象/函数，则返回该结果；否则返回新对象
  return (typeof result === 'object' && result !== null) || typeof result === 'function' 
    ? result 
    : newObj;
}
```

验证：用 `myNew` 模拟 `new` 的效果

测试一个构造函数，对比 `new` 和 `myNew` 的结果：

```js
// 定义一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  // 若构造函数返回对象，则实例会是该对象（测试第4步逻辑）
  // return { gender: 'male' }; 
}

// 原型上的方法
Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

// 用原生 new 创建实例
const p1 = new Person('Alice', 20);
// 用 myNew 创建实例
const p2 = myNew(Person, 'Bob', 22);

console.log(p1); // Person { name: 'Alice', age: 20 }
console.log(p2); // Person { name: 'Bob', age: 22 }（和 p1 结构一致）

p1.sayHi(); // Hi, I'm Alice（原型方法可调用）
p2.sayHi(); // Hi, I'm Bob（原型链绑定正确）

console.log(p1 instanceof Person); // true
console.log(p2 instanceof Person); // true（验证原型关系正确）
```

### 实现call

要实现 `call` 方法，需理解其核心功能：**改变函数执行时的 `this` 指向，并立即调用函数**，同时支持传入参数列表。以下是具体实现及原理分析：

`call` 方法的核心逻辑

1. **绑定 `this` 指向**：将函数临时挂载到目标对象上，通过对象调用函数的方式，让函数内的 `this` 指向该对象。
2. **处理参数**：接收除第一个参数（`this` 指向的对象）外的其他参数，作为函数的实参。
3. **兼容特殊情况**：若第一个参数为 `null/undefined`，`this` 指向全局对象（浏览器为 `window`，Node 为 `globalThis`）；若为基本类型（如 `number`、`string`），需转为对应包装对象。
4. **避免污染原对象**：使用临时属性挂载函数，调用后删除该属性。

```js
Function.prototype.myCall = function (thisArg, ...args) {
  // 1. 处理 thisArg 为 null/undefined 的情况，指向全局对象
  if (thisArg === null || thisArg === undefined) {
    thisArg = globalThis; // 浏览器环境是 window，Node 环境是 global
  } else {
    // 2. 基本类型转为对象（因为函数需要挂载到对象上）
    thisArg = Object(thisArg);
  }

  // 3. 创建唯一临时属性，避免覆盖原对象的属性（用 Symbol 确保唯一性）
  const tempFnKey = Symbol('tempFn');

  // 4. 将当前函数（this 指向调用 myCall 的函数）挂载到 thisArg 上
  thisArg[tempFnKey] = this;

  // 5. 调用函数，传入参数，此时函数内的 this 指向 thisArg
  const result = thisArg[tempFnKey](...args);

  // 6. 删除临时属性，避免污染原对象
  delete thisArg[tempFnKey];

  // 7. 返回函数执行结果
  return result;
};
```

测试实例：

```js
// 测试普通对象
const obj = { name: 'Alice' };
function sayHello(age) {
  console.log(`Hello, ${this.name}, age: ${age}`);
  return 'success';
}
sayHello.myCall(obj, 20); // 输出：Hello, Alice, age: 20 → 返回 'success'

// 测试 thisArg 为 null
sayHello.myCall(null, 30); // 输出：Hello, undefined, age: 30（非严格模式下 this 指向全局）

// 测试基本类型（如 number）
const num = 123;
function getThisType() {
  console.log(this.constructor); // 包装对象 Number
}
getThisType.myCall(num); // 输出：[Function: Number]
```

### 实现instanceof
