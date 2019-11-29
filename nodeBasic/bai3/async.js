// import { resolve } from "path"

// import { promises } from "fs"

const doTaskA = (taskName) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('ket thuc taskA')
            if (taskName === 'lai may bay'){
                // console.log(`that bai vi taskName la: ${taskName}`)
                reject(`that bai`)
            }else{
                // console.log(`thanh cong vi taskName la: ${taskName}`)
                resolve('xong a roi')
            }
        },1000)
    })
}



const doTaskB = (taskName) => {
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            //Giả sử công việc làm mất 2 giây = 2000ms
            console.log('Kết thúc taskB')
            resolve({a: 11, b: 22})
        }, 2000)
    })
}

// console.log('chuan bi do taskA')
// doTaskA('lai may bay').then((result) => console.log(`thanh cong roi ${JSON.stringify(result)}`)
// ).catch((error) => console.log(`that bai roi: ${error}`))

// giờ muốn thực hiện liên hoàn. xong A đến B


console.log('chuan bi do someTask')
async function doSomeTasks(taskName1, taskName2) {
    try {
        await doTaskA(taskName1)
        await doTaskB(taskName2)
        // sử dụng await tránh dùng hàm lồng nhau
    } catch (error) {
        //Thu hết lỗi của doTaskA và doTaskB vào một chỗ
        console.log(`Error = ${error}`)
    }
}

doSomeTasks('lai may bay', 'nau canh')





