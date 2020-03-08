const m1 = require('./module1');
console.log('a的值')
console.log(m1.a)
console.log('b的值')
console.log(m1.b)
exports.count = function(o) {
  o.a = 2;
}
exports.c = '789'
console.log('b 模块结束');