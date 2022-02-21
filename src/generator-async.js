/*
 * @Date: 2022-02-18 11:45:18
 * @LastEditors: jimouspeng
 * @Description: ES6-generator生成器了解async原理
 * @LastEditTime: 2022-02-21 11:46:39
 * @FilePath: \es6\src\generator-async.js
 */

/** 执行生成器不会执行生成器函数体的代码，只是获得一个遍历器
 * 一旦调用 next，函数体就开始执行，一旦遇到 yield 就返回执行结果，暂停执行
 * 第二次 next 的参数会作为第一次 yield 的结果传递给函数体，以此类推，所以第一次 next 调用的参数没用 */

function* B() {
    const a = yield 4
    console.log(a, 'a00000')
    const b = yield 5
    return [a, b]
    yield 222
}
const b = B()
const bA = b.next(2222222).value
// console.log(b.next(bA)) // 让yeild表达式在求值后取得这个值，并赋值给a
const baa = b.next(bA).value
console.log(b.next(baa))
// console.log(b.next())

function* A() {
    const a = yield 555
    const b = yield 666
    console.log(a, '打印a')
    console.log(b, '打印b')
    return [a, b]
}

let a5 = A()
let a6 = A()
console.log(a5 === a6) // false
const aValue = a5.next().value // 进入第一个yeild表达式
console.log(aValue, 'a----------')
// a5.next(value)就能让对应的yield表达式在求值后取得这个值(value),然后执行流会到达第二条yield语句
const bValue = a5.next(aValue).value // 进入下一个yeild表达式
console.log(bValue, 'b-------')
console.log(a5.next(bValue).value) // [555, 666]
// console.log(a5.next())
// console.log(a5.next())

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
                console.log(execute.value, 'dayinkankan')
                resolve(execute.value)
                return
            }
            /** next.value()是一个promise */
            Promise.resolve(next.value).then((res) => {
                console.log(res, 'kankan res')
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
    // console.log(r1, '打印r1_----------------')
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
            // console.log(next, '----------')
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
    // console.log(res, '打印结果')
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
