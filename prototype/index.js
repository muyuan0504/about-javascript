function animal(name) {
    this.class = '动物';
    this.name = name;
}
animal.prototype.getName = function () {
    return this.name;
};

animal.prototype.isAnimal = true;

const dog = new animal('dog');
const cat = new animal('cat');
dog.name = '旺财';
cat.isAnimal = false;

console.log(dog instanceof Function, '1'.constructor);

// console.log(dog.getName(), cat.getName(), dog.isAnimal, cat.isAnimal);

// console.log(dog.__proto__ === animal.prototype);
// console.log(animal.prototype.constructor === animal);

// console.log(dog.__proto__.constructor === animal);
// console.log(dog.__proto__.__proto__.constructor === Function);

// console.log(animal.__proto__.__proto__.__proto__);
// console.log(animal.__proto__ === Function.prototype);