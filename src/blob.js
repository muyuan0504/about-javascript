/*
 * @Author: jimouspeng
 * @Date: 2022-03-30 11:28:37
 * @Description: blob， file
 * blob: Blob 对象表示一个不可变、原始数据的类文件对象,它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作
 * File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件
 * @FilePath: \es6\src\blob.js
 */

const inputEl = document.getElementById('uploadInput');
inputEl.addEventListener('change', (event) => {
    const file = event.target.files;
    const fls = file[0];
    console.log(file, '看看', typeof file, file[0].type, fls.name, fls.webkitRelativePath);
    const blob = new Blob(file, { type: 'MIME' });
    /**
     * URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
     * 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
     */
    const url = URL.createObjectURL(blob);
    setImgUrl(url);
    const halfBlob = blob.slice(0, 20 * 1024, 'MIME');
    halfBlob.text().then((data) => {
        // console.log(data, '看看');
    });
    console.log('blob: ', blob, halfBlob);

    var reader = new FileReader();
    reader.addEventListener('loadend', function (data) {
        // reader.result 包含被转化为类型数组 typed array 的 blob
        console.log(reader.result, '数据blob读取');
        setImgUrl(reader.result);
    });
    reader.readAsDataURL(blob);
});

function setImgUrl(
    url = 'https://img1.baidu.com/it/u=4020015307,4170910140&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=312'
) {
    const imgEl = document.getElementById('imgEl');
    imgEl.addEventListener('load', (data) => {
        /**
         * URL.revokeObjectURL() 静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
         * 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了
         */
        URL.revokeObjectURL(url);
        console.log('加载完毕了', data, url);
    });
    console.log(imgEl);
    imgEl.setAttribute('src', url);
    imgEl.setAttribute('style', 'width: 600px');
}
