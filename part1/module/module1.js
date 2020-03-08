
exports.a = '123'

const m2 = require('./module2');
exports.b = '456'
// step 1
let num = 1;
function increment() {
  return ++num;
}
// exports 是 module.exports 的一个引用，最终导出的是module.exports，所以尽量都使用module.exports来定义导出内容，
//否则可能产生exports上定义后，被module.exports 赋值覆盖

module.exports = {
  num,
  increment,
}
console.log('a 模块结束');
