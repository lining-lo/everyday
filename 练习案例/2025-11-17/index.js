/**
 * 用栈实现队列
 */
// function myQueue() {
//     this.inStack = []
//     this.outStack = []
// }

// myQueue.prototype.push = function (x) {
//     this.inStack.push(x)
// }

// myQueue.prototype.pop = function () {
//     if (this.outStack.length === 0) {
//         while (this.inStack.length > 0) {
//             this.outStack.push(this.inStack.pop())
//         }
//     }
//     return this.outStack.pop()
// }

// myQueue.prototype.peek = function(){
//     if (this.outStack.length === 0) {
//         while (this.inStack.length > 0) {
//             this.outStack.push(this.inStack.pop())
//         }
//     }
//     return this.outStack[this.outStack.length -1]
// }

// myQueue.prototype.empty = function(){
//     return this.inStack.length === 0 && this.outStack.length === 0
// } 

/**
 * 用队列实现栈
 */
// function MyStack() {
//     this.queue1 = []
//     this.queue2 = []
// };

/** 
 * @param {number} x
 * @return {void}
 */
// MyStack.prototype.push = function(x) {
//     this.queue1.push(x)
// };

/**
 * @return {number}
 */
// MyStack.prototype.pop = function() {
//     if (this.queue2.length === 0) {
//         while(this.queue1.length > 1){
//             this.queue2.push(this.queue1.shift())
//         }
//     }
//     const topElement = this.queue1.shift()
//     [this.queue1,this.queue2] = [this.queue2,this.queue1]
//     return topElement
// };

/**
 * @return {number}
 */
// MyStack.prototype.top = function() {
//     if (this.queue2.length === 0) {
//         while(this.queue1.length > 1){
//             this.queue2.push(this.queue1.shift())
//         }
//     }
//     const topElement = this.queue1[0]
//     this.queue2.push(this.queue1.shift())
//     [this.queue1,this.queue2] = [this.queue2,this.queue1]
//     return topElement
// };

/**
 * @return {boolean}
 */
// MyStack.prototype.empty = function() {
//     return this.queue1.length === 0&& this.queue2.length === 0
// };

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/**
 * 手写Promise.all
 */
Promise.myAll = function (promises) {
    let result = []
    let finish = 0
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((value) => {
                result[index] = value
                finish++
                if (result.length === finish) {
                    resolve(result)
                }
            }).catch(error => {
                reject(error)
            })
        });
    })
}