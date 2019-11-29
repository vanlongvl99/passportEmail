localStorage = require('localStorage');

localStorage.setItem('name', 'long');

console.log(localStorage.getItem('name'));
localStorage.removeItem('name');
console.log(localStorage.getItem('name'))
// sessionStorage.setItem('age', '18')
// console.log(sessionStorage.getItem('age'))
// document.cookie = 'name=abc'