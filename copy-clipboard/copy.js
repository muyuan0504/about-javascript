const inputEl = document.getElementsByTagName('input')[0]
function readCopyText() {
    // Clipboard.readText(): 解析系统剪贴板的文本内容
    return new Promise((resolve) => {
        navigator.clipboard
            .readText()
            .then((res) => {
                inputEl.setAttribute('value', res)
                resolve(res)
            })
            .catch(() => {
                resolve('')
            })
    })
}
function copyText() {
    // Clipboard.writeText(): 写入特定字符串到操作系统的剪切板
    return new Promise((resolve) => {
        const text = inputEl.value
        navigator.clipboard
            .writeText(text)
            .then((res) => {
                resolve(res)
            })
            .catch(() => resolve(''))
    })
}
/** 需要权限校验：提前获取 "Permissions API" 的 "clipboard-write" 权限
 *  Clipboard.write(): 写入图片等任意的数据到剪贴板
 *  Clipboard.read():  读取剪贴板内容,如果不是纯文本，会报错
 */
function authCheck() {
    return new Promise((resolve) => {
        navigator.permissions
            .query({ name: 'clipboard-read' })
            .then((result) => {
                if (result.state == 'granted' || result.state == 'prompt') {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch(() => {
                return false
            })
    })
}
function copyImg() {
    return new Promise(async (resolve) => {
        const authResult = await authCheck()
        if (authResult) {
            // 如果读取的非文本资源，报错：MException: No valid data on clipboard.
            const clipboardItems = await navigator.clipboard.read()
            for (let i = 0; i < clipboardItems.length; i++) {
                const clipboardItem = clipboardItems[i]
                const types = clipboardItem.types
                for (let j = 0; j < types.length; j++) {
                    const type = types[j]
                    if (type === 'text/plain' || type === 'text/html') {
                        /** 文本节点处理 */
                        const contentBlob = await clipboardItem.getType(type)
                        const text = await contentBlob.text()
                        resolve(text)
                        return
                    }
                }
            }
            resolve('')
        }
    })
}
function setClipboardData() {
    return new Promise(async (resolve) => {
        const authResult = await authCheck()
        if (authResult) {
            // ClipboardItem类型
            const item = new ClipboardItem({
                'text/plain': new Blob(['hello world'], { type: 'text/plain' }),
            })
            navigator.clipboard.write([item]).then((res) => {
                console.log('res', res)
                resolve(res)
            })

            // DataTransfer类型, 仅用于交互式复制对象
            // const transferData = new DataTransfer()
            // transferData.items.add('text/plain', '替换了数据')
            // navigator.clipboard.write(transferData).then((res) => {
            //     console.log('res', res)
            //     resolve(res)
            // })
        }
    })
}

const copyFnList = [copyText, readCopyText, copyImg, setClipboardData]
const ulList = document.querySelectorAll('ul.copy-list>li')
for (let i = 0; i < ulList.length; i++) {
    ulList[i].addEventListener('click', () => {
        const bindFn = copyFnList[i]
        bindFn().then((res) => {
            console.log(res, '??copyImg??')
        })
    })
}

// const copyEvent = new ClipboardEvent('copy')
// copyEvent.clipboardData.setData('text/plain', 'Hello, world!')
// document.dispatchEvent(copyEvent)

window.addEventListener('paste', function (event) {
    event.preventDefault()
    /** ClipboardEvent.clipboardData 属性保存了一个 DataTransfer 对象 */
    const items = event.clipboardData && event.clipboardData.items
    var file = null
    if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile() // 返回File对象
                break
            }
            if (items[i].type === 'text/html' || items[i] === 'text/plain') {
                navigator.clipboard.readText().then((res) => {
                    console.log(res, '------------') // 文本节点处理
                })
            }
        }
    }
    event.preventDefault()
})

