/*
 * @Date: 2022-02-15 17:31:49
 * @LastEditors: jimouspeng
 * @Description: ES6-set
 * @LastEditTime: 2022-02-15 18:10:18
 * @FilePath: \es6\src\set-WeakSet.js
 */
/**
 * Set可迭代，只能迭代值，不能迭代键值对
 * Set构造函数也可以接受一个可迭代对象
 * Set也有一个.size属性
 * 与Map中的key一样，Set的值可以是任意值或对象引用
 * 与Map中的key一样，Set的值必须是唯一的
 * NaN在Set中也等于NaN
 * Set同样拥有.keys, .values, .entries, .forEach, .has, .delete, .clear方法
 * Set没有键值对，只有一个维度，可以将Set视为元素彼此不同的数组(因此可以利用Set去重 Array.from(new Set([需要去重的数组])));
 * Set没有.get方法，因为只有一个维度，没有key的概念，如果要检测一个value是否在Set中，可以使用Set.has(value)
 */
console.log('es6-set----------------------------------------------------------------------------------------start')
const a = new Set()
a.add(1)
/**利用Set实现数组去重 */
console.log(Array.from(new Set([1, 2, 2, 3, 3, 1]))) // [1, 2, 3]
console.log(a)

/**WeakSet-Set
 * WeakSet只有 .add, .delete, .has方法
 * 与WeakMap一样，WeakSet也不能添加字符串或符号这样的基本值
 * WeakSet中的值必须是唯一的对象引用，如果该值没有其他引用，那么它将被垃圾回收
 */
const B = new WeakSet()
try {
    B.add('1')
} catch (err) {
    console.log(err) // Invalid value used in weak set
}
let setObj = { a: 1 }
B.add(setObj)
console.log(B.has(setObj), '打印看看Set')

console.log('es6-set----------------------------------------------------------------------------------------end')
