console.log('main 模块 开始')
const m1 = require('./module1')
const m2 = require('./module2')
//require结束后 执行
// 修改模块内的原始值,不影响导出的原始值 与ESM不同
console.log(m1.increment()); // 2
console.log(m1.num === m1.increment()) //false
// m1 上 exports的值被 module.exports覆盖
console.log(m1.a) //undefined
console.log(m1.b)//undefined
console.log(m2.c) // 统一使用exports导出 未被覆盖
console.log('main 结束')

//总结： 1. require模块加载时是阻塞的，当require模块内的代码执行完毕后才会执行后面的代码。
//     2. 首次require某个模块后，再遇到相同模块时直接取require.cache上的缓存值，避免循环引用。
//     3. exports 是module.exports 的引用，最终导出module.exports ，当module.exports被赋值时 exports的赋值会消失