function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
const superTask = new SuperTask()
function addTask(time, name) {
    superTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`)
        })
}
let timer = 0
let globalTimer = setInterval(() => {
    timer += 1
    console.log(timer)
    if (timer > 16) {
        clearInterval(globalTimer)
    }
}, 1000)
addTask(10000, 1) // 10000ms后输出 任务1完成
addTask(5000, 2) // 5000ms后输出 任务2完成
addTask(3000, 3) // 8000ms后输出 任务3完成
addTask(4000, 4) // 11000ms后输出 任务4完成
addTask(5000, 5) // 15000ms后输出 任务5完成

new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, 1000)
})

class SuperTask {
    constructor() {
        this.taskList = [] // 任务队列
        this.excuteNum = 0 // 当前执行任务数
        this.taskExcuteMax = 2 // 最大任务调度数
        this.excuteItv = null
        this.run() // 初始化时执行一次调度器
    }
    /**
     * @param: 返回值为promise的函数
     * @return 返回promise
     */
    add(promiseCallback) {
        return new Promise((resolve) => {
            this.taskList.push({
                executeFn: promiseCallback,
                resolveFn: resolve,
            })
        })
    }
    run() {
        this.excuteItv = setInterval(() => {
            if (this.taskList && this.excuteNum < this.taskExcuteMax) {
                const executeTask = this.taskList.shift()
                this.excuteNum++
                executeTask.executeFn().then(() => {
                    executeTask.resolveFn()
                    this.excuteNum--
                })
            }
            if (this.taskList.length === 0) {
                clearInterval(this.excuteItv)
            }
        }, 0)
    }
}


whileRun() {
    while (this.taskList.length && this.excuteNum < this.taskExcuteMax) {
        const executeTask = this.taskList.shift()
        this.excuteNum++
        executeTask.executeFn().then(() => {
            executeTask.resolveFn()
            this.excuteNum--
        })
    }
}