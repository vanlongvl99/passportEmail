function sum(a, b){
    return a+b;

}

let sum1 = (a, b) => a + b;

function isPositive(number){
    return number > 0;
}

let isPositive1 = number => number > 0;

function randomNumber(){
    return Math.random;
}

// document.addEventListener('click', function(){
    // console.log('Click');
// })

class person{
    constructor(name){
        this.name = name
    }



    printNameArrow(){
        setTimeout(() => {
            console.log("array " + this.name)
        }, 2000) // chạy song song
    }

    printNameFunction(){
        setTimeout( function(){
            console.log("function " + this.name)
        }, 1000)
    }
}
let abc = new person('long');

abc.printNameArrow();
abc.printNameFunction()
console.log(abc.name);