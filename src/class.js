/*
 * @Date: 2022-02-21 18:24:37
 * @LastEditors: Please set LastEditors
 * @Description: ES6-class
 * @LastEditTime: 2022-04-11 16:55:44
 * @FilePath: \es6\src\class.js
 */

console.log('es6-class----------------------------------------------------------------------------------------start')

class Jimous {
    constructor(options) {
        this.name = 'jimous'
        this.description = 'cool'
        this.cloneIndex = options.key
    }
    look() {
        console.log(this.name, this.description, this.cloneIndex)
    }
}

class JimousTwo extends Jimous {
    constructor(options) {
        // console.log(this) // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor super 需要先被调用！
        super(options) // 调用父类的构造函数
        super.look() // 调用父类的look方法 jimous cool 2
        this.name = 'jimous333'
        console.log(options, '看看jimousTwo')
    }
    watch() {
        console.log(this.name, this.description, this.cloneIndex)
    }
}

const jimous1 = new Jimous({ key: 1 })
jimous1.look()
const jimous2 = new JimousTwo({ key: 2 })
jimous2.look() // jimous333 cool 2

console.log('直接调用')
Jimous.look(), // 直接调用

console.log('es6-class----------------------------------------------------------------------------------------end')
