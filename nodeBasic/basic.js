function varLetConst (){
    var x = 100
    console.log("gia tri cua x la: " + x);
    var a
    console.log('value of a is: ' + a);
    if (a === undefined){
        console.log("chua dinh nghia a")
    }else{
        "dinh nghia r"
    }
    
    console.log(5 + a);  // NaN not a number
    
    a = null // a will equal 0 is you use a to tinh toan :D
    
    
    if (x === 100){
        console.log('x is 100')
        var c = 1
        let d = 5
        console.log('d is ' + d)
    }
    console.log('d is ' + d)
    
    // pham vi of c ra tan day
    
    
    
}

 function useString(){
    var str = ' day la chuoi string'
    console.log(str)
    pi = 3.1416
    let message = 'value of pi is: ' + pi  // pi sẽ tự động chuyển về string
    console.log(message)
    console.log('đay là phim \"doreamon\" ')
    var information = "firstname is van long\
        lastname is nguyen\
        sdt is 0365596604\
    "   // dấu \ chỉ để code nhìn đẹp thôi chứ thực tế chuỗi vẫn k xuống hàng
        // muốn xuống dong cần thêm \n
    console.log(information)
    var name = "long"
    var age = 20
    console.log(`hello mr ${name}, your age is ${age}`) // dấu `bên trong có chứa biến`
    
    console.log(`
    viết cái gì là
    hiện
        cái
        đó
    
    `)



 }


 function ham(){
    function square(x){
        return x*x
    }

    console.log(`binh phuong cua 8 la ${square(8)}`)

    function area(width, height = width){
        return width*height
    }

    console.log(`dien tich cua 5 va 3 la ${area(5, 3)}`)
    console.log(`dien tich cua 55 la ${area(5)}`)
    // hàm có input tùy ý

    function printPara(...ints){  // ... để nói có nhiều input
        console.log(ints.join(";"))
        

    }

    printPara(1,1,3,4)
    ///  con con trỏ hàm
    var sayHello = function(name) {  // sayHello trỏ đến hàm func, hàm func k có tên
        // sử dụng biến như tên của hàms
        console.log(`hello ${name}`)
    }
    sayHello("long")


 }

function arrowFunction(){
    const addNum = (a, b) => a + b  // return a + b
    // arrow function k co return
    const sayHello = (name) =>{
        console.log("do somthing")
        console.log(`hello ${name}`)

    }
    console.log(addNum(2, 3))
    sayHello("long")
    // setInterval(()=> sayHello("longAbc")  , 1000)
    let arrayA = [1, 2, 3, 4, 5]
    let arrayB = ['nguyen', 'van', 'long']
    let fakeA = arrayA.map(x => x*x)
    let fakeB = arrayB.map(x => x + "vcl")
    console.log(fakeA)
    console.log(fakeB)


}
arrowFunction()