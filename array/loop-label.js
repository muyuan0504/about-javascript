/**
 * label标签:
 * break & continue 跳出多重循环 -> label语句：语句前面加一个标识符 + ':'
 *
 * 引申： label标签能用在for in循环吗 -> 答案是可以的，并且可以通过break结束 for in 循环
 */

outloop: for (let i = 0; i < 5; i++) {
    console.log('outloop:', i)
    for (let j = 0; j < 4; j++) {
        if (j == 2) {
            break outloop
            // continue outloop
        }
        console.log('innerloop', j)
    }
}

const list = [1, 2, 3]

inloop: for (let key in list) {
    if (list[key] > 1) {
        break inloop
    }
    console.log(key, list[key])
}
