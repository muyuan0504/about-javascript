/*
 * @Date: 2022-02-18 11:45:18
 * @LastEditors: jimouspeng
 * @Description: ES6-generator生成器了解async原理
 * @LastEditTime: 2022-02-18 17:44:55
 * @FilePath: \es6\src\generator-async.js
 */

function* test() {
    const a = yield Promise.resolve(1)
    const b = yield 2
    const c = yield 3
    return [a, b, c]
}
function getTest1(testFn) {
    return new Promise((resolve) => {
        const g = testFn()
        step(() => g.next())

        function step(execute) {
            const next = execute()
            console.log(next, '9999999999')
            if (next.done) {
                resolve(execute.value)
                return
            }
            Promise.resolve(next.value).then((res) => {
                return step(() => g.next(res))
            })
        }
    })
}
getTest1(test)

function* generatorExecuteFn() {
    const r1 = yield new Promise((resolve) => {
        setTimeout(resolve, 5000, '5000')
    })
    console.log(r1, '打印r1_----------------')
    const r2 = yield new Promise((resolve) => {
        setTimeout(resolve, 3000, '3000')
    })
    const r3 = yield new Promise((resolve) => {
        setTimeout(resolve, 1000, '1000')
    })
    return [r1, r2, r3]
}

function generatorExecute(generatorExecuteFn) {
    // 将所有执行代码包装在一个promise中
    return new Promise((resolve) => {
        const g = generatorExecuteFn() // [r1, r2, r3]
        // 初始化运行任务
        step(() => g.next())
        function step(nextFn) {
            const next = runNext(nextFn)
            console.log(next, '----------')
            if (next.done) {
                // 成功结束，resolve当前promise
                console.log(next.value)
                resolve(next.value)
                return
            }
            // 未成功，通过Promise链式调用下一次任务
            Promise.resolve(next.value).then(
                (value) => {
                    return step(() => g.next(value))
                },
                (err) => {
                    step(() => g.throw(err))
                }
            )
        }
        function runNext(nextFn) {
            try {
                return nextFn()
            } catch (err) {
                reject(err)
            }
        }
    })
}

const res = generatorExecute(generatorExecuteFn).then((res) => {
    console.log(res, '打印结果')
})

new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve(dd)
        } catch (err) {
            reject(err)
        }
    }, 2000)
}).catch((err) => {
    // console.log(err)
})
