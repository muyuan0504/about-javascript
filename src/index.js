// function getUserInfo({ name = 'jimous', age = 12 } = {}) {
//     console.log(name, age);
// }

// getUserInfo();

const { name, age = 12 } = {};
console.log(name, age);
