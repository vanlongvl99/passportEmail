const doTaskA = (taskName) => {
    return new Promise((resolve, reject) => {
        //Resolve = hàm callback khi nhiệm vụ thành công
        //Reject = hàm callback khi nhiệm vụ failed
        setTimeout(() => {
            //Giả sử công việc làm mất 1 giây = 1000ms
            console.log('Kết thúc taskA')
            if(taskName === 'Lái máy bay') {
                reject('Không thực hiện được, ko đủ năng lực')
            } else {
                resolve({a: 1, b: 2})
            }
        }, 3000)
    })
}
const doTaskB = (taskName) => {
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            //Giả sử công việc làm mất 2 giây = 2000ms
            console.log('Kết thúc taskB')
            resolve({a: 11, b: 22})
        }, 1000)
    })
}
console.log('Chuẩn bị làm taskA')
/*
doTaskA('Lái máy bay').then((result) => {
    console.log(`Successful. Result = ${JSON.stringify(result)}`)
}).catch((error) => {
    console.log(`Error: ${error}`)
})
console.log('Chuẩn bị làm Task khác')
*/
//Giờ muốn thực hiện liên hoàn: (việc A, xong đến B) = async
async function doSomeTasks(taskName1, taskName2) {
    try {
        await doTaskA(taskName1)
        await doTaskB(taskName2)
        // sử dụng await tránh dùng hàm callback lồng nhau
    } catch (error) {
        //Thu hết lỗi của doTaskA và doTaskB vào một chỗ
        console.log(`Error = ${error}`)
    }
}
//Gọi hàm 
//doSomeTasks('Đun nước sôi', 'Luộc rau')
doSomeTasks('Lái máy bay', 'Luộc rau')