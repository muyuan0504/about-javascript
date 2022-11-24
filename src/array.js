const listA = [
    { a: 1, b: 2 },
    { a: 3, b: 4 },
];

const listB = listA.slice(0, 1);

console.log(listB);

listB[0].a = 5;  // listA[0].a 也更新为 5
console.log(listA, listB);

