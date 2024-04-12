/** 循环时删除，如何保证数组后续遍历达到预期 ?
 *  如果循环时增加呢？
 */

const array = [0, 1, 2, 3, 4, 5, 6]

// forEach 循环删除时，会立即生效，后续遍历项的下标同步刷新
// array.forEach((num, index) => {
//     if (index == 3) {
//         array.splice(index, 1)
//     }
//     console.log(index, num) // 当前循环内还是 array[3] = 3, 因为打印的是当前函数接收的参数
// })

// 这里要注意的是，如果需要在遍历过程中动态删除元素，要考虑数组len末位下标最后为undefined的情况，尤其是使用了提前声明的length
// const len = array.length
// for (let i = 0; i < array.length; i++) {
//     if (i == 3) {
//         array.splice(i, 1)
//     }
//     console.log(i, array[i]) // 这里在当前循环中 array[3] == 4
// }

/** 循环时增加场景 */
// array.forEach((num, index) => {
//     if (index == 3) {
//         // 新增元素会不会被打印取决于插入的位置，index+1开始的打印下标会输出插入元素后的新数组对应index+1开始的下标的值，也就意味着，之前的最后一位元素不会被打印
//         // 因为forEach的内部实现上，也是一开始就定义了数组的长度作为遍历的边界判断
//         array.splice(index + 1, 0, num * 10)
//     }
//     console.log(index, num) // num 输出的值是 0 1 2 3 30 4 5 -> 末节点 6 因为前面有新增元素下标超出了既定循环最大下标(forEach内部一开始获取的原始数组的length定义的最大下标)，所以不会被输出
// })

const len = array.length
for (let i = 0; i < array.length; i++) {
    if (i == 3) {
        array.splice(i + 1, 0, array[i] * 10)
    }
    console.log(i, array[i]) // array[i] 输出的值是 0 1 2 3 30 4 5 6  由于 array.length 是动态获取的，所以每一项都会被遍历到
}

console.log(array)
