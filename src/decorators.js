/*
 * @Date: 2022-02-22 11:44:54
 * @LastEditors: jimouspeng
 * @Description: 装饰器
 * @LastEditTime: 2022-02-22 12:40:28
 * @FilePath: \es6\src\decorators.js
 */
console.log('es6-decorator----------------------------------------------------------------------------------------start')
/** js装饰器可以应用于类以及任何静态定义的属性，如对象字面量或类声明的属性。 装饰器不能作用于函数
 * 对于装饰器，可以简单地理解为是非侵入式的行为修改
 */
function testable(target) {
    target.isTestable = true
}
@testable
class MyTestableClass {
    constructor() {
        this.name = 'jimous'
    }
}

console.log(MyTestableClass.isTestable) // true

console.log('es6-decorator----------------------------------------------------------------------------------------end')
