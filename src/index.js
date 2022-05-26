// function getUserInfo({ name = 'jimous', age = 12 } = {}) {
//     console.log(name, age);
// }

// getUserInfo();

// const { name, age = 12 } = {};
// console.log(name, age);

const originObj = {
    name: 'jimous',
    age: 25,
    schoolInfo: {
        // name: 'ncu',
        city: 'nanchang',
    },
};

const {
    name,
    schoolInfo: { city: schoolCity, style = '211', name: schoolName = 'ncu' },
} = originObj;
console.log('name: ', name);
console.log('city: ', schoolCity);
console.log('style: ', style);
console.log('schoolName: ', schoolName);
