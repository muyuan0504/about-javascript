/*
 * @Date: 2022-02-17 14:58:56
 * @LastEditors: jimouspeng
 * @Description: es6-迭代器与生成器与async/await
 * @LastEditTime: 2022-02-22 14:56:28
 * @FilePath: \es6\src\iterator-generator.js
 */
console.log('es6-iterator----------------------------------------------------------------------------------------start')
/**
 * JS流控制机制：回调、事件、Promise、迭代器、生成器、async/await、异步函数和异步迭代器，异步生成器，外部库和列表等
 * ES6引入的新协议： 迭代器和可迭代对象
 * 这两个协议可以为任何对象定义迭代行为。
 * 迭代器的本质是懒惰的。迭代器序列中的元素每次只能取出一个
 * ES6的函数参数arguments实现了迭代器协议
 */
const caseList = ['j', 'i', 'm', 'o', 'u', 's', 'i', 's', 'cool']
/**
 * 普通对象要想转换为可迭代对象，必须遵守一个协议：给这个对象的Symbol.iterator属性赋值一个函数。
 * 如果需要这个对象可迭代，那么每次迭代都会调用赋值给Symbol.iterator的可迭代协议方法.
 *
 * Symbol.iterator: 必须返回一个对象
 * 该对象必须有一个next()方法，不接受参数，返回一个包含value(序列中的当前值)和done(Boolean,标识序列是否结束)属性的对象
 */
const sequence = {
    [Symbol.iterator]() {
        let i = 0
        return {
            next() {
                const value = caseList[i]
                i++
                const done = i > caseList.length - 1
                return { value, done }
            },
        }
    },
}
/** 可迭代对象不能利用已有的forEach, for...in进行迭代，可使用for...of, ..., Array.from(转换成数组) */
for (const item of sequence) {
    console.log(item, 'kankan')
}
console.log(...sequence)
try {
    sequence.forEach((el) => {
        console.log(el)
    })
} catch (err) {
    console.log(err) //  sequence.forEach is not a function
}

/** 迭代器应用实例-播放器列表 */

const songList = ['这世界那么多人-莫文蔚', '爱人啊-张杰', '孤勇者-陈奕迅', '原来你也在这里-刘若英']
/**
 * @param {*} songs 歌曲列表
 * @param {*} repeat 循环次数
 * @returns
 */
function getPlayList(songs, repeat) {
    return {
        [Symbol.iterator]() {
            let index = 0
            return {
                next() {
                    if (index >= songs.length) {
                        if (--repeat < 1) {
                            return { done: true }
                        }
                        index = 0
                    }
                    const song = songs[index]
                    index++
                    return { done: false, value: song }
                },
            }
        },
    }
}

/**
 * @param {*} list 歌曲列表
 */
function player(list) {
    const g = list[Symbol.iterator]()
    more()
    function more() {
        // 手动调用next()取值
        const item = g.next()
        if (item.done) {
            console.log('播放完毕，感谢收听')
            return
        }
        // 假设playSong是调用播放函数，more是播放结束的回调
        playSong(item.value, more)
    }
}

function playSong(src, callback) {
    console.log('进入播放------ ', src)
    setTimeout(() => {
        console.log(src, '播放结束')
        if (typeof callback === 'function') {
            callback()
        }
    }, 2000)
}

const newPlayList = getPlayList(songList, 3)
// console.log(...newPlayList, '打印歌单')
// player(newPlayList)

/**生成器函数与生成器对象
 * 生成器也是一种返回可迭代对象的函数，但是使用它不必显示声明Symbol.iterator方法的对象字面量
 * 生成器的定义方式是先创建一个函数，调用这个函数再返回生成器g，这个g是可迭代对象，可通过Array.from, ..., for...of使用
 * 生成器函数允许我们声明一种特殊的迭代器，这种迭代器会推迟代码的执行，同时保持自己的上下文。
 * 在生成器中看不到返回值的next方法，只能看到向序列中添加值的yield关键字
 * 每当代码执行要yield，迭代器就会返回该表达式的值，而且生成器函数会暂停执行
 * 星号*是生成器函数的标志
 * 生成器通过.throw抛出错误
 * 生成器.return(value) 会终止生成器序列的迭代
 * 【细节】
 * 迭代完生成器的整个序列后，再调用.next()不会有任何变化，只会返回{done: true, value: undefined}
 * 下面代码手动调用next()迭代之前如果执行过...扩展运算||Array.from，那么后续的.next()会返回done,因此...操作和Array.from应该是内部调用的.next()方法
 * 【算法相关】
 * 使用生成器遍历树
 * 【基于生成器实现异步I/O处理，利用.next()以及return 】
 */
function* abc() {
    try {
        yield 'a'
        // console.log('000');
    } finally {
        yield 'b'
        // console.log('111');
        // return 666 // Array.from, ..., for...of 只会拿到 'a', 'b', 不会包含return的值
        yield 'c'
        // console.log('222');
    }
}
/**  */
const chars = abc()
// console.log(chars.next())
// console.log(chars.return(12), 'return') // 正常return会直接让生成器序列迭代退出，当利用try/finally，finally块内的代码会在执行流退出函数前执行，因此当存在try/finally时，会先执行完所有的yield，具体看打印
// console.log(chars.next())
// console.log(chars.next())
// console.log(chars.next()) // done
// console.log(typeof chars[Symbol.iterator] === 'function'); // true
// console.log(typeof chars.next === 'function'); // true
// console.log(chars[Symbol.iterator]() === chars); //  true
console.log(Array.from(chars), 'chars.Array----------') // ['a', 'b', 'c']
console.log(chars.next())
// console.log(...chars, '打印迭代器') // 'a', 'b', 'c', ...执行后chars.next()只会返回done:true
for (const number of abc()) {
    console.log(number, '打印number')
}
// 手动调用next()迭代
// while (true) {
//     // chars.throw('生成器报错')
//     const item = chars.next()
//     console.log(item, '打印item')
//     if (item.done) {
//         break
//     }
// }

/** 实践： 实现一个生成无穷的斐波那契数列生成器 */
function* selfIterator() {
    let previous = 0
    let current = 1
    while (true) {
        yield current
        const next = current + previous
        previous = current
        current = next
    }
}
let testSelf = selfIterator()
console.log(testSelf.next())
console.log(testSelf.next())
console.log(testSelf.next())

/** 生成器混入可迭代对象 */
const selfIterator2 = {
    *[Symbol.iterator]() {
        let previous = 0
        let current = 1
        while (true) {
            yield current
            const next = current + previous
            previous = current
            current = next
        }
    },
}
const testSelf2 = selfIterator2[Symbol.iterator]()
console.log(testSelf2.next())
console.log(testSelf2.next())
console.log(testSelf2.next())
for (const value of selfIterator2) {
    console.log(value)
    if (value > 20) {
        // 无穷遍历防止程序奔溃
        break
    }
}

/** async/await
 * 【注意】await关键字只能用于标记为async的异步函数内部。async的原理与生成器类似，只不过是在局部上下文中挂起，直至Promise返回。
 * 如果以await修饰的表达式不是Promise, 那它会被转换为Promise.
 */
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('jimous---23333')
        }, 2000)
    })
}
async function getLastData() {
    console.log('000000')
    const data = await getData()
    console.log(data)
    console.log('111111')
}

console.log('---------')
getLastData()
console.log('+++++++++')

console.log('es6-iterator----------------------------------------------------------------------------------------end')
