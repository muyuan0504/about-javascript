/*
 * @Date: 2022-02-16 10:00:12
 * @LastEditors: jimouspeng
 * @Description: ES6-Proxy代理
 * @LastEditTime: 2022-02-16 12:56:07
 * @FilePath: \es6\src\proxy.js
 */
"use strict";
console.log('proxy----------------------------------------------------------------------------------------start')

/**封装代理函数,可以配置禁止访问的属性规则，如_ */
function proxied(target, flag = '_') {
    /**handler为proxy对象添加的捕获器 */
    const handler = {
        /**定义一个handler.get捕获器, 可以通过该捕获器打印每次从target对象取得的值
         * 也可以通过该捕获器转换任意属性的值，然后再将转换结果返回给回访者
         */
        get(target, key) {
            console.log('get on property:', key)
            // 借助代理并定义明确的规则来禁止访问target对象的某些属性，对外只暴露代理而不暴露target对象。
            if (key.startsWith('_')) {
                throw new Error('property is inaccessible')
            }
            /**
             * 作为代理的补充，ES6引入了一个内置的Reflect对象。
             * es6代理的捕获器会一一地映射到Reflect对象的API。即每个捕获器在Reflect上都有一个对应的反射方法。
             */
            return Reflect.get(target, key)
            // return target[key]
            // return 'hahah'
        },
        /**set捕获器可以拦截属性赋值 */
        set(target, key, value) {
            if (key.startsWith('_')) {
                throw new Error('不允许赋值_开头属性---------')
            }
            return Reflect.set(target, key, value)
        },
        /** 使用.has捕获器对in操作符隐藏任务属性
         *  但是has捕获器无法阻止Object通过.hasOwnProperty在私有空间找到属性（可以通过getOwnPropertyDescriptor捕获器）
         */
        has(target, key) {
            if (key.startsWith('_')) {
                return false
            }
            return Reflect.has(target, key)
        },
        /** deleteProperty捕获器： 可以用来阻止删除操作 */
        deleteProperty(target, key) {
            if (key.startsWith('_')) {
                throw new Error('不允许删除私有属性')
            }
            return Reflect.deleteProperty(target, key)
        },
        /** defineProperty捕获器: 用于拦截要定义的属性
         * 既可以拦截声明式定义，如 obj1.a = 1;
         * 也可以拦截API调用，Object.defineProperty(obj1, a, {value: 1})
         * descriptor: 描述符
         */
        defineProperty(target, key, descriptor) {
            // 返回false, 属性的声明在严格模式下会导致抛出异常，非严格模式下则会静默失败。
            // 严格模式以其严格的语义确保了优异的性能，要比非严格模式好.
            // 所以严格模式也是ES6的默认模式
            return false
        },
    }
    return new Proxy(target, handler)
}

const target = {
    _jimous: 'jimous is cool',
    cool: 'jimous also cool',
}
const proxy1 = proxied(target)
/**通过给proxy赋值exposed, 可以将该值传递给targt */
proxy1.exposed = true
proxy1.jimous = 'jimous'
try {
    proxy1._test = '1212'
} catch (err) {
    console.log(err, '赋值捕获错误')
}
/** deleteProperty捕获器：可以通过proxy对象用delete操作符删除该属性 */
delete proxy1.cool
try {
    delete proxy1._jimous
} catch (err) {
    console.log(err)
}
console.log(proxy1, proxy1.cool) // undefined
console.log(target.exposed, target.jimous, target._jimous, '打印target属性') // true, jimous, jimous is cool（删除私有属性失败）
console.log(proxy1.jimous, proxy1.somethingElse) // jimous, undefined (触发handler.get)
try {
    // console.log(proxy1._test)
    console.log('_jimous' in proxy1) // false
    console.log(proxy1.hasOwnProperty('_jimous')) // true
} catch (err) {
    console.log(err)
}

/**可撤销代理
 * 不使用new 关键字
 * 返回的是一个{proxy, revoke}对象，而不仅仅是proxy对象.
 * 调用revoke后，任何操作都会导致proxy抛出错误
 */
let handler = {}
const { proxy, revoke } = Proxy.revocable(target, handler)
console.log(proxy, revoke)
proxy.isUsable = true
console.log(proxy.isUsable) // true
// 通过revoke可以完全收回使用者访问代理的权限
revoke()
try {
    console.log(proxy.isUsable)
} catch (err) {
    console.log(err) // Cannot perform 'get' on a proxy that has been revoked
}
// 可撤销代理实践
const proxies = new WeakMap()
const storage = {}
function getStorage() {
    const handler = {}
    const { proxy, revoke } = Proxy.revocable(storage, handler)
    proxies.set(proxy, { revoke })
    return proxy
}
// 考虑到revoke和handler捕获器在同一个作用域中，可以指定严厉的访问规则，
// 比如要是使用者企图多次访问某个私有属性，则立即撤销其对proxy的访问权
function revokeStorage() {
    proxies.get(proxy).revoke()
    proxies.delete(proxy)
}

/** 了解Object.defineProperty
 * Object.getOwnPropertyDescriptor: 获取属性描述符 configurable enumerable value writable
 */
const pizza = {}
pizza.topping = 'ham'
Object.defineProperty(pizza, 'extraCheese', { value: true })
console.log(pizza, Object.getOwnPropertyDescriptor(pizza, 'topping'), Object.getOwnPropertyDescriptor(pizza, 'extraCheese'))

console.log('proxy----------------------------------------------------------------------------------------end')
