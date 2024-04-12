/** 循环时删除，如何保证数组后续遍历达到预期 ? */

const array = [1, 2, 3, 4, 5]

array.forEach((num, index) => {
    if (num == 3) {
        array.splice(index, 1)
    }
})

console.log(array)
