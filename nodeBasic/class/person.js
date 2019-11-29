
// class Person {
    // constructor(id, name, age){
        // console.log('this is class of Person')
        // this.id = id
        // this.name = name
        // this.age = age
// 
    // }
    // speak(message) {
        // console.log(`I say: ${message}`)
    // }
// }
// 
// let person = new Person(1,'long',20)
// console.log(` person is ${JSON.stringify(person)}`)
// person.speak('hello')
class Person {
    constructor(id, name, yearOfBirth) {
        //Hàm khởi tạo, gọi ngay khi khởi tạo đối tượng
        console.log('This is Person\'s constructor')
        this.id = id
        this.name = name
        this.yearOfBirth = yearOfBirth
    }
    //Phương thức = function = method
    speak(message) {
        console.log(`I say : \"${message}\"`)
    }
}
let person = new Person(1,'long',20)
console.log(` person is ${JSON.stringify(person)}`)
person.speak('hello')

module.exports = Person