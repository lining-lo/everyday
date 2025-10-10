/**
 * 实现new的功能
 * 1.创建一个对象
 * 2.可以调用这个对象的属性
 * 3.可以调用这个属性的方法
 */

//============ new的基本使用 ==================
// 1. 定义一个构造函数（用来创建特定类型的对象）
function Person(name, age) {
    this.name = name; // this指向即将创建的实例
    this.age = age;
    // return {
    //     message: "我覆盖了默认实例"
    // };
}
// 给构造函数的原型加方法（所有实例共享）
Person.prototype.sayHi = function () {
    console.log(`Hi, ${this.name}`);
};

// 2. 用原生new创建实例
const person1 = new Person("小明", 20);
console.log(person1.name); // 输出"小明"（实例有了name属性）
person1.sayHi(); // 输出"Hi, 小明"（实例能调用原型上的方法）
console.log('=====================================');

/** 
 * 手写实现 new
 *  核心：new Persion('小明',20) ===> myNew(Person, "小红", 18) 
 * 思路：
 *  1、判断传入的 fn 是否为 function
 *  2、创建一个空对象
 *  3、将这个空对象的原型设置为构造函数的 prototype 属性。
 *  4、使用 apply 执行构造函数 并传入参数 arguments 获取函数的返回值
 *  5、判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
 */
function myNew(constructor, ...args) {
    // 1. 校验：确保第一个参数是构造函数（防止误传普通函数/非函数）
    if (typeof constructor !== "function") {
        throw new Error("第一个参数必须是构造函数");
    }

    // 2. 创建空对象，并让它关联构造函数的原型（实现原型继承）
    const obj = Object.create(constructor.prototype);
    // （Object.create的作用：创建空对象，且空对象的__proto__指向传入的参数）

    // 3. 执行构造函数，把this绑定到obj上，传入参数args
    const result = constructor.apply(obj, args);
    // （apply的作用：改变函数this指向，这里让constructor的this=obj，再传args参数）

    // 4. 处理返回值：如果构造函数返回引用类型，就用它；否则返回obj
    return typeof result === "object" && result !== null ? result : obj;
}

// 用myNew创建实例，和原生new用法几乎一样（只是多了个myNew调用）
const person2 = myNew(Person, "小红", 18);

// 验证1：实例是否有name/age属性
console.log(person2.name); // 输出"小红"（正确，说明构造函数执行时this绑定成功）
console.log(person2.age); // 输出18（正确）

// 验证2：实例是否能继承原型上的方法
person2.sayHi(); // 输出"Hi, 小红"（正确，说明原型关联成功）

// 验证3：实例的__proto__是否指向Person.prototype
console.log(person2.__proto__ === Person.prototype); // 输出true（正确）