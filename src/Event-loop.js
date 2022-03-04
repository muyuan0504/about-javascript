/*
 * @Date: 2022-03-01 11:21:33
 * @LastEditors: jimouspeng
 * @Description: JS事件循环:  微任务 > 宏任务; 整个js代码执行上下文可以看做是一个宏任务
 * @LastEditTime: 2022-03-04 10:34:59
 * @FilePath: \es6\src\Event-loop.js
 */
console.log(1)

setTimeout(() => {

    console.log(2)


    Promise.resolve(6).then((res) => {
        console.log(res)
    })


}, 0)


Promise.resolve(3)
    .then((res) => {
        console.log(res) // 3


        setTimeout(() => {
            console.log(4)
        }, 0)

        
    })
    .then((res) => {

        console.log(res)
        
    })
console.log(5)

// 打印顺序： 1, 5, 3, undefined, 2, 6, 4
