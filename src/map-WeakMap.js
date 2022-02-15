/*
 * @Date: 2022-02-15 16:35:15
 * @LastEditors: jimouspeng
 * @Description: ES6-Map对象
 * @LastEditTime: 2022-02-15 17:35:27
 * @FilePath: \es6\src\map-WeakMap.js
 */
const map = new Map()
map.set('1', 2)
map.set('2', 2)
map.set('3', {
    name: 'jimous',
})
/**key是唯一的,同一个key重复复制会进行覆盖操作 */
map.set('1', '66')
/** map.size 类似array.length */
console.log(map, map.size)
/** map.has(key) 查询map是否包含该key */
console.log(map.has('1'), map.has('2'), map.has('jimous')) // true true false
let getKey = '3'
/** map.get(key) 从map中获取对应的key, 如果没有则返回undefined */
console.log(map.get(getKey), map.get('4')) // { name: 'jimous' }, undefined
/** map.delete(key) 从map中删除对应的key */
map.delete('2')
console.log(map) // { '1' => 2, '3' => {name: 'jimous'} }
/** map.clear() 清空整个map,但是不会丢失对Map的引用 */
// map.clear()
// console.log(map, map.has('1')) // 空map对象, false

/**使用Symbol作为key */
map.set(Symbol('items'), 'haha')
console.log(map, map.get(Symbol('items'))) // undefined
console.log(Symbol('items') == Symbol('items')) // false
const symbolKey = Symbol('item')
map.set(symbolKey, 'jimous cool')
console.log(map, map.get(symbolKey))

/**使用NaN作为key, NaN虽然不等于自身，但是作为map的key,NaN始终代表一个常量 */
map.set(NaN, 'nan is nan')
map.set(NaN, 'nan also is nan')
console.log(map, 'NaN', NaN === NaN) // map对象, false

/** Map与迭代器 */
map.forEach((el) => {
    console.log(el, '遍历map')
})
for (const item of map) {
    console.log(item, 'for...in, 拿到数组')
}
// for (const [key, value] of map) {
//     console.log('key:', key, 'value:', value, 'for...in 拿到key,value')
// }
console.log(...map, '展开map', [...map])
const keyList = Object.keys(map)
// keyList[3]是用Symbol()创建的key,由于符号类型的特性，for..in, object.keys, object.getOwnPropertyNames均无法获取符号类型的属性名
// 并且，符号属性也不会出现在对象JSON字符串化的结果中
console.log(keyList, '打印map.keys()', keyList[3]) // keyList[3]=undefined
/**扩展： Symbol */
const symbolKey2 = Symbol('jimous-symbol')
console.log(symbolKey2, '---------')
const symbolObj = {
    a: 1,
    [symbolKey2]: 'jimous---',
}
console.log(JSON.stringify(symbolObj), '序列化')
console.log(Object.keys(symbolObj), '获取symbol') // 只能打印 ['a']
// 只能通过getOwnPropertySymbols获取给定对象中所有用作属性名的符号值
const symbolKeyList = Object.getOwnPropertySymbols(symbolObj) // 可以获取symbol值
console.log(symbolKeyList, '获取symbok-key', symbolObj[symbolKeyList[0]])

/** Map对象复制操作 */
const jimousMap = new Map(map)
// map.clear()
/** new Map(map), 复制map, 同时map.clear()不会影响新map对象 */
console.log(jimousMap, 'jimousMAP', map)

/**Map与WeakMap
 * WeakMap对比Map更简洁
 * WeakMap没有迭代器协议,所以用WeakMap创建的集合不可迭代
 * WeakMap中key的引用是弱保持的，如果其key的对象除了弱引用外没有其他的引用，那么该对象会被垃圾回收清除
 */
