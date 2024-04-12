/** this 指向问题 */

/** 逗号运算符变更this指向, 此时 this 指向全局对象 */
var name = '111'
const userInfo = {
    age: 1,
    name: 'jimous',
    getName() {
        console.log('获取名字', this.name)
    },
}
function getName() {
    console.log('获取名字', this.name)
}
const getusername = getName.bind(userInfo)
getusername()            // 获取名字 jimous
;(0, getusername)()      // 获取名字 jimous
userInfo.getName()       // 获取名字 jimous
;(0, userInfo.getName)() // 获取名字 111 -> 相当于先取出 userInfo.getName 属性，然后通过 this 调用
;(0, userInfo.getName)()