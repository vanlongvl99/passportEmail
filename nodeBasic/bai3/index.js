
// 

const doTask1 = (name, callback) => {
    setTimeout(() =>{
        console.log(`xong ${name}`)
// 
        callback()
    }, 1000)
// 
// 
}
const doFirst =() => {
    const doTask2 = (name, callback) => {
        setTimeout(() =>{
            console.log(`xong ${name}`)
            callback({a: 1, b: 2})
    // 
    // 
        }, 2000)
    }
   
    console.log('1.1 bat dau luoc rau')
    doTask2('luoc rau', (result) => {
        console.log('luoc rau xong')
        console.log(`ket qua: ${JSON.stringify(result)}`)
        console.log('2.2. bat dau nau com')
        doTask1('nau com', () => {
            console.log('nau com xong')
        })
    })
    // 
// 
// 
}
// 
// 
doFirst()
console.log('end')
// 
// console.log('3. bat dau nau canh')

// doTask1('nau canh', () =>{
    // console.log('.3 nau canh xong')
// })

