// import { resolve } from "url"
// import { rejects } from "assert"

//Giả sử chúng ta có các công việc 1, 2, 3,... có các hàm tương ứng để thực hiện
const doTask1 = (name, callback) => {
    //Giả sử việc này mất 1s = 1000ms để hoàn thành
    setTimeout(() => {
        //Giả sử việc này luôn thành công(phần có error sẽ nói sau)
        console.log(`1.Hoàn thành việc ${name}`)  

        //callback() //Callback ko có param
        // trường hợp có lỗi
        if (name == "lái máy bay"){
            callback("k thuc hien dc, loi A", null)
        }else{
            callback(null, {a: 1, b: 2})
        }
    
    }, 1000)
}
//Việc 2 
const doTask2 = (name, callback) => {
    //Giả sử việc này mất 2s = 2000ms để hoàn thành
    setTimeout(() => {        
        console.log(`2.Hoàn thành việc ${name}`)             
        callback({a: 11, b: 22}) //callback có param
    }, 2000)
}
/*
console.log('Bắt đầu task1')
doTask1('Nấu cơm', (result) => {
    console.log('Nấu cơm xong')
    console.log(`Kết quả: ${JSON.stringify(result)}`)
})
console.log('Bắt đầu task2')
doTask2('Luộc rau', (result) => {
    console.log('Luộc rau xong')
    console.log(`Kết quả: ${JSON.stringify(result)}`)
})
*/
//Kết luận: 2 task 1,2 bắt đầu cùng 1 thời điểm, ko đợi chờ nhau
//Dùng trong những trường hợp cần chạy song song nhiều việc
//Bài toán 2: Giờ có 2 việc: "Đun nước sôi", xong mới "luộc rau"
console.log('Bắt đầu đun nước')
doTask1('lái máy bay', (error, result) => {
    if (error){ // tương đương if error khác null
        console.log(`khon lam dc error = ${error}`)
        // lỗi thì k làm task2
    } else{
        console.log('hoan thanh cv', result)
        doTask2("Luộc rau", (result2) => {
            console.log('Luộc rau xong')
            console.log(`Kết quả: ${JSON.stringify(result2)}`)
            //Nếu có task3,4,5,....thì sao ? => callback hell => hạn chế 
            //
        })
    }

    
})

 const doTaskA = (taskName) => {
     return new Promise((resolve, rejects) => {
         setTimeout(()=>{
            if (taskName == 'lái máy bay'){
                console.log(`vi taskName la: ${taskName }`)
                rejects('k thuc hien dc')
            } else {
                resolve({a: 1, b: 2})
            }
         },1000)
     })
 }

console.log('chuan bi lam taskA')

// then là trường hợp thành công,  hàm trong then =resolve
// catch là thất bại, hàm trong catch = reject
 doTaskA('lái máy bay').then((result) => console.log(`ket qua thanh cong ${JSON.stringify(result)}`) 
 ).catch((error) => console.log(`that bai roi ${error}`) )

 