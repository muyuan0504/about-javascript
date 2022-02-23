/*
 * @Date: 2022-02-23 12:35:14
 * @LastEditors: jimouspeng
 * @Description: es5-Object.defineProperty
 * @LastEditTime: 2022-02-23 18:26:17
 * @FilePath: \es6\src\es5-defineProperty.js
 */
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
/** Object.defineProperty 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
 * 【应当直接在 Object 构造器对象上调用此方法，而不是在任意一个 Object 类型的实例上调】
 *  Object.defineProperty(obj, prop, descriptor)
 *    @param obj: 要定义属性的对象
 *    @param prop: 要定义或修改的属性的名称或 Symbol()
 *    @param descriptor: 要定义或修改的属性描述符
 *    @return 被传递给函数的对象
 * 
 * 【descriptor】: 对象里目前存在的属性描述符有两种主要形式
 * @数据描述符 数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的
 * @存取描述符 由 getter 函数和 setter 函数所描述的属性
 * 
 */
const initData = {}
Object.defineProperty(initData, 'inputData', {
    set: (val) => {
        console.log(val, 'set-------')
        this.value = val
    },
    get: (val) => {
        console.log(val, 'get--------')
        this.value = ''
        return this.value
    },
})
console.log(initData.inputData, 'initData----')
const divEl = document.getElementById('divEl')
const inputEl = document.getElementById('inputEl')
inputEl.addEventListener('input', (val) => {
    console.log(val.target.value)
})

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {},
}
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        console.log('触发get', sourceKey, this[sourceKey])
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
const a = { c: 1, _a: { c: 1 } }

proxy(a, '_a', 'c')

a.c = 3
a.c = 4
console.log(a)
