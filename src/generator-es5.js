/*
 * @Date: 2022-02-21 16:26:03
 * @LastEditors: jimouspeng
 * @Description: 生成器与es5 ———— @babel/plugin-transform-regenerator
 * @LastEditTime: 2022-02-21 16:28:09
 * @FilePath: \es6\src\generator-es5.js
 */
function* a() {
    yield 1
}

/** ES5 https://babeljs.io/docs/en/babel-plugin-transform-regenerator */
var _marked = [a].map(regeneratorRuntime.mark)

function a() {
    return regeneratorRuntime.wrap(
        function a$(_context) {
            while (1) {
                switch ((_context.prev = _context.next)) {
                    case 0:
                        _context.next = 2
                        return 1

                    case 2:
                    case 'end':
                        return _context.stop()
                }
            }
        },
        _marked[0],
        this
    )
}
