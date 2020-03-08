# NodeJS的模块规范

Node使用的是CommonJS模块规范，一个文件就相当于一个模块，它使用**require**、**module.exports**或**exports**关键字来引入，导出所写的模块，使得程序逻辑分散，易于管理和协作、维护。

##  Module模块

CommonJS基于Node的内置模块Module实现

### 模块的查找

- 在终端中执行 形如`node xxx.js`时 这个js就会成为主模块，那么在文件中 运行`require.mian=== module `就会得到true的结果，如果是`require('./xxx.js')`那么在该文件中运行的结果会是false。
- 在require一个文件模块时会在module实例上的paths上形成一个文件路径的数组，形如：

```
[ 
  '/Users/leo/Desktop/demo/node_modules',
  '/Users/leo/Desktop/node_modules',
  '/Users/leo/node_modules',
  '/Users/node_modules',
  '/node_modules'
]

```

根据传入require的参数不同查找的方式也会有所不同，如：

```
从 Y 路径运行 require(X)

1. 如果 X 是内置模块（比如 require('http'）)
a. 返回该模块。
b. 不再继续执行。

2. 如果 X 是以 '/' 开头、
   a. 设置 Y 为 '/'

3. 如果 X 是以 './' 或 '/' 或 '../' 开头
   a. 依次尝试加载文件，如果找到则不再执行
      - (Y + X)
      - (Y + X).js
      - (Y + X).json
      - (Y + X).node
   b. 依次尝试加载目录，如果找到则不再执行
      - (Y + X + package.json 中的 main 字段).js
      - (Y + X + package.json 中的 main 字段).json
      - (Y + X + package.json 中的 main 字段).node
   c. 抛出 "not found"
4. 遍历 module paths 查找，如果找到则不再执行
5. 抛出 "not found"

```





### 模块的加载

- 在一个文件中，我们没有声明 require、\___dirname、module、___filename、我们却能使用它们正是因为，在node执行模块之前会先读取文件中的内容然后把它当做字符串拼接进一个函数中执行再返回得到结果。形如：

```js
let fn = function(srcript) {
  return wrapper[0] + script + wrapper[1];
}
//模块中的参数可直接使用的原因
const wrapper = ['(function (exports, require, module, __filename, __dirname) { ',
  '\n});'];
```

于是我们就能够使用这些不需要引入的关键字。

- commonjs的模块加载顺序为阻塞式，执行时遇到require会进入该模块中执行该模块的逻辑，直到该模块的逻辑执行完毕，在返回到上一级继续执行下面的代码逻辑。
- 当模块第一次被require后会再require上的cache字段上储存第一次exports的结果，在遇到require相同的模块时会直接取该字段的值，并不会再进入该模块执行。
- 当遇到两个模块相互引用的时候会取require.cache上面第一次该模块exports出的结果，并不会产生无限循环的可能，也就避免了代码一些性能上的问题，如一直监听某个时间的代码被无限执行。
### module.exports 和 exports的关系

exports 是 module.exports 的一个引用，如果同时存在exports和module.exports，最终导出的是module.exports，所以尽量都使用module.exports来定义模块导出内容，否则可能产生exports上定义后，被module.exports 赋值所覆盖。

```javascript
// module.js
exports.myExports = 'myExport';
module.exports = {
  moduleExports: 'export'
}
// index.js
const m1 = require('./module.js');
console.log(m1.myExports) //undefined
console.log(m1.moduleExports) // 'export'
```