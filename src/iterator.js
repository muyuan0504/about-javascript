/*
 * @Date: 2022-02-17 14:58:56
 * @LastEditors: jimouspeng
 * @Description: es6-迭代器与生成器
 * @LastEditTime: 2022-02-17 17:53:18
 * @FilePath: \es6\src\iterator.js
 */
console.log('es6-iterator----------------------------------------------------------------------------------------start')
/**
 * ES6引入的新协议： 迭代器和可迭代对象
 * 这两个协议可以为任何对象定义迭代行为。
 * 迭代器的本质是懒惰的。迭代器序列中的元素每次只能取出一个
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
player(newPlayList)

/**生成器函数与生成器对象
 * 生成器也是一种返回可迭代对象的函数，但是使用它不必显示声明Symbol.iterator方法的对象字面量
 * 生成器的定义方式是先创建一个函数，调用这个函数再返回生成器g，这个g是可迭代对象，可通过Array.from, ..., for...of使用
 * 生成器函数允许我们声明一种特殊的迭代器，这种迭代器会推迟代码的执行，同时保持自己的上下文。
 * 在生成器中看不到返回值的next方法，只能看到向序列中添加值的yield关键字
 * 星号*是生成器函数的标志
 */


console.log('es6-iterator----------------------------------------------------------------------------------------end')
