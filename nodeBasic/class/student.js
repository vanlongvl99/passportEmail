
const Person = require('./person')

class Student extends Person {
    constructor(id, name, yearOfBirth, fieldOfStudy) {
        super(id, name, yearOfBirth)
        console.log('This is Student\'s constructor')
        this.fieldOfStudy = fieldOfStudy
    }
}


let student = new Student(2, 'vanlong', 21, 'IT')

console.log(`this is student: ${JSON.stringify(student)}`)
student.speak('ddm')


