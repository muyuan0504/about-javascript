/*
 * @Date: 2022-02-21 16:41:12
 * @LastEditors: jimouspeng
 * @Description: 异步迭代器与异步生成器
 * @LastEditTime: 2022-02-21 18:07:49
 * @FilePath: \es6\src\iterator-async.js
 */
// 异步迭代器的协议稍有不同：next返回一个Promise,这个Promise解决后会返回包含value和done属性的对象。
// ES6引入了Symbol.asyncIterator，专门用于声明异步迭代器.

const sequence = {
    [Symbol.asyncIterator]() {
        const items = [1, 2, 3, 4, 5, 6]
        return {
            next() {
                return Promise.resolve({
                    done: items.length === 0,
                    value: items.shift(),
                })
            },
        }
    },
}

/** 注意：
 * 只能在异步函数中使用for await...of语句
 */
async function print() {
    for await (const i of sequence) {
        console.log(i, '打印i')
    }
}
print()
;(async () => {
    for await (let value of sequence) {
        // (4)
        console.log(value) // 1,2,3,4,5
    }
})()

/** 异步生成器
 * 支持await和for await...of声明.
 */

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    })
}

async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        // 哇，可以使用 await 了！
        await new Promise((resolve) => setTimeout(() => {
            resolve(666)
        }, 1000))
        yield i
    }
}

;(async () => {
    let generator = generateSequence(1, 5)
    // for await (let value of generator) {
    //     console.log(value, '异步生成器') // 1，然后 2，然后 3，然后 4，然后 5（在每个 console 之间有延迟）
    // }
    console.log(await generator.next())
    console.log(await generator.next())
    console.log(await generator.next())
    console.log(await generator.next())
    console.log(await generator.next())
    console.log(await generator.next())
})()
