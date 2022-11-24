/*
 * @Author: jimouspeng
 * @Date: 2022-03-30 10:57:43
 * @Description: es6-ArrayBuffer
 * ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。
 * 这些对象早就存在，属于独立的规格（2011 年 2 月发布），ES6 将它们纳入了 ECMAScript 规格，并且增加了新的方法。
 * 它们都是以数组的语法处理二进制数据，所以统称为二进制数组(二进制数组并不是真正的数组，而是类似数组的对象)
 *
 * 这个接口的原始设计目的，与 WebGL 项目有关。
 * 所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。
 * 文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。
 * 这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。二进制数组就是在这种背景下诞生的。
 * 它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信
 *
 * 二进制数组由三类对象组成
 * [ArrayBuffer对象]：
 * 代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存
 * [TypedArray视图]：
 * 数组成员都是同一个数据类型
 * 共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等
 * 普通数组的操作方法和属性，对 TypedArray 数组完全适用,TypedArray 数组没有concat方法
 * [DataView视图]：
 * 数组成员可以是不同的数据类型
 * 可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序
 *
 * 即ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据
 *
 * 很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个：
 * Canvas， Fetch API， File API， WebSockets， XMLHttpRequest
 *
 * @FilePath: \es6\src\arraybuffer.js
 */

const oneBuf = new ArrayBuffer(12); // 生成了一段 32 字节的内存区域，每个字节的值默认都是 0
console.log(oneBuf);

/** DataView视图的创建，需要提供ArrayBuffer对象实例作为参数 */
const dataView = new DataView(oneBuf);
console.log(dataView.getUint8(0)); // 打印0,  以不带符号的 8 位整数格式，从头读取 8 位二进制数据

/**
 * TypedArray视图，与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式
 * TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值
 * ArrayBuffer.prototype.byteLength -> 返回所分配的内存区域的字节长度
 * ArrayBuffer.prototype.slice() -> 允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象,
 * 除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写
 * ArrayBuffer.isView() -> 返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例
 * 
 * 
 */
const x1 = new Int32Array(oneBuf); // 32 位带符号整数（Int32Array构造函数）
x1[0] = 1;
const x2 = new Uint8Array(oneBuf); //  8 位不带符号整数（Uint8Array构造函数）
x2[0] = 2;
console.log(x1[0], x2[0]); // 2, 2

const newTypedArray = new Int32Array([1, 2, 3]);
console.log(newTypedArray, newTypedArray.length, newTypedArray[4], newTypedArray.byteLength);


