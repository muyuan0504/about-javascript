let a = 'javascript';
let b = new String('javascript');
a = a.charAt(1);
console.log(a, b, b.valueOf());

console.log(a, a.__proto__ === String.prototype, a.constructor === String);
a.b = 'b';

console.log(a.b, b.toString());
