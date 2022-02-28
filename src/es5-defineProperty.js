/*
 * @Date: 2022-02-23 12:35:14
 * @LastEditors: jimouspeng
 * @Description: es5-Object.defineProperty
 * @LastEditTime: 2022-02-28 11:33:45
 * @FilePath: \es6\src\es5-defineProperty.js
 */
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
/** Object.defineProperty 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
 * 【应当直接在 Object 构造器对象上调用此方法，而不是在任意一个 Object 类型的实例上调】
 *  Object.defineProperty(obj, prop, descriptor)
 *    @param obj: 要定义属性的对象
 *    @param prop: 要定义或修改的属性的名称或 Symbol()
 *    @param descriptor: 要定义或修改的属性描述符
 *    @return 被传递给函数的对象
 *
 * 【descriptor】: 对象里目前存在的属性描述符有两种主要形式, 一个描述符只能是这两者其中之一；不能同时是两者。
 *
 * @数据描述符 {object} 数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的
 *   @value 默认为 undefined
 * 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）
 *   @writable 默认为 false
 * 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符 (en-US)改变
 *
 * @存取描述符 {object} 由 getter 函数和 setter 函数所描述的属性
 *   @get 默认为 undefined
 * 属性的 getter 函数，如果没有 getter，则为 undefined。
 * 当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
 * 该函数的返回值会被用作属性的值
 *   @set 默认为 undefined
 * 属性的 setter 函数，如果没有 setter，则为 undefined。
 * 当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象
 *
 * @两种描述符共享key (共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）)
 *   @configurable 默认为 false
 * 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除
 *   @enumerable 默认为 false
 * 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中
 *
 *
 * 如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。
 * 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常
 * [Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute]
 *
 */

const divObj = {
    value: '',
}
const inputObj = {}
Object.defineProperty(inputObj, 'value', {
    set: (val) => {
        console.log(val)
        divObj.value = val
        divEl.innerText = divObj.value
    },
    get: () => {
        return divObj.value
    },
})

// const divEl = document.getElementById('divEl')
// divEl.innerText = divObj.value
// const inputEl = document.getElementById('inputEl')
// inputEl.addEventListener('input', (val) => {
//     console.log(val.target.value)
//     inputObj.value = val.target.value
//     // divEl.innerText = divObj.value
// })

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {},
}

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

/** 订阅器：主要负责依赖的收集 */
class Dep {
    static target = null
    static setTarget(vm) {
        Dep.target = vm
    }
    constructor() {
        this.subList = []
    }
    addSub(sub) {
        this.subList.push(sub)
    }
    notify() {
        this.subList.forEach((sub) => {
            sub.update()
        })
    }
}

/**
 * Watcher 收到属性的变化通知并执行相应的函数，从而更新视图
 * @param {*} vm this
 * @param {*} exp 监听变化的key
 * @param {*} cb 回调函数, 更新视图
 */
function Watcher(vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()
}
Watcher.prototype = {
    update() {
        this.run()
    },
    run() {
        const value = this.vm.data[this.exp]
        const oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    },
    get() {
        Dep.target = this
        const value = this.vm.data[this.exp] // 通过触发get加入订阅
        Dep.target = null
        return value
    },
}

/** 数据监听器 Observer
 *  劫持并监听所有属性，如果有变动的，就通知订阅者
 */
function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    Object.keys(data).forEach((key) => {
        defineExecute(data, key, data[key])
    })
}
/** defineProperty执行器 */
function defineExecute(data, key, val) {
    const subscriber = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            console.log('获取Dep.target', Dep.target)
            if (Dep.target) {
                // 判断是否需要添加订阅者
                subscriber.addSub(Dep.target)
            }
            console.log(key, '属性获取', 'get: ', val)
            return val
        },
        set: (value) => {
            if (val === value) {
                return
            }
            val = value
            console.log(key, '属性加入监听: ', 'set: ', value)
            subscriber.notify() // 通知变动
        },
    })
}

/** 解析器： 对dom节点进行解析和数据绑定 */
class Compiler {
    constructor(el, vm) {
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = null
        this.init()
    }
    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el)
            this.compileElement(this.fragment)
            /** 将fragment重新插入到元素内 */
            this.el.appendChild(this.fragment)
        } else {
            console.log('Dom元素不存在')
        }
    }
    /** 扩展： #text节点
     * Text节点代表Element节点和Attribute节点的文本内容。
     * 如果一个节点只包含一段文本，那么它就有一个Text子节点，代表该节点的文本内容。
     * 通常我们使用Element节点的firstChild、nextSibling等属性获取Text节点，
     * 或者使用Document节点的createTextNode方法创造一个Text节点
     * eg: 标识#text所处的位置
     * <div> #text <span>{{name}}</span> #text <span>{{title}}</span> #text </div>
     */
    nodeToFragment(el) {
        // createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法
        let fragment = document.createDocumentFragment()
        let child = el.firstChild // firstChild 属性返回被选节点的第一个子节点
        // 下面这种方式应该比循环更好理解
        // ;[].slice.call(el.childNodes).forEach((el) => {
        //     fragment.appendChild(el)
        // })
        while (child) {
            /** 假如el中有ABCDE五个元素。
             * 这个步骤是把el中的第一个元素A赋值给child，然后将child添加到fragment中。
             * 但是这里有一点要注意，就是如果dom中有这个元素，appendChild相当于剪切的效果；
             * 翻译过来就是因为DOM中有A，所以将A剪切到fragment中，
             * 此时el中的第一个firstchild就B了。
             * 一个节点不可能同时出现在文档的不同位置。
             * 所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。
             * 若要保留已在文档中的节点，可以先使用  Node.cloneNode() 方法来为它创建一个副本，再将副本附加到目标父节点下。
             * 请注意，用 cloneNode 制作的副本不会自动保持同步
             * 以此类推，当E被剪切到fragment中后，el.firstChild就是个null了，child=el.firstChild就是false，循环终止。
             * 之后将Dom元素移入fragment中 */
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }
    compileElement(el) {
        var childNodes = el.childNodes
        var self = this
        ;[].slice.call(childNodes).forEach((node) => {
            // 解析 {{}} 模板字符串
            var reg = /\{\{(.*)\}\}/
            var text = node.textContent
            if (self.isTextNode(node) && reg.test(text)) {
                // 判断是否是符合这种形式{{}}的指令
                self.compileText(node, reg.exec(text)[1])
            }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node) // 继续递归遍历子节点
            }
        })
    }
    // exp: 将命中的{{}}的key加入监听
    compileText(node, exp) {
        var self = this
        var initText = this.vm[exp]
        self.updateText(node, initText) // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, (value) => {
            // 生成订阅器并绑定更新函数
            self.updateText(node, value)
        })
    }
    updateText(node, value) {
        /** innerText和textContent的选择
         * innerText属性值的获取会考虑CSS样式，因此读取innerText的值将触发回流以确保计算出的样式是最新的，
         * 而回流在计算上很昂贵，会降低性能，因此应尽可能避免回流。
         * 而textContent只是单纯读取文本内容，因此性能更高
         */
        node.textContent = typeof value == 'undefined' ? '' : value
    }
    isTextNode(nd) {
        return nd.nodeType == 3
    }
}

/**
 *
 * @param {*} data 数据模型
 * @param {*} el 对应的DOM节点
 * @param {*} exp 渲染用的数据
 * @returns
 */
//  function SelfVue(data, el, exp) {
//     this.data = data
//     observe(data)
//     el.innerHTML = this.data[exp] // 初始化模板数据的值
//     new Watcher(this, exp, (value) => {
//         el.innerHTML = value
//     })
//     return this
// }
function SelfVue(options) {
    this.vm = this
    this.data = options.data 
    /** 让访问selfVue的属性代理为访问selfVue.data的属性 */
    Object.keys(this.data).forEach((key) => {
        this.proxyKeys(key) // 绑定代理属性
    })
    observe(this.data)
    // el.innerHTML = this.data[exp] // 初始化模板数据的值
    new Compiler(options.el, this.vm)
    return this
}
SelfVue.prototype = {
    proxyKeys(key) {
        var self = this
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get() {
                return self.data[key]
            },
            set(newVal) {
                self.data[key] = newVal
            },
        })
    },
}

const divEl = document.getElementById('divEl')
var selfVue = new SelfVue({
    el: '#app',
    data: {
        title: 'hello world',
        name: '1212',
    },
})

window.setTimeout(function () {
    console.log('name值改变了')
    // selfVue.data.name = 'jimous'
    selfVue.name = 'jimous--------'
    console.log(selfVue)
}, 2000)
